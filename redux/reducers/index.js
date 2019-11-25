import { GET_DECK_DATA, OPEN_DECK, START_QUIZ, NEXT_CARD } from '../Types'

const INITIAL_STATE = {
	decks: [],
	selectedDeck: '',
	cardIndex: 0,
	correctAnswer: 0,
}

function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_DECK_DATA:
		case OPEN_DECK:
			return {
				...state,
				...action.payload,
			}
		case START_QUIZ:
			return {
				...state,
				cardIndex: 0,
				correctAnswer: 0,
			}
		case NEXT_CARD:
			return {
				...state,
				cardIndex: state.cardIndex + 1,
				correctAnswer: state.correctAnswer + (action.payload ? 1 : 0),
			}
		default:
			return { ...state }
	}
}

export default reducer
