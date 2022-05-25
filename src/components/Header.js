import styled from "styled-components";
import { useLocation } from "react-router-dom";
import bob_esponja from "../assets/img/bob_esponja.svg";

export default function Header() {
    const location = useLocation();

    function RenderHeader() {
        if(location.pathname === "/" || location.pathname === "/cadastro") {
            return <></>;
        } else {
            return (<Container>
                        <h1>TrackIt</h1>
                        <img src={bob_esponja} alt="Bob Esponja" />
                    </Container>
                    );
        }
    }

    const header = RenderHeader();
    
  return (
    <>
    {header}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 9px 18px 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  background: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  h1 {
    font-family: "Playball", cursive;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #ffffff;
  }

  img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
  }
`;