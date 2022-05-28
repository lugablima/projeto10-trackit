import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import HabitsTodayContext from "../contexts/HabitsTodayContext";

export default function Menu() {
  const { habitsToday } = useContext(HabitsTodayContext);
  const location = useLocation();

  function updatePercentage() {
    const habitsDone = habitsToday.filter((habit) => habit.done);
    if (habitsDone.length === 0) return "0";
    else {
      const percHabitsDone = ((habitsDone.length / habitsToday.length) * 100).toFixed(0);
      return percHabitsDone;
    }
  }

  const progressPercentage = updatePercentage();

  function RenderMenu() {
    if (location.pathname === "/" || location.pathname === "/cadastro") {
      return <></>;
    } else {
      return (
        <Container>
          <Link to="/habitos">
            <h6>Hábitos</h6>
          </Link>
          <Link to="/hoje">
            <div>
              <CircularProgressbar
                value={progressPercentage}
                text={"Hoje"}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#52B6FF",
                  textColor: "#FFFFFF",
                  pathColor: "#FFFFFF",
                  trailColor: "transparent",
                })}
              />
            </div>
          </Link>
          <Link to="/historico">
            <h6>Histórico</h6>
          </Link>
        </Container>
      );
    }
  }

  const menu = RenderMenu();

  return <>{menu}</>;
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 31px 0 36px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;

  h6 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #52b6ff;
  }

  div {
    width: 92px;
    height: 92px;
    margin-bottom: 40px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
  }
`;
