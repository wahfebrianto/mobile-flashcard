import React, { Component } from 'react'
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import Colors from '../constants/Colors'
import * as storage from '../helpers'

export class QuizScreen extends Component {
	state = {
		answer: '',
		cards: [],
	}

	componentDidMount() {
		this.getCards()
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			this.getCards()
		})
	}

	getCards() {
		const { selectedDeck } = this.props
		storage.getDeck(selectedDeck).then(value => {
			if (value) {
				this.setState({ cards: value.cards })
			}
		})
	}

	handleSubmitPress = (realAnswer, userAnswer, correctMode, finish) => {
		const { nextCard } = this.props
		this.setState({ answer: '' })
		nextCard(
			correctMode ? realAnswer === userAnswer : realAnswer !== userAnswer,
		)
		finish && storage.clearLocalNotification()
	}

	handleFinishButtonPress = restart => {
		if (restart) {
			const { startQuiz } = this.props
			startQuiz()
		} else {
			this.props.navigation.dispatch(
				NavigationActions.navigate({ routeName: 'Deck' }),
			)
		}
	}

	noCard = () => {
		return (
			<Text style={styles.noCard}>
				Sorry, you cannot take a quiz because there are no cards in the deck.
			</Text>
		)
	}

	displayCard = cardIndex => {
		const { answer, cards } = this.state
		const cardCount = cards ? cards.length : 0
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.questionNumber}>
					{cardIndex + 1} / {cardCount}
				</Text>
				<Text style={styles.question}>{cards[cardIndex].question}</Text>
				<View style={styles.answerContainer}>
					<TextInput
						value={answer}
						onChangeText={text => this.setState({ answer: text })}
						style={styles.answerInput}
						placeholder={'Answer'}
					/>
					<TouchableOpacity
						onPress={() => this.setState({ answer: cards[cardIndex].answer })}
						style={styles.revealButtonContainer}
					>
						<Text style={styles.revealButton}>Show Answer</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.submitButtonSection}
					onPress={() =>
						this.handleSubmitPress(
							cards[cardIndex].answer,
							answer,
							true,
							cardIndex + 1 === cardCount,
						)
					}
				>
					<Text style={[styles.submitButton, styles.greenButton]}>Correct</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.submitButtonSection}
					onPress={() =>
						this.handleSubmitPress(
							cards[cardIndex].answer,
							answer,
							false,
							cardIndex + 1 === cardCount,
						)
					}
				>
					<Text style={[styles.submitButton, styles.redButton]}>Incorrect</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}

	quizDone = cardCount => {
		const { correctAnswer } = this.props
		return (
			<View style={styles.container}>
				<Text style={styles.questionNumber}>
					Correct Answer: {correctAnswer} / {cardCount}
				</Text>
				<TouchableOpacity
					style={styles.submitButtonSection}
					onPress={() => this.handleFinishButtonPress(true)}
				>
					<Text style={[styles.submitButton, styles.whiteButton]}>
						Restart Quiz
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.submitButtonSection}
					onPress={() => this.handleFinishButtonPress(false)}
				>
					<Text style={[styles.submitButton, styles.blackButton]}>
						Back to Deck
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		const { cardIndex } = this.props
		const { cards } = this.state
		const cardCount = cards ? cards.length : 0
		return (
			<View style={styles.container}>
				{cards && cards.length > 0
					? cardIndex < cardCount
						? this.displayCard(cardIndex)
						: this.quizDone(cardCount)
					: this.noCard()}
			</View>
		)
	}
}

QuizScreen.propTypes = {
	cardIndex: PropTypes.number,
	correctAnswer: PropTypes.number,
	navigation: PropTypes.object,
	nextCard: PropTypes.func,
	selectedDeck: PropTypes.string,
	startQuiz: PropTypes.func,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	noCard: {
		fontSize: 30,
		textAlign: 'center',
	},
	questionNumber: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 20,
	},
	question: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 5,
	},
	answerContainer: {
		flexDirection: 'row',
		padding: 10,
		marginBottom: 60,
	},
	answerInput: {
		flex: 7,
		fontSize: 25,
		padding: 5,
		height: 40,
		borderColor: Colors.textInputBorder,
		borderWidth: 1,
		margin: 5,
	},
	revealButtonContainer: {
		flex: 3,
		padding: 5,
	},
	revealButton: {
		flex: 1,
		fontSize: 15,
		lineHeight: 25,
		backgroundColor: 'black',
		color: Colors.buttonText,
		padding: 5,
		textAlign: 'center',
	},
	submitButtonSection: {
		width: 300,
		alignSelf: 'center',
	},
	submitButton: {
		fontSize: 30,
		color: Colors.buttonText,
		textAlign: 'center',
		marginBottom: 10,
		borderWidth: 1,
	},
	greenButton: {
		backgroundColor: 'green',
	},
	redButton: {
		backgroundColor: 'red',
	},
	whiteButton: {
		backgroundColor: 'white',
		color: 'black',
	},
	blackButton: {
		backgroundColor: 'black',
	},
})

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	nextCard: correct => dispatch(actions.nextCard(correct)),
	startQuiz: () => dispatch(actions.startQuiz()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(QuizScreen)
