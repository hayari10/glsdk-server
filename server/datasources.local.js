const { Logger } = require('./utils/logger');

const logger = new Logger('Application Configuration');

const environment = process.env.NODE_ENV;

const config = {
  federalDB: {
    connector: environment === 'testing' ? 'memory' : 'mysql',
    host: process.env.FEDERAL_DB_HOST || 'localhost',
    port: process.env.FEDERAL_DB_PORT ? parseInt(process.env.FEDERAL_DB_PORT, 10) : 3306,
    database: process.env.FEDERAL_DB_NAME || 'grandlyon',
    user: process.env.FEDERAL_DB_USER || 'db_user',
    password: process.env.FEDERAL_DB_PASSWORD || 'P@ssw0rd',
  },
  fileStorage: {
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: process.env.FILE_STORAGE_PATH || '/tmp/storage',
  },
  appDB: {
    connector: environment === 'testing' ? 'memory' : 'mysql',
    host: process.env.APP_DB_HOST || 'localhost',
    port: process.env.APP_DB_PORT ? parseInt(process.env.APP_DB_PORT, 10) : 3307,
    database: process.env.APP_DB_NAME || 'grandlyon',
    user: process.env.APP_DB_USER || 'db_user',
    password: process.env.APP_DB_PASSWORD || 'P@ssw0rd',
  },
};

logger.info(
  JSON.stringify(
    Object.assign(
      {},
      config,
      {
        federalDB: Object.assign({}, config.federalDB, { password: '********' }),
        appDB: Object.assign({}, config.appDB, { password: '********' }),
      },
    ),
  ),
);

module.exports = config;
