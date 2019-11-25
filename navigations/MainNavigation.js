import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from '../screens/HomeScreen'
import DeckScreen from '../screens/DeckScreen'
import AddCardScreen from '../screens/AddCardScreen'
import QuizScreen from '../screens/QuizScreen'
import AddDeckScreen from '../screens/AddDeckScreen'

import TabBarIcon from '../components/TabBarIcon'

const homeNavigationStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		Deck: {
			screen: DeckScreen,
		},
		AddCard: {
			screen: AddCardScreen,
		},
		Quiz: {
			screen: QuizScreen,
		},
	},
	{
		initialRouteName: 'Home',
	},
)

homeNavigationStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	),
}

const addDeckNavigationStack = createStackNavigator({
	AddDeck: {
		screen: AddDeckScreen,
	},
})

addDeckNavigationStack.navigationOptions = {
	tabBarLabel: 'New Deck',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-add-circle${focused ? '' : '-outline'}`
					: 'md-add-circle'
			}
		/>
	),
}

const tabNavigator = createBottomTabNavigator({
	homeNavigationStack,
	addDeckNavigationStack,
})

const MainNavigation = createAppContainer(tabNavigator)

export default MainNavigation
