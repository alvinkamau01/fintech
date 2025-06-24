module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(@adobe/css-tools|@testing-library/jest-dom|@chakra-ui|react-syntax-highlighter|@babel/preset-react)/)"
  ],
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { "presets": ["@babel/preset-env", "@babel/preset-react"] }]
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  globals: {
    "NODE_ENV": "test"
  }
}
