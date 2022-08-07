const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    "preset": "ts-jest",
    "testRegex": "((\\.|/*.)(spec))\\.(j|t)s?$",
    "transform": {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "testPathDirs": ["src"],
    "setupFiles": ["dotenv/config"],
    "testEnvironment": "node",
    "verbose": true,
    "bail": true,
    "moduleDirectories": ["node_modules", "src"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */ )

    // "moduleNameMapper": {
    //     "^@/routers/(.*)$": "<rootDir>/src/routers/$1",
    //     "^@/models/(.*)$": "<rootDir>/src/server/models/$1",
    //     "^@/migrations/(.*)$": "<rootDir>/src/server/migrations/$1",
    //     "^@/controllers/(.*)$": "<rootDir>/src/server/controllers/$1",
    //     "@/controllers": "<rootDir>/src/server/controllers/",
    //     "^@/config/(.*)$": "<rootDir>/src/server/config/$1",
    //     "@/types": "<rootDir>/src/types",
    //     "@/schema": "<rootDir>/src/schema",
    //     "@/config": "<rootDir>/src/config",
    //     "@/tools": "<rootDir>/src/tools"
    // }
}