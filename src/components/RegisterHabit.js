import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import daysWeek from "../functions/daysWeek";
import { ThreeDots } from "react-loader-spinner";

function Day({ idDay, disabled }) {
  const { newHabit, setNewHabit } = useContext(UserContext);

  const [ day ] = newHabit.days.filter((day) => day.idDay === idDay);

  function setDays(day) {
    if (day.idDay === idDay) {
      day.isSelected = !day.isSelected;
    }      
    return day;
  }

  function selectDay() {
    setNewHabit({ ...newHabit, days: newHabit.days.map(setDays) });
  }

  return (
    <ContainerDay isSelected={day.isSelected} disabled={disabled} onClick={selectDay}>
      {day.name}
    </ContainerDay>
  );
}

export default function RegisterHabit({ setShowForm }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { userInfo, updateHabitsList, setUpdateHabitsList, newHabit, setNewHabit } = useContext(UserContext);

  function handleForm(event) {
    event.preventDefault();
    
    const daysSelected = newHabit.days.filter((day) => day.isSelected);
    const name = newHabit.name.trim();

    if (name !== "") {
      if(daysSelected.length !== 0) {
      setIsDisabled(true);
      const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

      const body = {
        name: name,
        days: daysSelected.map((day) => day.idDay),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const promise = axios.post(API, body, config);
      promise
        .then(() => {
          console.log(body);
          setIsDisabled(false);
          setNewHabit({name: "", days: daysWeek.map((day) => ({ ...day }))});
          setShowForm(false);
          setUpdateHabitsList(!updateHabitsList);
        })
        .catch((error) => {
          setIsDisabled(false);
          alert(error.response.data.message);
        });
      } else {
        alert("Selecione pelo menos um dia da semana!");
      }
    } else {
      alert("Digite o nome do hábito!");
    }
  }

  return (
    <Container>
      <form onSubmit={handleForm}>
        <input
          type="text"
          required
          value={newHabit.name}
          disabled={isDisabled}
          placeholder="nome do hábito"
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
        />
        <WeekDays>
          {newHabit.days.map((day, index) => (
            <Day
              key={index}
              idDay={day.idDay}
              disabled={isDisabled}
            />
          ))}
        </WeekDays>
        <Buttons>
          <button disabled={isDisabled}>
            {isDisabled ? <ThreeDots color="#ffffff" width={43.01} height={43.01} /> : "Salvar"}
          </button>
          <h6 disabled={isDisabled} onClick={() => setShowForm(false)}>
            Cancelar
          </h6>
        </Buttons>
      </form>
    </Container>
  );
}

// function Day({ idDay, day, isSelected, disabled, days, setDays }) {

//   function selectDay() {
//     setDays(
//       days.map((day) => {
//         if (day.idDay === idDay) {
//           day.isSelected = !day.isSelected;
//         }
//         return day;
//       })
//     );
//   }

//   return (
//     <ContainerDay isSelected={isSelected} disabled={disabled} onClick={selectDay}>
//       {day}
//     </ContainerDay>
//   );
// }

// export default function RegisterHabit({ setShowForm, habitName, setHabitName, days, setDays }) {
//   const [isDisabled, setIsDisabled] = useState(false);
//   const { userInfo, updateHabitsList, setUpdateHabitsList } = useContext(UserContext);

//   function handleForm(event) {
//     event.preventDefault();
    
//     const daysSelected = days.filter((day) => day.isSelected);
//     const name = habitName.trim();

//     if (name !== "") {
//       if(daysSelected.length !== 0) {
//       setIsDisabled(true);
//       const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

//       const body = {
//         name: name,
//         days: daysSelected.map((day) => day.idDay),
//       };

//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const promise = axios.post(API, body, config);
//       promise
//         .then((response) => {
//           console.log(body);
//           setIsDisabled(false);
//           setHabitName("");
//           setDays(daysWeek.map((day) => ({ ...day })));
//           setShowForm(false);
//           setUpdateHabitsList(!updateHabitsList);
//         })
//         .catch((error) => {
//           setIsDisabled(false);
//           alert(error.response.data.message);
//         });
//       } else {
//         alert("Selecione pelo menos um dia da semana!");
//       }
//     } else {
//       alert("Digite o nome do hábito!");
//     }
//   }

//   return (
//     <Container>
//       <form onSubmit={handleForm}>
//         <input
//           type="text"
//           required
//           value={habitName}
//           disabled={isDisabled}
//           placeholder="nome do hábito"
//           onChange={(e) => setHabitName(e.target.value)}
//         />
//         <WeekDays>
//           {days.map((day, index) => (
//             <Day
//               key={index}
//               idDay={day.idDay}
//               day={day.name}
//               isSelected={day.isSelected}
//               disabled={isDisabled}
//               days={days}
//               setDays={setDays}
//             />
//           ))}
//         </WeekDays>
//         <Buttons>
//           <button disabled={isDisabled}>
//             {isDisabled ? <ThreeDots color="#ffffff" width={43.01} height={43.01} /> : "Salvar"}
//           </button>
//           <h6 disabled={isDisabled} onClick={() => setShowForm(false)}>
//             Cancelar
//           </h6>
//         </Buttons>
//       </form>
//     </Container>
//   );
// }

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin-top: 20px;
  padding: 18px 18px 15px;
  border-radius: 5px;
  background: #ffffff;

  input {
    width: 100%;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin-bottom: 8px;
    padding: 9px 11px 11px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    outline: none;
  }

  input::placeholder {
    color: #dbdbdb;
  }

  input:disabled {
    background: #f2f2f2;
    color: #b3b3b3;
  }
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
  cursor: pointer;
`;

const Buttons = styled.div`
  width: 100%;
  height: auto;
  margin-top: 29px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;

  button {
    width: 84px;
    height: 35px;
    margin-left: 23px;
    padding: 0;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    color: #ffffff;
  }

  button:disabled {
    opacity: 0.7;
  }

  h6 {
    color: #52b6ff;
    cursor: pointer;
  }

  h6:disabled {
    opacity: 0.7;
  }
`;
