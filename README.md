# [App] GitHub Explorer

[![AppVeyor](https://img.shields.io/appveyor/build/diegovictor/github-explorer-app?logo=appveyor&style=flat-square)](https://ci.appveyor.com/project/DiegoVictor/github-explorer-app)
[![react-native](https://img.shields.io/badge/react--native-0.86.3-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-6.5.3-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-9.39.5-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![jest](https://img.shields.io/badge/jest-29.7.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![expo](https://img.shields.io/badge/expo-57.0.18-000000?style=flat-square&logo=expo)](https://expo.io/)
[![coverage](https://img.shields.io/codecov/c/github/diegovictor/github-explorer-app?logo=codecov&style=flat-square)](https://app.codecov.io/gh/DiegoVictor/github-explorer-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/github-explorer-app/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This app allow to users track github's users and see their starred projects.

## Table of Contents

- [Screenshots](#screenshots)
- [Installing](#installing)
  - [API](#api)
- [Usage](#usage)
  - [Expo](#expo)
- [Running the tests](#running-the-tests)
  - [Coverage report](#coverage-report)

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
$ npm run android
```

Or:

```
$ yarn android
```

> For iOS use `ios` instead of `android`

For the next time you can just start the server running:

```
$ yarn start
```

Or:

```
$ npm run start
```

## Expo

This project was built using [Expo](https://expo.dev), to know how to run it in any environment see [Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment).

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
