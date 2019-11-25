import { GET_DECK_DATA, OPEN_DECK, START_QUIZ, NEXT_CARD } from '../Types'

const actionCreator = (type, payload = []) => ({
	type,
	payload,
})

export const getDeckData = decks => {
	return actionCreator(GET_DECK_DATA, { decks })
}

export const openDeck = title => {
	return actionCreator(OPEN_DECK, { selectedDeck: title })
}

export const startQuiz = () => {
	return actionCreator(START_QUIZ)
}

export const nextCard = correct => {
	return actionCreator(NEXT_CARD, correct)
}
