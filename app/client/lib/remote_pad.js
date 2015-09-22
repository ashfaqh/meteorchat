if (!Meteor.isClient) return;

this.RemotePad = function RemotePad(padId, pad) {
	var users = {};
	var padFn = 'draw';

	LineStream.on(padId + ':dragstart', function(user, position, color){
		users[user] = {
			color: color,
			from: position
		};
	});

	LineStream.on(padId + ':dragend', function(user){
		var userProp = users[user];
		if (userProp)
			users[user] = undefined;
	});

	LineStream.on(padId + ':drag', function(user, to){
		var userProp = users[user];
		if (userProp) {
			pad.drawLine(userProp.from, to, userProp.color, padFn);
			users[user].from = to;
		}
	});

	LineStream.on(padId + ':wipe', function(user){
		pad.wipe();
	});

	LineStream.on(padId + ':func', function(user, func){
		padFn = func;
	});

	this.close = function() {
		LineStream.removeAllListeners(padId + ':dragstart');
		LineStream.removeAllListeners(padId + ':dragend');
		LineStream.removeAllListeners(padId + ':drag');
		LineStream.removeAllListeners(padId + ':wipe');
		LineStream.removeAllListeners(padId + ':func');
	};

}