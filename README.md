# Animating Modal Card

"App of the day" animating card to modal for React Native. This is a prototype and meant to prove that you can do this animation/feature in React Native. That is the reason behind no unit tests or CI - just a proof of concept.

However, this feature/POC does function pretty much exactly like the AotD feature and is safe to use in development and add unit tests too.

## Usage
If you are looking to use this in your own app - the main files you will need are all located in the `components` directory.

1. AnimatedCard.tsx - the trigger
2. AnimatedModal.tsx - the modal that gives most of the animations
3. CloseButton.tsx - how the modal is closed
4. AnimatingImage.tsx - the feature image that has some minor animation props

## Getting Started
This app was built with Expo. To create a free account with Expo just follow the [Setting Up](https://reactnative.dev/docs/environment-setup) docs for React Native.

Once you have an account and have cloned this repo, just run `yarn start`.