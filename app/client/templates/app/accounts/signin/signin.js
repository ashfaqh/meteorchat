/*****************************************************************************/
/* Signin: Event Handlers */
/*****************************************************************************/
Template.Signin.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();
		var user = tmpl.find('[name=email]').value;
		var password = tmpl.find('[name=password]').value;
		Meteor.loginWithPassword(user, password, function(err){
		  if (err) FlashMessages.sendError(err.reason);
		});
	}
});

/*****************************************************************************/
/* Signin: Helpers */
/*****************************************************************************/
Template.Signin.helpers({
});

/*****************************************************************************/
/* Signin: Lifecycle Hooks */
/*****************************************************************************/
Template.Signin.created = function () {
};

Template.Signin.rendered = function () {
	$('#signin-form').validate();
};

Template.Signin.destroyed = function () {
};
