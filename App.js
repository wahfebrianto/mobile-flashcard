import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './redux/reducers'
import MainNavigation from './navigations/MainNavigation'

import { setLocalNotification } from './helpers'

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={styles.container}>
					<MainNavigation />
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
