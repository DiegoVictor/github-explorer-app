# [App] GitHub Explorer
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/github-explorer-app?style=flat-square&logo=circleci)
[![react-native](https://img.shields.io/badge/react--native-0.67.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-5.3.3-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-27.5.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
![Codecov](https://img.shields.io/codecov/c/github/diegovictor/github-explorer-app?logo=codecov&style=flat-square)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This app allow to users track github's users and see their starred projects.

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [API](#api)
* [Usage](#usage)
  * [OS](#os)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/main/screenshots/main.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/main/screenshots/user.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/main/screenshots/repo.png" width="32%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## API
The application uses the [GitHub's API](https://developer.github.com/v3) and it has some rate limitations, if suddenly the app stops to show data take a look at this first!
> See more on about [Rate limiting](https://developer.github.com/v3/#rate-limiting)

# Usage
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn react-native run-android
```
Or
```
$ npx react-native run-android
```
In the next times you can just run the Metro Bundler server:
```
$ yarn start
```
Or:
```
$ npm run start
```
> See for more information in [Running On Device](https://reactnative.dev/docs/running-on-device).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.

