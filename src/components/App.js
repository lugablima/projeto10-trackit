import GlobalStyle from "../assets/GlobalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HabitsPage from "./HabitsPage";
import PageToday from "./PageToday";
import HistoryPage from "./HistoryPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<HabitsPage />} />
          <Route path="/hoje" element={<PageToday />} />
          <Route path="/historico" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}