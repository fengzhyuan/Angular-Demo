'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.ip
    || undefined,

  // Server port
  port: process.env.PORT
    || 8080,

  sequelize: {
    uri: process.env.SEQUELIZE_URI
      || 'postgres://spfqiwhdfdvxeh:76538898867857ce6b3ca8772c8773fc153280c2120eb11d7813fa56fffd7b04@ec2-107-20-226-93.compute-1.amazonaws.com:5432/d7cus5bcoi6708',
    options: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: true
      }
    }
  },
  seedDB: false
};
