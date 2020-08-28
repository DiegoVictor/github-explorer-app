# About
This app permit to users track github's users and see their starred projects.<br /><br />
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/master/screenshots/main.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/master/screenshots/user.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/master/screenshots/repo.png" width="32%" />

# OS
This app was tested only with Android through USB connection, is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Install
```
$ yarn
```

# Dependencies
Was installed and configured the `eslint` and `prettier` to keep the code clean and patterned.

# Reactotron
This project is configured with [Reactotron](https://github.com/infinitered/reactotron), just open the Reactotron GUI before the app is up and running, after start the app Reactotron will identify new connections.
> If Reactotron show an empty timeline after the app is running try run `adb reverse tcp:9090 tcp:9090`, then reload the app.

# Start up
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn react-native run-android
```
In the next times you can just run the Metro Bundler server:
```
$ yarn start
```

# Tests
```
$ yarn test
```
