import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { IoCheckbox, IoCloseCircle, IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

function Habit({ name, isDone }) {
  const iconDoneColor = isDone ? "#8fc549" : "red";

  return (
    <ContainerHabit>
      <h6>{name}</h6>
      <IconContext.Provider value={{ size: "82px", color: iconDoneColor, title: "Status do hábito" }}>
        <IonIconHabit>{isDone ? <IoCheckbox /> : <IoCloseCircle />}</IonIconHabit>
      </IconContext.Provider>
    </ContainerHabit>
  );
}

export default function HistoryDay({ history, setHistoryDay }) {
  let updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);

  dayjs.updateLocale("pt-br", {
    weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  });

  const weekDay = dayjs(history.habits[0].date).locale("pt-br").format("dddd");

  return (
    <Container>
      <h6>
        Lista de hábitos do dia {history.day} ({weekDay})
      </h6>
      {history.habits.map((habit, index) => (
        <Habit key={index} name={habit.name} isDone={habit.done} />
      ))}
      <IconContext.Provider value={{ size: "20px", title: "Status do hábito" }}>
        <IonIcon onClick={() => setHistoryDay(null)}>
          <IoClose />
        </IonIcon>
      </IconContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 11px;
  background: #ffffff;
  padding: 18px 18px 0;
  border-radius: 10px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  position: relative;

  & > h6 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
    margin-bottom: 10px;
  }
`;

const ContainerHabit = styled.div`
  width: 100%;
  height: auto;
  min-height: 91px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  h6 {
    width: calc(100% - 117px);
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    word-wrap: break-word;
    word-break: break-all;
  }
`;

const IonIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 5px;
  cursor: pointer;
`;

const IonIconHabit = styled.div`
  position: absolute;
  top: 6px;
  right: -6px;
`;