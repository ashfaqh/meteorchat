/*****************************************************************************/
/* EditProfile: Event Handlers */
/*****************************************************************************/
Template.EditProfile.events({
  'submit form[id=editprofile]': function(event, tmpl) {
    event.preventDefault();
    var name = tmpl.find('[name=name]').value;
    console.log(name);
    Meteor.users.update(Meteor.userId(), {$set: {'profile.name': name}});
    Router.go('/');
  },
  'change input[name=profileimage]': function(event, tmpl) {
    event.preventDefault();
    var profileimagefile = event.target.files[0];
    var user = Meteor.user();
    if (user)
      uploadProfileImage(user._id, profileimagefile);
  }
});

/*****************************************************************************/
/* EditProfile: Helpers */
/*****************************************************************************/
Template.EditProfile.helpers({
  profileImage: function() {
    var user = Meteor.user();
    if (user) {
      var profileImageId = user.profile.image;
      console.log(profileImageId);
    }
    return Images.find({_id: profileImageId});
  }
/*  profileEmail: function() {
  	return Meteor.user().emails[0].address;
  },
  profileName: function() {
  	return Meteor.user().profile.name;
  } */
});

/*****************************************************************************/
/* EditProfile: Lifecycle Hooks */
/*****************************************************************************/
Template.EditProfile.created = function () {
};

Template.EditProfile.rendered = function () {
  Session.set('profile-view', false);
//  $('.profile-popup').hide();
};

Template.EditProfile.destroyed = function () {
};
