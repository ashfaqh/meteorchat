setSessionUsers = function(listeners, initiator) {
	var sessionCursor = SessionManager.findOne({
		users: {$all: listeners}
	});
	if (sessionCursor) {
		var sessionId = sessionCursor._id;
		Router.go('/session/' + sessionId, {sessionId: sessionId});		
	} else {
		SessionManager.insert({
			initiator: initiator,
			users: listeners,
			sessiondate: new Date()
		}, function(error, result) {
			if (error)
				FlashMessages.sendError(error.reason);
			else {
				var sessionId = result;
				Router.go('/session/' + sessionId, {sessionId: sessionId});
			}
		});
	}
}