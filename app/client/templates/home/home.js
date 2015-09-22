/*****************************************************************************/
/* Variable Declarations */
/*****************************************************************************/
enableAutoLoginCallback = function(){}

doneCallback = function(enableAutoLogin) {
	console.log("doneCallback triggered" + enableAutoLogin);
	enableAutoLogin();
}

/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
	var emailVerificationToken = Session.get('EmailVerificationToken');
	var passwordResetToken = Session.get('PasswordResetToken');
	if (enableAutoLoginCallback && emailVerificationToken) {
    Accounts.verifyEmail(emailVerificationToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          FlashMessages.sendError(err.reason);
          Accounts.sendVerificationEmail(Meteor.user());
        }
      } else {
        doneCallback(enableAutoLoginCallback);
				FlashMessages.sendSuccess('Thank you! Your email address has been confirmed. You are logged in now.');
      }
    });
  	Session.set('EmailVerificationToken', '');
  	emailVerified = undefined;    
	}
	if (enableAutoLoginCallback && passwordResetToken) {
		Router.go('resetPassword');
	}
  if (!Meteor.user()) {
    Router.go('signup');
  }
};

Template.Home.destroyed = function () {
};
