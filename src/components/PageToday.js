import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { IoCheckbox } from "react-icons/io5";
import { IconContext } from "react-icons";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

function Habit({ habit }) {
  const { userInfo, updateHabitsList, setUpdateHabitsList } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState("");

  const iconDoneColor = habit.done ? "#8fc549" : "#EBEBEB";
  const currentSequenceColor = habit.done ? "#8fc549" : "#666666";
  const highestSequenceColor = habit.currentSequence === habit.highestSequence ? "#8fc549" : "#666666";

  function selectHabit() {
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const body = {};
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (!habit.done) {
      setIsDisabled("none");
      const promise = axios.post(`${API}/${habit.id}/check`, body, config);
      promise
        .then(() => {
          setUpdateHabitsList(!updateHabitsList);
          setIsDisabled("");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("O hábito já está marcado!");
          }
          setIsDisabled("");
        });
    } else {
      setIsDisabled("none");
      const promise = axios.post(`${API}/${habit.id}/uncheck`, body, config);
      promise
        .then(() => {
          setUpdateHabitsList(!updateHabitsList);
          setIsDisabled("");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("O hábito não está marcado!");
          }
          setIsDisabled("");
        });
    }
  }

  return (
    <ContainerHabit>
      <h6>{habit.name}</h6>
      <p>
        Sequência atual: <span style={{ color: currentSequenceColor }}>{habit.currentSequence} dias</span>
      </p>
      <p>
        Seu recorde: <span style={{ color: highestSequenceColor }}>{habit.highestSequence} dias</span>
      </p>
      <IconContext.Provider value={{ size: "82px", color: iconDoneColor, title: "Marcar hábito como feito" }}>
        <IonIcon>
          <IoCheckbox style={{ pointerEvents: isDisabled }} onClick={selectHabit} />
        </IonIcon>
      </IconContext.Provider>
    </ContainerHabit>
  );
}

export default function PageToday() {
  const { userInfo, habitsToday, setHabitsToday, updateHabitsList, progress, updateProgress } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  let updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);

  dayjs.updateLocale("pt-br", {
    weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  });

  useEffect(() => {
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const promise = axios.get(API, config);
    promise
      .then((response) => {
        setHabitsToday(response.data);
        updateProgress(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateHabitsList]);

  function RenderSubtitle() {
    if (progress === "" || progress === "0") return <p>Nenhum hábito concluído ainda</p>;
    else {
      return <p style={{ color: "#8FC549" }}>{progress}% dos hábitos concluídos</p>;
    }
  }

  function RenderHabits() {
    if (habitsToday.length === 0) return <></>;
    else
      return (
        <>
          {habitsToday.map((habit, index) => (
            <Habit key={index} habit={habit} />
          ))}
        </>
      );
  }

  const weekDay = dayjs().locale("pt-br").format("dddd");
  const month = dayjs().locale("pt-br").format("DD/MM");
  const subtitle = RenderSubtitle();
  const habits = RenderHabits();

  return (
    <Container>
      <h6>
        {weekDay}, {month}
      </h6>
      {subtitle}
      {loading ? (
        <LoadingContainer>
          <ThreeDots color="#ffffff" width={70} height={70} />
        </LoadingContainer>
      ) : (
        <>
          {habits}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 70px 0;
  padding: 28px 17px 31px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > h6 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  & > p {
    font-size: 17.976px;
    line-height: 22px;
    color: #bababa;
    margin-bottom: 28px;
  }
`;

const ContainerHabit = styled.div`
  width: 100%;
  height: auto;
  min-height: 94px;
  padding: 13px 13px 12px 15px;
  margin-bottom: 10px;
  color: #666666;
  background: #ffffff;
  border-radius: 5px;
  position: relative;

  h6 {
    width: calc(100% - 100px);
    word-wrap: break-word;
    word-break: break-all;
    font-size: 19.976px;
    line-height: 25px;
    margin-bottom: 7px;
  }

  p {
    font-size: 12.976px;
    line-height: 16px;
  }
`;

const IonIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  margin-top: 50%;
  align-self: center;
`;