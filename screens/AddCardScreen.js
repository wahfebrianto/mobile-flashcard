import React, { Component } from 'react'
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Keyboard,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'
import * as storage from '../helpers'

export class AddCardScreen extends Component {
	state = {
		question: '',
		answer: '',
	}

	handleQuestionChange = text => {
		this.setState({ question: text })
	}

	handleAnswerChange = text => {
		this.setState({ answer: text })
	}

	handleSubmitPress = () => {
		const { selectedDeck } = this.props
		const { question, answer } = this.state
		if (question && answer) {
			storage.addCardToDeck(selectedDeck, { question, answer }).then(value => {
				if (value) {
					this.setState({ question: '', answer: '' })
					Keyboard.dismiss()
					this.props.navigation.dispatch(NavigationActions.back())
				}
			})
		}
	}

	render() {
		const { question, answer } = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.title}>What is the title of your deck?</Text>
				<TextInput
					style={styles.input}
					onChangeText={this.handleQuestionChange}
					value={question}
					placeholder={'Question'}
				/>
				<TextInput
					style={styles.input}
					onChangeText={this.handleAnswerChange}
					value={answer}
					placeholder={'Answer'}
				/>
				<View style={styles.buttonSection}>
					<TouchableOpacity onPress={this.handleSubmitPress}>
						<Text style={styles.button}>Submit</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

AddCardScreen.propTypes = {
	navigation: PropTypes.object,
	selectedDeck: PropTypes.string,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 100,
	},
	input: {
		fontSize: 25,
		padding: 5,
		height: 40,
		borderColor: Colors.textInputBorder,
		borderWidth: 1,
		margin: 10,
	},
	buttonSection: {
		width: '100%',
	},
	button: {
		alignSelf: 'center',
		fontSize: 30,
		backgroundColor: Colors.buttonBackground,
		color: Colors.buttonText,
		width: 200,
		textAlign: 'center',
	},
})

const mapStateToProps = state => state

const mapDispatchToProps = {}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AddCardScreen)
