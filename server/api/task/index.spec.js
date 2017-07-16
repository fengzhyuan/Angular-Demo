'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var taskCtrlStub = {
  index: 'taskCtrl.index',
  indexUser: 'taskCtrl.indexUser',
  show: 'taskCtrl.show',
  create: 'taskCtrl.create',
  update: 'taskCtrl.update',
  patch: 'taskCtrl.patch',
  delete: 'taskCtrl.delete'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var taskIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './task.controller': taskCtrlStub
});

describe('Task API Router:', function() {
  it('should return an express router instance', function() {
    taskIndex.should.equal(routerStub);
  });

  describe('GET /api/tasks', function() {
    it('should route to task.controller.index', function() {
      routerStub.get
        .withArgs('/', 'taskCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/tasks/member/:userid', function() {
    it('should route to task.controller.indexUser', function() {
      routerStub.get
        .withArgs('/:userid', 'taskCtrl.indexUser')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/tasks/:id', function() {
    it('should route to task.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'taskCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/tasks', function() {
    it('should route to task.controller.create', function() {
      routerStub.post
        .withArgs('/', 'taskCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/tasks/:id', function() {
    it('should route to task.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'taskCtrl.update')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/tasks/:id', function() {
    it('should route to tasks.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'tasksCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/tasks/:id', function() {
    it('should route to tasks.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tasksCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
