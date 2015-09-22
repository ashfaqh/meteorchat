/*****************************************************************************/
/* ResetPassword: Event Handlers */
/*****************************************************************************/
Template.ResetPassword.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();
		var newPassword = event.target.password.value;
		var confPassword = event.target.confpassword.value;
		if ((newPassword) && (newPassword === confPassword)) {
			var passwordResetToken = Session.get('PasswordResetToken');
			Accounts.resetPassword(passwordResetToken, newPassword, function(err){
				if (err) {
					FlashMessages.sendError(err.reason);
				} else {
					doneCallback(enableAutoLoginCallback);
					FlashMessages.sendSuccess('Your password has been reset successfully.');
					Router.go('home');
				}
			});
		} else {
			FlashMessages.sendError('Invalid Password');
			return;
		}
	}
});

/*****************************************************************************/
/* ResetPassword: Helpers */
/*****************************************************************************/
Template.ResetPassword.helpers({
});

/*****************************************************************************/
/* ResetPassword: Lifecycle Hooks */
/*****************************************************************************/
Template.ResetPassword.created = function () {
};

Template.ResetPassword.rendered = function () {
	$( "#resetPasswordForm" ).validate({
	  rules: {
	    password: "required",
	    confpassword: {
	      equalTo: "#password"
	    }
	  }
	});	
};

Template.ResetPassword.destroyed = function () {
};
