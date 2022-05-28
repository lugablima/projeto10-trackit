import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import UpdateHabitsListContext from "../contexts/UpdateHabitsListContext";
import axios from "axios";
import RegisterHabit from "./RegisterHabit";
import daysWeek from "../functions/daysWeek";
import plus from "../assets/img/plus.svg";
import ListHabits from "./ListHabits";

export default function HabitsPage() {
  const { userInfo } = useContext(UserContext);
  const [habits, setHabits] = useState(null);
  const { updateHabitsList } = useContext(UpdateHabitsListContext);
  const [habitName, setHabitName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [days, setDays] = useState(daysWeek.map((day) => ({ ...day })));

  useEffect(() => {
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const promise = axios.get(API, config);
    promise
      .then((response) => {
        console.log(response);
        setHabits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateHabitsList]);

  function RenderContent() {
    if (habits === null) return <></>;
    else if (habits.length === 0)
      return (
        <NoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabit>
      );
    else return <ListHabits habits={habits} />;
  }

  const content = RenderContent();

  return (
    <Container>
      <Header>
        <h6>Meus hábitos</h6>
        <div onClick={() => setShowForm(true)}>
          <img src={plus} alt="Criar novo hábito" />
        </div>
      </Header>
      {showForm ? (
        <RegisterHabit
          setShowForm={setShowForm}
          habitName={habitName}
          setHabitName={setHabitName}
          days={days}
          setDays={setDays}
        />
      ) : (
        <></>
      )}
      {content}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 70px 0;
  padding: 22px 17px 31px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  background: #f2f2f2;
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h6 {
    line-height: 29px;
    font-size: 22.976px;
    color: #126ba5;
  }

  div {
    width: 40px;
    height: 35px;
    border-radius: 4.63636px;
    background: #52b6ff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  div > img {
    width: 14px;
    height: 14px;
  }
`;

const NoHabit = styled.h6`
  width: 100%;
  height: 74px;
  margin-top: 28px;
  word-wrap: break-word;
  font-size: 17.976px;
  line-height: 22px;
  color: #666666;
`;
