import { handleActions } from "redux-actions";
import * as Actions from "../actions";
import { combineReducers } from "redux";

const clone = require("rfdc")();

const initialState = {
  width: 127,
  numberOfPairs: 6,
  numberOfFoundPairs: 0,
  numberOfAttempts: 0,
  isLoading: true,
  clickCounter: 0,
  matching: false,
  matchingCard: null,
  cards: [
    {
      src: "images/pair-1.jpg",
      isActive: false,
    },
    {
      src: "images/pair-2.jpg",
      isActive: false,
    },
    {
      src: "images/pair-3.jpg",
      isActive: false,
    },
    {
      src: "images/pair-4.jpg",
      isActive: false,
    },
    {
      src: "images/pair-5.jpg",
      isActive: false,
    },
    {
      src: "images/pair-6.jpg",
      isActive: false,
    },
    {
      src: "images/pair-7.jpg",
      isActive: false,
    },
    {
      src: "images/pair-8.jpg",
      isActive: false,
    },
    {
      src: "images/pair-9.jpg",
      isActive: false,
    },
    {
      src: "images/pair-10.jpg",
      isActive: false,
    },
    {
      src: "images/pair-11.jpg",
      isActive: false,
    },
    {
      src: "images/pair-12.jpg",
      isActive: false,
    },
    {
      src: "images/pair-13.jpg",
      isActive: false,
    },
    {
      src: "images/pair-14.jpg",
      isActive: false,
    },
    {
      src: "images/pair-15.jpg",
      isActive: false,
    },
    {
      src: "images/pair-16.jpg",
      isActive: false,
    },
    {
      src: "images/pair-17.jpg",
      isActive: false,
    },
    {
      src: "images/pair-18.jpg",
      isActive: false,
    },
    {
      src: "images/pair-19.jpg",
      isActive: false,
    },
    {
      src: "images/pair-20.jpg",
      isActive: false,
    },
    {
      src: "images/pair-21.jpg",
      isActive: false,
    },
  ],
};

const rootReducer = handleActions(
  {
    [Actions.changeNumberOfPairs]: (state, action) => ({
      ...state,
      numberOfPairs: action.payload,
    }),
    [Actions.changeWidth]: (state, action) => {
      return {
        ...state,
      width: action.payload,
      }
    },
    [Actions.resetGame]: (state, action) => ({
      ...initialState,
      numberOfPairs: state.numberOfPairs,
    }),
    [Actions.startGame]: (state, action) => ({
      ...state,
      isPlaying: true,
    }),
    [Actions.resetCards]: (state, action) => ({
      ...state,
      cards: initialState.cards,
    }),
    [Actions.shuffleCards]: (state, action) => {
      let array = state.cards;
      let len = array.length - 1;
      for (let i = len; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return {
        ...state,
        cards: [...array],
      };
    },
    [Actions.limitCards]: (state, action) => {
      let limitedCards = state.cards;
      limitedCards.splice(state.numberOfPairs);
      return {
        ...state,
        cards: [...limitedCards],
      };
    },
    [Actions.duplicateCards]: (state, action) => {
      let duplicatedCards1 = clone(state.cards);
      let duplicatedCards2 = clone(state.cards);

      let newDuplicatedCards = [...duplicatedCards1, ...duplicatedCards2];
      newDuplicatedCards.forEach((el, index) => {
        el.index = index;
        el.isActive = true;
        el.match = false;
      });
      return {
        ...state,
        cards: newDuplicatedCards,
      };
    },
    [Actions.flipAllCards]: (state, action) => {
      let flipedCards = state.cards;
      flipedCards.forEach((el, index) => {
        if (el.match === false) {
          el.isActive = false;
        } else if (el.match === true) {
          el.timed = false;
        }
      });
      return {
        ...state,
        cards: [...flipedCards],
        matching: false,
        isPlaying: true,
      };
    },
    [Actions.flipCard]: (state, action) => {
      let flippedCardIndex = state.cards.findIndex(
        (el) => el.index === action.payload
      );

      let numberOfFoundPairs = state.numberOfFoundPairs;

      let allCards = clone(state.cards);
      // flip first card and remember it
      if (state.clickCounter === 0) {
        let newCounter = state.clickCounter;
        newCounter++;

        let allCards = clone(state.cards);

        allCards.forEach((el) => {
          if (el.index === action.payload) {
            el.isActive = true;
          }
        });

        let firstFlippedCard = allCards[flippedCardIndex];
        return Object.assign({}, state, {
          cards: [...allCards],
          clickCounter: newCounter,
          matchingCard: firstFlippedCard,
        });
      } else if (state.clickCounter === 1) {
        let newCounter = 0;
        let numberOfAttempts = state.numberOfAttempts;
        numberOfAttempts++;

        // flip Second Card
        allCards.forEach((el) => {
          if (el.index === action.payload) {
            el.isActive = true;
          }
        });

        // does the two cards match ?
        if (state.matchingCard.src === allCards[flippedCardIndex].src) {
          allCards.forEach((el) => {
            if (el.src === state.matchingCard.src) {
              el.match = true;
              el.isActive = false;
              el.timed = true;
            }
          });

          numberOfFoundPairs++;
        }

        return {
          ...state,
          cards: [...allCards],
          clickCounter: newCounter,
          matching: true,
          matchingCard: initialState.matchingCard,
          numberOfFoundPairs,
          numberOfAttempts,
          isPlaying: false,
        };
      }
    },
  },
  initialState
);

export default combineReducers({ rootReducer });
