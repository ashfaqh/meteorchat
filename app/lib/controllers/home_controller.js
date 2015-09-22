HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
  	this.subscribe('users');
  	this.subscribe('images');
  	this.subscribe('userStatus');
  	this.subscribe('sessionmanager');
    this.subscribe('chatmessage');
  },

  action: function() {
    this.render('Home');
  }
});
