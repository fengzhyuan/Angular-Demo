import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  taskList = [];
  newTask = {};
  timeTag = '';
  userid = -1;

  constructor($http, $cookies) {
    'ngInject';
    this.userid = $cookies.get('userid');
    this.$http = $http;
    var now = new Date();
    this.timeTag = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+(now.getDate()+1); 
  }

  $onInit() {
    this.$http.get(`/api/tasks/member/${this.userid}`)
      .then(response => {
        this.taskList = response.data;
        for (var i = 0, len = this.taskList.length; i < len; ++i) {
          this.taskList[i].edit = false;
        }
      });
  }

  addTask() {
    if(this.newTask) {
      this.newTask.created = this.timeTag;
      this.$http.post('/api/tasks').success(() => {
        this.taskList.push(newTask);
      }).error( () => {
        alert('error');
      })
      this.newTask = {};
    }
  }

  updateTask(index) {
    this.$http.put(`/api/tasks/${this.taskList[index]._id}`, this.taskList[index])
    .then(response => {
      this.toggleEdit(index);
    })  ;
  }

  deleteTask(index) {
    this.$http.delete(`/api/tasks/${this.taskList[index]._id}`)
    .then(response => {
      this.taskList.splice(index, 1);
    });
  }

  toggleEdit (index) {
    console.log(index);
    this.taskList[index].edit = !this.taskList[index].edit;
  }
}

export default angular.module('demoApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
