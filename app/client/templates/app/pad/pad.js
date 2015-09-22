/*****************************************************************************/
/* Pad: Event Handlers */
/*****************************************************************************/
Template.Pad.events({
	//Clear Blackboard
	'click #board-clear': function(event, template) {
		pad.wipe(true);
		pad.setPadFn('draw');
 		$('#board-canvas').addClass('draw-cursor');
 		$('#board-canvas').removeClass('erase-cursor');
	},
	'click #board-color': function(event, template) {
		pad.setPadFn('draw');
		$('#colorPicker').colorpicker('show');
 		$('#board-canvas').addClass('draw-cursor');
 		$('#board-canvas').removeClass('erase-cursor');
	},
	'changeColor.colorpicker': function(event) {
	  	$('#board-color').css('color', event.color.toHex());
	  	color = event.color.toHex();
	},
	'click #board-erase': function(event, template) {
		pad.setPadFn('erase');
 		$('#board-canvas').removeClass('draw-cursor');
 		$('#board-canvas').addClass('erase-cursor');
	}
});

/*****************************************************************************/
/* Pad: Helpers */
/*****************************************************************************/
Template.Pad.helpers({
	'cursor': function() {
		return (padFn == 'draw') ? 'draw-cursor' : 'erase-cursor';
	}
});

/*****************************************************************************/
/* Pad: Lifecycle Hooks */
/*****************************************************************************/
Template.Pad.created = function () {
};

Template.Pad.rendered = function () {
	$('#colorPicker').colorpicker();
	var padId = Router.current().params.padId;
	Deps.autorun(function() {
		if (pad)
			pad.close();
		if (remotepad)
			remotepad.close();
		pad = new Pad(padId);
		remotepad = RemotePad(padId, pad);
    	LineStream.emit('session', padId, Meteor.userId());
	});
};

Template.Pad.destroyed = function () {
};