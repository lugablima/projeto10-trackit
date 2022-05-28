import axios from "axios";
import { useContext } from "react"; 
import UserContext from "../contexts/UserContext";

function UpdateProgressPercentage() {
  //lembrar de apagar esse arquivo
  const { userInfo } = useContext(UserContext);
  const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const promise = axios.get(API, config);
  promise
    .then((response) => {
      const habitsToday = response.data;
      const habitsDone = habitsToday.filter((habit) => habit.done);

      if (habitsToday.length === 0) {
        return 0;
      } else {
        const percHabitsDone = ((habitsDone.length / habitsToday.length) * 100).toFixed(0);
        return percHabitsDone;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default UpdateProgressPercentage;
