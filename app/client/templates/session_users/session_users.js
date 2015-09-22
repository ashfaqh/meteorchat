/*****************************************************************************/
/* SessionUsers: Event Handlers */
/*****************************************************************************/
Template.SessionUsers.events({
	'click span[name="sessiontype"]': function(event, template) {
		event.preventDefault();
		var currentRoute = Router.current().route.getName();
		if (currentRoute == 'pad') {
			Router.go('/session/' + this.sessionId, this.sessionId);
		} else {
			Router.go('/session/pad/' + this.sessionId, this.sessionId);
		}
	}	
});

/*****************************************************************************/
/* SessionUsers: Helpers */
/*****************************************************************************/
Template.SessionUsers.helpers({
	usernames: function() {
		var usersArray = [];
		var sessionCursor = SessionManager.find({_id: this.sessionId}, {users: 1});
		sessionCursor.forEach(function(session){
			var sessionUsers = session.users;
			var sliceIndex = sessionUsers.indexOf(Meteor.user()._id);
			if (sliceIndex > -1) {
				sessionUsers.splice(sliceIndex, 1);
			}			
			usersArray = usersArray.concat(sessionUsers);
		});
		
		var userNames = [];
		usersArray.forEach(function(userId){
			var user = Meteor.users.findOne({_id: userId});
			if (user) {
				userNames.push(user.profile.name);
			}
		})
		return userNames.join(' , ');
	},
	'iconClass': function() {
		if (Router.current().route.getName() == 'pad') {
			return 'fa-font';
		} else {
			return 'fa-pencil';
		}
	}
});

/*****************************************************************************/
/* SessionUsers: Lifecycle Hooks */
/*****************************************************************************/
Template.SessionUsers.created = function () {
};

Template.SessionUsers.rendered = function () {
};

Template.SessionUsers.destroyed = function () {
};
