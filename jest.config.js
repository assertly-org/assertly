module.exports = {
  clearMocks: true,
  rootDir: 'api',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__check.js',
    'server.js',
  ],
  coverageProvider: 'v8',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.(ts|js)',
  ],
  preset: 'ts-jest',
}
