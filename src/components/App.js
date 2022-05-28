import GlobalStyle from "../assets/GlobalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import HabitsTodayContext from "../contexts/HabitsTodayContext";
import UpdateHabitsListContext from "../contexts/UpdateHabitsListContext";
import ProgressPercentageContext from "../contexts/ProgressPercentageContext";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HabitsPage from "./HabitsPage";
import PageToday from "./PageToday";
import HistoryPage from "./HistoryPage";
import Menu from "./Menu";

export default function App() {
  const [userInfo, setUserInfo] = useState({ photo: "", token: "" });
  const [habitsToday, setHabitsToday] = useState([]);
  const [updateHabitsList, setUpdateHabitsList] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(null);
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <HabitsTodayContext.Provider value={{ habitsToday, setHabitsToday }}>
            <UpdateHabitsListContext.Provider value={{ updateHabitsList, setUpdateHabitsList }}>
              <ProgressPercentageContext.Provider value={{ progressPercentage, setProgressPercentage }}>
                <Header />
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/cadastro" element={<SignUp />} />
                  <Route path="/habitos" element={<HabitsPage />} />
                  <Route path="/hoje" element={<PageToday />} />
                  <Route path="/historico" element={<HistoryPage />} />
                </Routes>
                <Menu />
              </ProgressPercentageContext.Provider>
            </UpdateHabitsListContext.Provider>
          </HabitsTodayContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
