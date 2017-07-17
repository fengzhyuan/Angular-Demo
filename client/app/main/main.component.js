import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  taskList = [];
  newTask = {
    name: '',
    info: '',
    spent: 0,
    created: '',
    createdBy: '',
    userid: -1,
    edit: false
  };
  userList = {};
  timeTag = '';
  currentUser = {
    id: -1,
    role: 'user'
  };
  constructor($http, $cookies) {
    'ngInject';
    this.$http = $http;
    this.currentUser.id = $cookies.get('userid');
    this.currentUser.role = $cookies.get('urole');
  }

  $onInit() {
    var now = new Date();
    this.timeTag = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1);
    this.newTask.userid = this.currentUser.id;
    let url = (this.currentUser.role==='admin' ? '/api/users' : `/api/users/${this.currentUser.id}`);
    this.$http.get(url)
      .then(response => {
        let users = response.data;
        for(var i = 0, l = users.length; i < l; ++i) {
          this.userList[users[i]._id]=users[i].name;//
        }
        if(this.currentUser.role !== 'admin') {
          this.userList[this.currentUser.id] = users.name;
        }
        url = (this.currentUser.role === 'admin'?'/api/tasks' : `/api/tasks/member/${this.currentUser.id}`);
        this.$http.get(url)
          .then(response1 => {
            this.taskList = response1.data;
            for(let i = 0, len = this.taskList.length; i < len; ++i) {
              this.taskList[i].edit = false;
              this.taskList[i].createdBy = this.userList[this.taskList[i].userid];
            }
          });
      });
  }

  addTask() {
    if(this.newTask.name !== '' || this.newTask.info !== '') {
      this.newTask.created = this.timeTag;
      this.$http.post('/api/tasks', this.newTask).then(() => {
        this.newTask.name = this.newTask.info = '';
        this.newTask.spent = 0;
      });
    }
  }

  updateTask(index) {
    this.$http.put(`/api/tasks/${this.taskList[index]._id}`, this.taskList[index])
    .then(() => {
      this.toggleEdit(index);
    });
  }

  deleteTask(index) {
    this.$http.delete(`/api/tasks/${this.taskList[index]._id}`)
    .then(() => {
      this.taskList.splice(index, 1);
    });
  }

  toggleEdit(index) {
    console.log(index);
    this.taskList[index].edit = !this.taskList[index].edit;
  }

  canEdit(index) {
    let now = new Date();
    let created = new Date(this.taskList[index].created);
    return now.getFullYear() == created.getFullYear()
    && now.getMonth() == created.getMonth()
    && now.getDate() == created.getDate();
  }
}

export default angular.module('demoApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
