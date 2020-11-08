import { takeEvery } from 'redux-saga/effects';

// import * as Actions from '../actions';

function changeNumberOfPairs(payload) {
	return { type: 'CHANGE_NUMBER_OF_PAIRS', payload };
  }

  export function startGame(payload) {
	return { type: 'START_GAME', payload };
  }
  
  export function resetGame(payload) {
	return { type: 'RESET_GAME', payload };
  }
  
  export function shuffleCards(payload) {
	return { type: 'SHUFFLE_CARDS', payload };
  }
  
  export function limitCards(payload) {
	return { type: 'LIMIT_CARDS', payload };
  }
  
  export function duplicateCards(payload) {
	return { type: 'DUPLICATE_CARDS', payload };
  }
  
  export function resetCards(payload) {
	return { type: 'RESET_CARDS', payload };
  }
  
  export function flipAllCards(payload) {
	return { type: 'FLIP_ALL_CARDS', payload };
  }
  
  export function flipCard(payload) {
	return { type: 'FLIP_CARD', payload };
  }
  export function changeWidth(payload) {
	return { type: 'CHANGE_WIDTH', payload };
  }



  export default function* rootSaga() {
    yield takeEvery('CHANGE_NUMBER_OF_PAIRS', changeNumberOfPairs);
    yield takeEvery('START_GAME', startGame);
    yield takeEvery('RESET_GAME', resetGame);
    yield takeEvery('SHUFFLE_CARDS', shuffleCards);
    yield takeEvery('LIMIT_CARDS', limitCards);
    yield takeEvery('DUPLICATE_CARDS', duplicateCards);
    yield takeEvery('RESET_CARDS', resetCards);
    yield takeEvery('FLIP_ALL_CARDS', flipAllCards);
    yield takeEvery('FLIP_CARD', flipCard);
    yield takeEvery('CHANGE_WIDTH', changeWidth);
}
