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

export default function App() {
  const [userInfo, setUserInfo] = useState({photo: "", token: ""});
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{userInfo, setUserInfo}}>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/hoje" element={<PageToday />} />
            <Route path="/historico" element={<HistoryPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
