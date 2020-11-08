import { createAction } from 'redux-actions';

export const changeNumberOfPairs = createAction('CHANGE_NUMBER_OF_PAIRS');
export const startGame = createAction('START_GAME');
export const resetGame = createAction('RESET_GAME');
export const shuffleCards = createAction('SHUFFLE_CARDS');
export const limitCards = createAction('LIMIT_CARDS');
export const duplicateCards = createAction('DUPLICATE_CARDS');
export const resetCards = createAction('RESET_CARDS');
export const flipAllCards = createAction('FLIP_ALL_CARDS');
export const flipCard = createAction('FLIP_CARD');
export const changeWidth = createAction('CHANGE_WIDTH');
