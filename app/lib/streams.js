LineStream = new Meteor.Stream('lines');

if (Meteor.isServer) {

	var subscriptionMap = {};

	LineStream.on('session', function(id, user){
		var subscriptionId = this.subscriptionId;
		var sessionCursor = SessionManager.find({_id: id}, {users: 1});
		sessionCursor.forEach(function(session){
			if (session.users.indexOf(user) > -1) {
	 			subscriptionMap[subscriptionId] = id;
			}
		});

		this.onDisconnect = function() {
			if (subscriptionMap[subscriptionId])
				subscriptionMap[subscriptionId] = undefined;
		};
	});

/*	LineStream.on('pad', function(id, user){

		var subscriptionId = this.subscriptionId;
		var sessionCursor = SessionManager.find({_id: id}, {users: 1});
		sessionCursor.forEach(function(session){
			if (session.users.indexOf(user) > -1) {
	 			subscriptionMap[subscriptionId] = id;
			}
		});

		this.onDisconnect = function() {
			if (subscriptionMap[subscriptionId])
				subscriptionMap[subscriptionId] = undefined;
		};
	}); */

	LineStream.permissions.read(function(event){
		//getting padId from the event
 		var matched = event.match(/(.*):/);

		if(matched) {
			var sessionId = matched[1];
			//only allow events with sessionId where subscription is interestedIn
			return subscriptionMap[this.subscriptionId] == sessionId;
		} else {
			//only allows events with sessionId to read from the stream
			return false;
		}
	}, false);

	LineStream.permissions.write(function(event){
		return true;
	});
}