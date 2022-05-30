import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import HistoryDay from "./HistoryDay";

export default function HistoryPage() {
  const { userInfo } = useContext(UserContext);
  const [historyHabits, setHistoryHabits] = useState([]);
  const [value, onChange] = useState(dayjs().$d);
  const [historyDay, setHistoryDay] = useState(null);

  useEffect(() => {
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const promise = axios.get(API, config);
    promise
      .then((response) => {
        setHistoryHabits(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(date, format) {
    return dayjs(date).format(format);
  }

  function formatTile(date, view) {
    if (view === "month" && historyHabits.length !== 0) {
      const [ objHabit ] = historyHabits.filter((value) => value.day === dayjs(date).format("DD/MM/YYYY"));
      if(objHabit !== undefined) {
        const isConcluded = objHabit.habits.every((hab) => hab.done === true);
        if(isConcluded) return ["tile", "tile-concluded"];
        else return ["tile", "tile-not-concluded"]; 
      }
    }
    return "";
  }

  function onClickDay(value) {
    const [ objHabit ] = historyHabits.filter((obj) => obj.day === dayjs(value).format("DD/MM/YYYY"));
    if(objHabit !== undefined) {
      setHistoryDay(objHabit);
    }
  }

  return (
    <Container>
      <h6>Histórico</h6>
      {historyHabits.length === 0 ? null :
      <CalendarContainer>
        <Calendar
          calendarType="US"
          onChange={onChange}
          value={value}
          locale={"pt"}
          formatDay={(locale, date) => formatDate(date, "DD")}
          tileClassName={({ date, view }) => formatTile(date, view)}
          onClickDay={onClickDay}
        />
      </CalendarContainer>}
      {historyDay ? <HistoryDay history={historyDay} setHistoryDay={setHistoryDay} /> : <></>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 70px 0;
  padding: 28px 21px 57px 19px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;

  & > h6 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
    margin-bottom: 11px;
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
  height: auto;

  .react-calendar {
    width: 100%;
    /* height: 402px; */
    border: none;
    border-radius: 10px;
  }

  .tile {
    background-position: center;
    border-radius: 75%;
    color: #000000;
  }

  .tile-concluded {
    background-color: #8fc549;
  }

  .tile-not-concluded {
    background-color: red;
  }
`;