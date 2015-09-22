/*****************************************************************************/
/* Userlist: Event Handlers */
/*****************************************************************************/
Template.Userlist.events({
	'click .user-list-profile': function(event, template) {
    var listeners = [];
    listeners.push(this._id);
    listeners.push(Meteor.userId());
    setSessionUsers(listeners, Meteor.userId());
	}
});

/*****************************************************************************/
/* Userlist: Helpers */
/*****************************************************************************/
Template.Userlist.helpers({
	windowHeight: function() {
    return $(window).height();
  },
  users: function() {
		return Meteor.users.find();
	},
  profileImage: function(imageId) {
    return Images.find({_id: imageId});    
  },
  statusClass: function() {
  	var status = this.status['online'];
  	switch (status) {
  		case false:
    		return "fa-clock-o status-error";
  		case true:
				return "fa-check-circle status-success";
  		case null:
  			return "status-error";
  		default:
  			return "status-default";
  	}
  },
  notificationCount: function(senderId) {
    return ChatMessage.find({userId: Meteor.userId(), sender: senderId, read: false}).count();
  }
});

/*****************************************************************************/
/* Userlist: Lifecycle Hooks */
/*****************************************************************************/
Template.Userlist.created = function () {
};

Template.Userlist.rendered = function () {
};

Template.Userlist.destroyed = function () {
};
