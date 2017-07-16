import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  taskList = [];
  newTask = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/tasks')
      .then(response => {
        this.taskList = response.data;
      });
  }

  addThing() {
    if(this.newTask) {
      this.$http.post('/api/tasks', {
        name: this.newTask
      });
      this.newTask = '';
    }
  }

  deleteThing(task) {
    this.$http.delete(`/api/tasks/${task._id}`);
  }
}

export default angular.module('demoApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
