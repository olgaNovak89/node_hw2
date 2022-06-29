export default {
    development: {
      username: 'postgres',
      password: 'qwerty',
      database: 'homework2',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    test: {
      username: 'root',
      password: 'qwerty',
      database: 'homework2',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    production: {
      use_env_variable: '',
      dialect: 'postgres',
    },
  }
