import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Deck from '../components/Deck'
import * as actions from '../redux/actions'
import * as storage from '../helpers'

export class DeckScreen extends Component {
	state = {
		deck: [],
	}

	componentDidMount() {
		this.getDeck()
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			this.getDeck()
		})
	}

	getDeck() {
		const { selectedDeck } = this.props
		storage.getDeck(selectedDeck).then(value => {
			if (value) {
				this.setState({ deck: value })
			}
		})
	}

	toAddCard = () => {
		this.props.navigation.dispatch(
			NavigationActions.navigate({ routeName: 'AddCard' }),
		)
	}

	toStartQuiz = () => {
		const { startQuiz } = this.props
		startQuiz()
		this.props.navigation.dispatch(
			NavigationActions.navigate({ routeName: 'Quiz' }),
		)
	}

	render() {
		const { deck } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.titleSection}>
					<Deck
						name={deck.title || ''}
						cardCount={deck.cards ? deck.cards.length : 0}
					/>
				</View>
				<View style={styles.actionSection}>
					<TouchableOpacity onPress={this.toAddCard}>
						<Text style={[styles.button, styles.addButton]}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.toStartQuiz}>
						<Text style={[styles.button, styles.quizButton]}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

DeckScreen.propTypes = {
	navigation: PropTypes.object,
	selectedDeck: PropTypes.string,
	startQuiz: PropTypes.func,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	titleSection: {
		flex: 1,
		paddingTop: 50,
	},
	actionSection: {
		flex: 1,
	},
	button: {
		alignSelf: 'center',
		fontSize: 25,
		width: 200,
		textAlign: 'center',
		borderWidth: 1,
		borderColor: 'black',
		margin: 20,
		borderRadius: 3,
	},
	addButton: {
		backgroundColor: 'white',
		color: 'black',
	},
	quizButton: {
		backgroundColor: 'black',
		color: 'white',
	},
})

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	startQuiz: () => dispatch(actions.startQuiz()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DeckScreen)
