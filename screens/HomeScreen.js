import React, { Component } from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import Deck from '../components/Deck'
import * as storage from '../helpers'

class HomeScreen extends Component {
	componentDidMount() {
		this.getDecks()
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			this.getDecks()
		})
	}

	getDecks() {
		const { getDeckData } = this.props
		storage.getDecks().then(decks => {
			if (decks) {
				decks = Object.keys(decks).map(key => decks[key])
			}
			decks && getDeckData(decks)
		})
	}

	goToDeckDetail = title => {
		const { openDeck } = this.props
		storage.getDeck(title).then(deck => {
			if (deck) {
				openDeck(title)
				this.props.navigation.dispatch(
					NavigationActions.navigate({ routeName: 'Deck' }),
				)
			}
		})
	}

	render() {
		const { decks } = this.props
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={decks}
					renderItem={({ item }) => (
						<Deck
							name={item.title || ''}
							cardCount={item.cards ? item.cards.length : 0}
							onPress={() => this.goToDeckDetail(item.title)}
						/>
					)}
					keyExtractor={item => item.title}
				/>
			</SafeAreaView>
		)
	}
}

HomeScreen.propTypes = {
	decks: PropTypes.arrayOf(PropTypes.object),
	getDeckData: PropTypes.func,
	navigation: PropTypes.object,
	openDeck: PropTypes.func,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		textAlign: 'center',
	},
	name: {
		fontSize: 40,
	},
	subtitle: {
		fontSize: 20,
	},
})

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	openDeck: deck => dispatch(actions.openDeck(deck)),
	getDeckData: decks => dispatch(actions.getDeckData(decks)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeScreen)
