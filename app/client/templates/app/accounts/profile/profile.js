/*****************************************************************************/
/* Profile: Event Handlers */
/*****************************************************************************/
Template.Profile.events({
  'click button[name=logout]': function(event, tmpl) {
    if (Meteor.userId()) {
      Meteor.logout(function(err){
        if (err) { FlashMessages.sendError(err.reason); }
        else {
          Router.go('/');
        }
      });
    }
  },
  'click a[name=profileImage]': function(event, tmpl){
    event.preventDefault();
    $('.profile-popup').slideToggle(100);
    Session.set('profile-view', true);
  }
});

/*****************************************************************************/
/* Profile: Helpers */
/*****************************************************************************/
Template.Profile.helpers({
  profileImage: function() {
    var profileImageId = Session.get("profileImageId");
    if (!profileImageId) {
      var user = Meteor.user();
      var profileImageId = user.profile.image;
    }
    return Images.find({_id: profileImageId});    
  },
  profileview: function() {
    return Session.get('profile-view');
  }
});

/*****************************************************************************/
/* Profile: Lifecycle Hooks */
/*****************************************************************************/
Template.Profile.created = function () {
};

Template.Profile.rendered = function () { 
  $('.profile-popup').hide();
};

Template.Profile.destroyed = function () {
};
