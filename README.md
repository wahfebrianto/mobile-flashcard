# MobileFlashcards

MobileFlashcards is a simple react native application to manage your decks with question cards inside them. You can put cards contain question and answer in a deck. You also can start a quiz with selected deck to help you study better.

## Installation

Clone the GitHub repository and use Yarn to install the depedencies.

```
git clone https://github.com/wahfebrianto/mobile-flashcard.git
cd mobile-flashcard
yarn
```

## Usage

To start the development use Yarn.

```
yarn start
```

## What You're Getting

```bash
├── README.md - This file.
├── package.json # package manager file. It's unlikely that you'll need to modify this.
├── App.js # Main application file
├── helpers.js # Contains AsyncStorage functions and Notifications
├── components
│   ├── Deck.js # Deck view component. Show title and cards count.
│   └── TabBarIcon.js # Component to generate icons in the tab bar.
├── contants
│   └── Colors.js # Colors contants.
├── navigations
│   └── MainNavigation.js # File to define navigation in this application.
├── navigations # Consist of action, reducer, and types to manage state in this application.
└── screens
    ├── AddCardScreen.js # Screen to add a new card to the deck.
    ├── AddDeckScreen.js # Screen to add a new deck.
    ├── DeckScreen.js # Screen to view individual deck.
    ├── HomeScreen.js # Screen to view all decks available.
    └── QuizScreen.js # Screen to start and do the deck quiz.
```

## Important

This application is already tested using Xiaomi Mi5 Pro (Android) and Iphone 11 Pro Max.

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). You can find more information on how to perform common tasks [here](https://github.com/react-community/create-react-native-app/blob/master/README.md).
