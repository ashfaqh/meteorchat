Accounts.onCreateUser(function(options, user) {

  user.profile = options.profile;

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});

// (server-side) called whenever a login is attempted
Accounts.validateLoginAttempt(function(attempt){
  if (attempt.methodName == 'createUser') return false;
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    Accounts.sendVerificationEmail(attempt.user._id);
    throw new Meteor.Error(403, 'Verify Email first!');
    return false; // the login is aborted
  }
  return true;
});
