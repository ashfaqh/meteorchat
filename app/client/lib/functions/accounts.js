Accounts.onEmailVerificationLink(function(token, enableAutoLogin){
  if (token) {
    Session.set('EmailVerificationToken', token);
    enableAutoLoginCallback = enableAutoLogin;
  }  
});

Accounts.onResetPasswordLink(function(token, enableAutoLogin){
	if (token) {
		Session.set('PasswordResetToken', token);
		enableAutoLoginCallback = enableAutoLogin;
	}
});