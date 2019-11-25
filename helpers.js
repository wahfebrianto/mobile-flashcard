import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const decksKey = 'MobileFlashCards:'

export function getDecks() {
	return AsyncStorage.getItem(`${decksKey}decks`)
		.then(value => {
			if (value) {
				value = JSON.parse(value)
				return value
			} else {
				return []
			}
		})
		.catch(() => {
			return []
		})
}

export function getDeck(title) {
	title = title.replace(' ', '_')
	return AsyncStorage.getItem(`${decksKey}decks`)
		.then(value => {
			if (value) {
				value = JSON.parse(value)
				if (value[title]) {
					return value[title]
				} else {
					return []
				}
			} else {
				return []
			}
		})
		.catch(() => {
			return []
		})
}

export function saveDeckTitle(title) {
	return AsyncStorage.getItem(`${decksKey}decks`)
		.then(value => {
			value = value ? JSON.parse(value) : {}
			value = {
				...value,
				[title.replace(' ', '_')]: {
					title,
					cards: [],
				},
			}
			return AsyncStorage.setItem(`${decksKey}decks`, JSON.stringify(value))
				.then(() => true)
				.catch(() => false)
		})
		.catch(() => false)
}

export async function addCardToDeck(title, card) {
	title = title.replace(' ', '_')
	return AsyncStorage.getItem(`${decksKey}decks`)
		.then(value => {
			if (value) {
				value = JSON.parse(value)
				if (value[title]) {
					value[title].cards.push(card)
					return AsyncStorage.setItem(`${decksKey}decks`, JSON.stringify(value))
						.then(() => true)
						.catch(() => false)
				} else {
					return false
				}
			} else {
				return false
			}
		})
		.catch(() => false)
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(`${decksKey}notification`).then(
		Notifications.cancelAllScheduledNotificationsAsync,
	)
}

createNotification = () => {
	return {
		title: 'Go start your quiz!',
		body: "Don't forget to study today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		},
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(`${decksKey}notification`)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync()

						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate() + 1)
						tomorrow.setHours(20)
						tomorrow.setMinutes(0)

						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: 'day',
						})

						AsyncStorage.setItem(
							`${decksKey}notification`,
							JSON.stringify(true),
						)
					}
				})
			}
		})
}
