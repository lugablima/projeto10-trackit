import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import daysWeek from "../functions/daysWeek";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

function Habit({ habit }) {
  const { userInfo, updateHabitsList, setUpdateHabitsList } = useContext(UserContext);

  function DaysSelected(day, index) {
    if (habit.days.some((value) => value === day.idDay))
      return (
        <ContainerDay key={index} isSelected={true}>
          {day.name}
        </ContainerDay>
      );
    else
      return (
        <ContainerDay key={index} isSelected={false}>
          {day.name}
        </ContainerDay>
      );
  }

  function deleteHabit() {
    if(window.confirm("Tem certeza que deseja deletar esse hábito?")) {
      const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const promise = axios.delete(`${API}/${habit.id}`, config);
      promise
        .then((response) => {
          console.log(response);
          setUpdateHabitsList(!updateHabitsList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <ContainerHabit>
      <h6>{habit.name}</h6>
      <WeekDays>{daysWeek.map((day, index) => DaysSelected(day, index))}</WeekDays>
      <IconContext.Provider value={{ size: "20px", color: "#666666", title: "Deletar hábito" }}>
        <IonIcon onClick={deleteHabit}>
          <IoTrashOutline />
        </IonIcon>
      </IconContext.Provider>
    </ContainerHabit>
  );
}

export default function ListHabits({ habits }) {
  return (
    <Container>
      {habits.map((habit, index) => (
        <Habit key={index} habit={habit} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContainerHabit = styled.div`
  width: 100%;
  height: auto;
  min-height: 91px;
  padding: 13px 15px 15px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 5px;
  position: relative;

  h6 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 8px;
  }
`;

const IonIcon = styled.div`
  position: absolute;
  top: 11px;
  right: 10px;
  cursor: pointer;
`;

const WeekDays = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
`;

const ContainerDay = styled.p`
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => (props.isSelected ? "#CFCFCF" : "#d4d4d4")};
  border-radius: 5px;
  margin-right: 4px;
  background: ${(props) => (props.isSelected ? "#CFCFCF" : "#ffffff")};
  display: flex;
  justify-content: center;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: ${(props) => (props.isSelected ? "#ffffff" : "#dbdbdb")};
`;
