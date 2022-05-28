import GlobalStyle from "../assets/GlobalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HabitsPage from "./HabitsPage";
import PageToday from "./PageToday";
import HistoryPage from "./HistoryPage";
import Menu from "./Menu";
import daysWeek from "../functions/daysWeek";

export default function App() {
  const [userInfo, setUserInfo] = useState({ photo: "", token: "" });
  const [newHabit, setNewHabit] = useState({name: "", days: daysWeek.map((day) => ({ ...day }))});
  const [habitsToday, setHabitsToday] = useState([]);
  const [updateHabitsList, setUpdateHabitsList] = useState(false);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider
          value={{
            userInfo,
            setUserInfo,
            habitsToday,
            setHabitsToday,
            updateHabitsList,
            setUpdateHabitsList,
            newHabit, 
            setNewHabit,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/hoje" element={<PageToday />} />
            <Route path="/historico" element={<HistoryPage />} />
          </Routes>
          <Menu />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

// export default function App() {
//   const [userInfo, setUserInfo] = useState({ photo: "", token: "" });
//   const [habitsToday, setHabitsToday] = useState([]);
//   const [updateHabitsList, setUpdateHabitsList] = useState(false);
//   const [progressPercentage, setProgressPercentage] = useState(null);

//   return (
//     <>
//       <GlobalStyle />
//       <BrowserRouter>
//         <UserContext.Provider
//           value={{
//             userInfo,
//             setUserInfo,
//             habitsToday,
//             setHabitsToday,
//             updateHabitsList,
//             setUpdateHabitsList,
//             progressPercentage,
//             setProgressPercentage,
//           }}
//         >
//           <Header />
//           <Routes>
//             <Route path="/" element={<SignIn />} />
//             <Route path="/cadastro" element={<SignUp />} />
//             <Route path="/habitos" element={<HabitsPage />} />
//             <Route path="/hoje" element={<PageToday />} />
//             <Route path="/historico" element={<HistoryPage />} />
//           </Routes>
//           <Menu />
//         </UserContext.Provider>
//       </BrowserRouter>
//     </>
//   );
// }