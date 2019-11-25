import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Animated,
} from 'react-native'

export default class Deck extends Component {
	state = {
		opacity: new Animated.Value(1),
	}

	handleOnPress = () => {
		const { onPress } = this.props
		const { opacity } = this.state
		if (onPress) {
			Animated.sequence([
				Animated.timing(opacity, { toValue: 0, duration: 700 }),
				Animated.timing(opacity, { toValue: 1, duration: 700 }),
			]).start(onPress)
		}
	}

	render() {
		const { name, cardCount } = this.props
		const { opacity } = this.state
		return (
			<TouchableOpacity onPress={this.handleOnPress}>
				<Animated.View style={[styles.container, { opacity }]}>
					<Text style={[styles.text, styles.name]}>{name}</Text>
					<Text style={[styles.text, styles.subtitle]}>{cardCount} cards</Text>
				</Animated.View>
			</TouchableOpacity>
		)
	}
}

Deck.propTypes = {
	cardCount: PropTypes.number,
	name: PropTypes.string,
	onPress: PropTypes.func,
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		margin: 15,
	},
	text: {
		textAlign: 'center',
	},
	name: {
		fontSize: 35,
	},
	subtitle: {
		fontSize: 15,
	},
})
