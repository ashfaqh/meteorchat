/*****************************************************************************/
/* Signup: Event Handlers */
/*****************************************************************************/
Template.Signup.events({

  'change input[name=profileimage]': function(event, tmpl) {

  },
	'submit form': function(event, tmpl) {
		event.preventDefault();
		var email = tmpl.find('[name=email]').value;
		var password = tmpl.find('[name=password]').value;
    var confpassword = tmpl.find('[name=confpassword]').value;
    var name = tmpl.find('[name=name]').value;

    var profileimagefile = event.target.profileimage.files[0];

    if (password != confpassword) {
      FlashMessages("Passwords do not match");
      return;
    }

    var user = { 
      email: email,
      password: password,
      profile: {
          name: name,
          image: profileimagefile
      },
    };

    if (!!profileimagefile) {
      Images.insert(profileimagefile, function(err, fileObj){
        if (err) {
          FlashMessages.sendError("Image insert failed - " + err.reason);
        } else {
          Meteor.call('/app/user/createUser', user, fileObj._id, function(err) {
            if (err) {
              FlashMessages.sendError(err.reason);
            }
          });
        }
      });
    } else {
      Meteor.call('/app/user/createUser', user, null, function(err) {
        if (err) {
          FlashMessages.sendError(err.reason);
        }
      });      
    }

    Router.go('verifyEmail');

  }
});

/*****************************************************************************/
/* Signup: Helpers */
/*****************************************************************************/
Template.Signup.helpers({
});

/*****************************************************************************/
/* Signup: Lifecycle Hooks */
/*****************************************************************************/
Template.Signup.created = function () {
};

Template.Signup.rendered = function () {
  $("#signupform").validate();
};

Template.Signup.destroyed = function () {
};
