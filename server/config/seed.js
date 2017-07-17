/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let Task = sqldb.Task;
    let User = sqldb.User;

    Task.destroy({ where: {} })
      .then(() => {
        let task = Task.bulkCreate([{
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.',
          spent: 1,
          created: '2011-05-16 15:36:38',
          userid: 1
        }]);
        return task;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.destroy({ where: {} })
      .then(() => {
        let user = User.bulkCreate([{
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        }]);
      return user;
      })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
  }
}
