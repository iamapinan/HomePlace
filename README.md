![Build Status](https://github.com/iamapinan/HomePlace/workflows/Java%20CI%20with%20Gradle/badge.svg)

# HomePlace
I make this app for idea proving for food order app.  
You can use this app as a example to learn how to code react-native app.  
Version 1.0 (unreleased)

### dependency
- Android SDK
- Android Studio must installed
- Android virtual device or real device.

### To use react native cli command
try to install `npm install -g react-native-cli`

### Installation
```
npm install
react-native link

// for ios test
react-native run-ios 

// for android test
react-native run-android
```
### Troubleshooter
`error: Error: Unable to resolve module @react-native-community/toolbar-android from node_modules/react-native-vector-icons/lib/toolbar-android.js: @react-native-community/toolbar-android could not be found within the project.` 

**To fix**
```
rm -rf node_modules
rm package-lock.json
npm i
yarn add @react-native-community/toolbar-android
react-native link
react-native start --reset-cache
react-native run-android
```

### folder structure
`src/pages` is page for application.  
`src/images` is image files 
`src/styles` is style components  
`src/components` is shared components  
`src/configs` is menu configurations  

### important files 
`src/Router.js` is routing config file. 

### Platforms
- Android
- iOS

### Contributors
- Apinan Woratrakun

### LICENSE
Free to copy and learn but not allow to use this app as commercial.
