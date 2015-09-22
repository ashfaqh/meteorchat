/*****************************************************************************/
/* ForgotPassword: Event Handlers */
/*****************************************************************************/
Template.ForgotPassword.events({
	'submit form': function(event, templ) {
		event.preventDefault();
		console.log(event);
		var options = {
			email: event.target.email.value
		};
		Accounts.forgotPassword(options, function(err){
			if (err) {
				FlashMessages.sendError(err.reason);
			} else {
				FlashMessages.sendSuccess('Email has been sent for reset of password');
				Meteor.setTimeout(function() {
    			Router.go('signin');
  			}, 3000);
			}
		});
	}
});

/*****************************************************************************/
/* ForgotPassword: Helpers */
/*****************************************************************************/
Template.ForgotPassword.helpers({
});

/*****************************************************************************/
/* ForgotPassword: Lifecycle Hooks */
/*****************************************************************************/
Template.ForgotPassword.created = function () {
};

Template.ForgotPassword.rendered = function () {
	$('#forgotPasswordForm').validate();
};

Template.ForgotPassword.destroyed = function () {
};
