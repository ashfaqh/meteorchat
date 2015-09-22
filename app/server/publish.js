/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */

Meteor.publish('users', function(){
	if (this.userId) {
		return Meteor.users.find();
	} else {
		this.ready();
	}
});

Meteor.publish('images', function(){
	return Images.find({});
});

Meteor.publish('userStatus', function() {
  return Meteor.users.find({ "status.online": true }, {});
});

Meteor.publish('sessionmanager', function(){
	return SessionManager.find({users: {$eq: this.userId}});
});

Meteor.publish('chatmessage', function(){
	return ChatMessage.find({userId: this.userId});
});