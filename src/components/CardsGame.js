import React, { useEffect } from "react";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { QuestionOutlined } from "@ant-design/icons";

export default function CardsGame(props) {
  const dispatch = useDispatch();
  const numberOfPairs = useSelector(
    ({ rootReducer }) => rootReducer.numberOfPairs
  );
  const numberOfFoundPairs = useSelector(
    ({ rootReducer }) => rootReducer.numberOfFoundPairs
  );
  const cards = useSelector(({ rootReducer }) => rootReducer.cards);
  const matching = useSelector(({ rootReducer }) => rootReducer.matching);
  const width = useSelector(({ rootReducer }) => rootReducer.width);
  useEffect(() => {
    dispatch(Actions.resetCards());
    dispatch(Actions.shuffleCards());
    dispatch(Actions.limitCards());
    dispatch(Actions.duplicateCards());
    dispatch(Actions.shuffleCards());

    setTimeout(() => {
      dispatch(Actions.flipAllCards());
    }, 5000);
  }, [dispatch, numberOfPairs]);

  useEffect(() => {
    if (matching) {
      setTimeout(() => {
        dispatch(Actions.flipAllCards());
      }, 1000);
    }
  }, [dispatch, matching]);

  useEffect(() => {
    if (numberOfFoundPairs === numberOfPairs) {
      setTimeout(() => {
        alert("YOU WIN ");
      }, 500);
    }
  }, [numberOfFoundPairs, numberOfPairs]);

  return (
    //   grid Item
    <GridContainer>
      {cards.map((el, index) => {
        // matching  and isActive
        // matching and notActive
        if (el.isActive || el.timed) {
          return (
            <ImageWrapper color="#1890FF" width={width} key={"div" + index}>
              <img
                alt="img"
                key={el.src + index}
                data-index={el.index}
                src={el.src}
              />
            </ImageWrapper>
          );
        } else if (el.match) {
          return (
            <ImageWrapper
              color="transparent"
              width={width}
              key={"div" + index}
            />
          );
        } else {
          return (
            <ImageWrapper
              color="#1890FF"
              width={width}
              key={"div" + index}
              onClick={() => {
                if (!matching) {
                  dispatch(Actions.flipCard(el.index));
                }
              }}
            >
              <QuestionOutlined
                style={{ fontSize: "23px", color: " white", marginTop: "35%" }}
              />
            </ImageWrapper>
          );
        }
      })}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  width: 554px;
  height: 100vh;
  text-align: center;
  padding-top: 5%;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  margin-right: 7px;
  margin-top: 2px;
  border-radius: 4px;
  width: ${(props) =>
    useSelector(({ rootReducer }) => rootReducer.width) + "px"};
  height: ${(props) =>
    useSelector(({ rootReducer }) => rootReducer.width) + "px"};
  background-color: ${(props) => props.color};

  overflow: auto;
  img,
  .blank {
    width: ${(props) =>
      useSelector(({ rootReducer }) => rootReducer.width) + "px"};
    height: ${(props) =>
      useSelector(({ rootReducer }) => rootReducer.width) + "px"};
    padding: 1px;
  }
`;

ImageWrapper.defaultProps = {
  width: 125,
};
