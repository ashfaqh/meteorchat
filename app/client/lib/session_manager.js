this.SessionMessageManager = function SessionMessageManager(sessionId, userId) {

	var sessionUsers = {};

	if (!!userId && !!sessionId) {
		if (!sessionUsers[sessionId]) {
			sessionUsers[sessionId] = { 
				users: [] 
			};
		}
		sessionUsers[sessionId].users.push(userId);
		Meteor.call('/app/chatmessage/update', sessionId, userId);
	}

	LineStream.on(sessionId + ':message', function(sessionId, userId) {
		if (sessionUsers[sessionId].users.indexOf(userId) > -1) {
			Meteor.call('/app/chatmessage/update', sessionId, userId);
		}
		if (Meteor.isClient)
			$('#chatbox').prop({scrollTop:$('#chatbox').prop("scrollHeight")});
	});
}