// 'use strict';
// /* eslint no-sync: 0 */

// import angular from 'angular';

// export class NavbarComponent {
//   menu = [{
//     title: 'Home',
//     link: '/'
//   }];

//   isCollapsed = true;

//   constructor($location, Auth) {
//     'ngInject';

//     this.$location = $location;
//     this.isLoggedIn = Auth.isLoggedInSync;
//     this.isAdmin = Auth.isAdminSync;
//     this.getCurrentUser = Auth.getCurrentUserSync;
//   }

//   isActive(route) {
//     return route === this.$location.path();
//   }
// }

// export default angular.module('directives.navbar', [])
//   .component('navbar', {
//     template: require('./navbar.html'),
//     controller: NavbarComponent
//   })
//   .name;
import angular from 'angular';
const ngRoute = require('angular-route');

export class TaskListController {
  taskList = [];
  newTask = {};
  timeTag = '';
  user = {};

  constructor($http, Auth) {
    'ngInject';

    this.$http = $http;
    this.Auth = Auth;
    var now = new Date();
    this.timeTag = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+(now.getDate()+1); 
  }

  $onInit() {
    this.user = this.Auth.getCurrentUser();
    this.$http.get(`/api/tasks/member/${this.user._id}`)
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

export default angular.module('demoApp.tasklist', [ngRoute])
  .component('tasklist', {
    template: require('./tasklist.html'),
    controller: TaskListController
  })
  .name;
