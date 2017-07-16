'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/demo-test'
  },
  sequelize: {
    uri: 'postgres://postgres:postgres@localhost:5432/dev.pean',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }
};
