module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/pages/**/*.js', '!src/pages/Repository/*.js'],
  coverageDirectory: 'tests/coverage',
  coverageReporters: ['text', 'lcov'],
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm|(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@faker-js/faker))',
  ],
};
