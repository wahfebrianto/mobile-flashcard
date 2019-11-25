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
import * as actions from '../redux/actions'
import * as storage from '../helpers'

export class AddDeckScreen extends Component {
	state = {
		deckName: '',
	}

	handleDeckNameChange = text => {
		this.setState({ deckName: text })
	}

	handleAddDeckPress = () => {
		const { openDeck } = this.props
		const { deckName } = this.state
		if (deckName) {
			storage.saveDeckTitle(deckName).then(value => {
				if (value) {
					storage.getDeck(deckName).then(value => {
						if (value) {
							openDeck(deckName)
							this.setState({ deckName: '' })
							Keyboard.dismiss()
							this.props.navigation.dispatch(
								NavigationActions.navigate({
									routeName: 'Deck',
								}),
							)
						}
					})
				} else {
					console.log('Save Deck Failed!')
				}
			})
		}
	}

	render() {
		const { deckName } = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.title}>What is the title of your deck?</Text>
				<TextInput
					style={styles.input}
					onChangeText={this.handleDeckNameChange}
					value={deckName}
					placeholder={'Title'}
				/>
				<View style={styles.buttonSection}>
					<TouchableOpacity onPress={this.handleAddDeckPress}>
						<Text style={styles.button}>Create Deck</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

AddDeckScreen.propTypes = {
	navigation: PropTypes.object,
	openDeck: PropTypes.func,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 50,
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

const mapDispatchToProps = dispatch => ({
	openDeck: title => dispatch(actions.openDeck(title)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AddDeckScreen)
