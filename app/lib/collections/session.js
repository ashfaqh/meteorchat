SessionManager = new Mongo.Collection('sessionmanager');


if (Meteor.isServer) {
  SessionManager.allow({
    insert: function (userId, doc) {
      if (!!userId)
        return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      if (!!userId)
        return true;
    },

    remove: function (userId, doc) {
      if (!!userId)
        return false;
    }
  });

  SessionManager.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
