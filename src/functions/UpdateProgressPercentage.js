import { useContext } from "react";
import HabitsTodayContext from "../contexts/HabitsTodayContext";
import ProgressPercentageContext from "../contexts/ProgressPercentageContext";

function UpdateProgressPercentage() {
  //lembrar de apagar esse arquivo
  const { habitsToday } = useContext(HabitsTodayContext);
  const { setProgressPercentage } = useContext(ProgressPercentageContext);
  const habitsDone = habitsToday.filter((habit) => habit.done);
  if (habitsDone.length === 0) {
    setProgressPercentage("0");
  } else {
    const percHabitsDone = ((habitsDone.length / habitsToday.length) * 100).toFixed(0);
    setProgressPercentage(percHabitsDone);
  }
}

export default UpdateProgressPercentage;
