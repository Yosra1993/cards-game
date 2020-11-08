import React from "react";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "antd";
import { Button } from "antd";
import styled from "styled-components";
import { Select } from "antd";

const PairesMenu = (props) => {
  const dispatch = useDispatch();
  const changeNumberOfPairs = (number) =>
    dispatch(Actions.changeNumberOfPairs(number));
  const { Option } = Select;

  function handleChange(value) {
    changeNumberOfPairs(value);
    props.handleWidth(Number(value));
  }
  return (
    <>
      <Select
        defaultValue="6"
        style={{ width: 120, paddingLeft: "4px" }}
        onChange={handleChange}
      >
        <Option value="6">6 Paires</Option>
        <Option value="8">8 Paires</Option>
        <Option value="10">10 Paires</Option>
        <Option value="12">12 Paires</Option>
        <Option value="15">15 Paires</Option>
        <Option value="18">18 Paires</Option>
        <Option value="21">21 Paires</Option>
      </Select>
    </>
  );
};

export default function BoardGame(props) {
  const dispatch = useDispatch();

  const resetGame = () => dispatch(Actions.resetGame());
  const resetCards = () => dispatch(Actions.resetCards());
  const shuffleCards = () => dispatch(Actions.shuffleCards());
  const duplicateCards = () => dispatch(Actions.duplicateCards());
  const limitCards = () => dispatch(Actions.limitCards());
  const flipAllCards = () => dispatch(Actions.flipAllCards());
  const changeWidth = (width) => dispatch(Actions.changeWidth(width));

  const numberOfPairs = useSelector(
    ({ rootReducer }) => rootReducer.numberOfPairs
  );
  const numberOfAttempts = useSelector(
    ({ rootReducer }) => rootReducer.numberOfAttempts
  );
  const numberOfFoundPairs = useSelector(
    ({ rootReducer }) => rootReducer.numberOfFoundPairs
  );
  const { Title } = Typography;

  function handleWidth(value) {
    switch (value) {
      case 6: {
        return changeWidth(127);
      }
      case 8: {
        return changeWidth(127);
      }
      case 10: {
        return changeWidth(102);
      }
      case 12: {
        return changeWidth(85.33);
      }
      case 15: {
        return changeWidth(85.33);
      }
      case 18: {
        return changeWidth(85.33);
      }
      default: {
        return changeWidth(73.42);
      }
    }
  }
  return (
    <ControlContainer>
      <Card
        title="Score"
        bordered={false}
        style={{ width: 300 }}
        bodyStyle={{ padding: "0px 24px" }}
        headStyle={{ fontWeight: "bold" }}
      >
        <Title level={3}>
          <span style={{ color: "#1890FF" }}>{numberOfFoundPairs} </span> /{" "}
          {numberOfPairs}
        </Title>

        <p>Tries: {numberOfAttempts}</p>
      </Card>
      <Card
        title="Options"
        bordered={false}
        style={{ width: 300 }}
        bodyStyle={{ padding: "0px 24px" }}
        headStyle={{ fontWeight: "bold" }}
      >
        <span>Size </span>
        <PairesMenu handleWidth={handleWidth} />
        <Button
          type="primary"
          style={{ margin: "20px auto" }}
          onClick={() => {
            resetGame();
            resetCards();
            handleWidth(Number(numberOfPairs));
            shuffleCards();
            limitCards();
            duplicateCards();
            shuffleCards();
            setTimeout(() => {
              flipAllCards();
            }, 1500);
          }}
        >
          Restart Game
        </Button>
      </Card>
    </ControlContainer>
  );
}

const ControlContainer = styled.div`
  position: relative;
  top: 17%;
  transform: translateY(-25%);
  padding: 30px;
  background: #ececec;
`;
