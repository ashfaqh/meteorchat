/*****************************************************************************/
/* SessionWindow: Event Handlers */
/*****************************************************************************/
Template.SessionWindow.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var message = {
			sessionId: this.sessionId,
			sender: Meteor.userId(),
			message: template.find('[name=message]').value,
			date: new Date()
		};
		if (message.message == "") return;
		var messages = SessionManager.findOne({_id: this.sessionId}).messages;
		if (!messages) {
			messages = [];
		}
		messages.push(message);
		SessionManager.update({_id: this.sessionId}, {$set: {messages: messages}});
		var sessionCursor = SessionManager.find({_id: this.sessionId}, {users: 1});
		sessionCursor.forEach(function(session){
			var sessionUsers = session.users;
			sessionUsers.forEach(function(user){
				if (user != Meteor.userId()) {
					ChatMessage.insert({
						sessionId: message.sessionId,
						userId: user,
						sender: message.sender,
						message: message.message,
						sendDate: message.date,
						readDate: null,
						read: false
					}, function(error, result) {
						if (error) {
							FlashMessages.sendError(error.reason);
						}
						else {
    					LineStream.emit(message.sessionId + ':message', message.sessionId, user);
						}
					});
				}
			});
		});		
		template.find('[name=message]').value = '';
		Session.set('new-message', true);
	}
});

/*****************************************************************************/
/* SessionWindow: Helpers */
/*****************************************************************************/
Template.SessionWindow.helpers({
});

/*****************************************************************************/
/* SessionWindow: Lifecycle Hooks */
/*****************************************************************************/
Template.SessionWindow.created = function () {
	Session.set('new-message', false);
};

Template.SessionWindow.rendered = function () {
	$('#chatbox').prop({scrollTop:$('#chatbox').prop("scrollHeight")});	
	var sessionId = Session.get('sessionId');
	sessionMessageManager = new SessionMessageManager(sessionId, Meteor.userId());
	LineStream.emit('session', sessionId, Meteor.userId());
};

Template.SessionWindow.destroyed = function () {
	Session.set('sessionId', undefined);
	Session.set('new-message', false);	
};
