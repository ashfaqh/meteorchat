/*****************************************************************************/
/* Chatlog: Event Handlers */
/*****************************************************************************/
Template.Chatlog.events({
	'change .chat-message': function(event, tmpl) {
		console.log("triggered");
	}
});

/*****************************************************************************/
/* Chatlog: Helpers */
/*****************************************************************************/
Template.Chatlog.helpers({
	chatMessage: function() {
		var chatSession = SessionManager.findOne({_id: this.sessionId});
		return chatSession.messages;
	},
	messagePosition: function(user) {
		if (user == Meteor.user()._id) {
			return 'pull-right';
		} else {
			return 'pull-left';
		}
	},
	imagePosition: function(user) {
		if (user == Meteor.user()._id) {
			return 'pull-right';
		}	else {
			return 'pull-left';
		}
	},
	textCallout: function(user) {
		if (user == Meteor.user()._id) {
			return 'callout left';
		} else {
			return 'callout right';
		}
	},
	user: function(userId) {
		return Meteor.users.findOne({_id: userId});
	},
  profileImage: function(imageId) {
    return Images.find({_id: imageId});    
  },
  'new_message': function() {
		if (Session.get('new-message')) {
			$('#chatbox').prop({scrollTop:$('#chatbox').prop("scrollHeight")});
		}
	},
	'sendername': function(userId) {
		return Meteor.users.findOne({_id: userId}).profile.name;
	},
	'sentdate': function(senddate) {
		return moment(senddate).fromNow();
	},
	'senttime': function(senddate) {
		return moment(senddate).format('hh:mm A');
	}
});

/*****************************************************************************/
/* Chatlog: Lifecycle Hooks */
/*****************************************************************************/
Template.Chatlog.created = function () {
};

Template.Chatlog.rendered = function () {
};

Template.Chatlog.destroyed = function () {
};