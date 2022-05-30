import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import logo from "../assets/img/logo.svg";
import validateEmail from "../functions/validateEmail";

export default function SignIn() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { setUserInfo } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   let userInfos = localStorage.getItem("userInfos");
  //   if(userInfos !== null) {
  //     userInfos = JSON.parse(userInfos);
  //     const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

  //     const body = {
  //       email: userInfos.email,
  //       password: userInfos.password,
  //     };

  //     const promise = axios.post(API, body);
  //     promise
  //       .then((response) => {
  //         setUserInfo({photo: response.data.image, token: response.data.token});
  //         console.log("redirecionando...");
  //         navigate("/hoje");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // },[]);

  useEffect(() => {
    let userInfos = localStorage.getItem("userInfos");
    if(userInfos !== null) {
      userInfos = JSON.parse(userInfos);
      setUserInfo({photo: userInfos.image, token: userInfos.token});
      navigate("/hoje");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function handleForm(event) {
    event.preventDefault();
    if (validateEmail(inputs.email)) {
      setIsDisabled(true);
      const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

      const body = {
        email: inputs.email,
        password: inputs.password,
      };

      const promise = axios.post(API, body);
      promise
        .then((response) => {
          const userData = JSON.stringify(response.data);
          localStorage.setItem("userInfos", userData);
          setUserInfo({photo: response.data.image, token: response.data.token});
          // setUserInfo({photo: response.data.image, token: response.data.token});
          navigate("/hoje");
        })
        .catch((error) => {
          alert(error.response.data.message);
          setIsDisabled(false);
        });
    } else {
      alert("Email inválido, tente novamente!");
    }
  }

  return (
    <Container>
      <img src={logo} alt="Logo do TrackIt" />
      <form onSubmit={handleForm}>
        <input
          type="email"
          value={inputs.email}
          disabled={isDisabled}
          required
          placeholder="email"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        <input
          type="password"
          value={inputs.password}
          disabled={isDisabled}
          required
          placeholder="senha"
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <button disabled={isDisabled}>
          {isDisabled ? <ThreeDots color="#ffffff" width={51} height={51} /> : "Entrar"}
        </button>
      </form>
      <Link to="/cadastro" style={{pointerEvents: isDisabled ? "none" : ""}}>
        <h6>Não tem uma conta? Cadastre-se!</h6>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 68px 36px 199px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 182px;
    height: 179px;
    margin-bottom: 32.62px;
  }

  input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    padding: 9px 11px 11px;
    margin-bottom: 6px;
    outline: none;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #000000;
  }

  input::placeholder {
    color: #dbdbdb;
  }

  input:disabled {
    background: #f2f2f2;
    color: #afafaf;
  }

  button {
    width: 100%;
    height: 45px;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    padding: 0;
    margin-bottom: 25px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    opacity: 0.7;
    cursor: default;
  }

  h6 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration: underline;
    color: #52b6ff;
  }
`;