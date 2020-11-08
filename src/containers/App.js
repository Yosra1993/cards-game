import React from "react";
import { Row, Col } from "antd";
import CardsGame from "../components/CardsGame";
import BoardGame from "../components/BoardGame";
import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  return (
    <AppContainer className="App">
      <Row justify="center">
        {" "}
        <Col span={8}>
          <Title
            level={2}
            style={{
              padding: "10px 0",
              textAlign: "center",
              paddingTop: "25px",
            }}
          >
            Find the pairs
          </Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col sm={24} lg={11} >
          <CardsGame />
        </Col>
        <Col sm={20} lg={7}>
          <BoardGame />
        </Col>
      </Row>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background: #ececec;
  height: 100vw;
`;

export default App;
