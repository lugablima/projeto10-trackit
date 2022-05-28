import styled from "styled-components";

export default function HistoryPage() {
  return (
    <Container>
      <h6>Histórico</h6>
      <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 70px 0;
  padding: 28px 21px 57px 19px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;

  & > h6 {
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
    margin-bottom: 11px;
  }

  & > p {
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-top: 6px;
  }
`;
