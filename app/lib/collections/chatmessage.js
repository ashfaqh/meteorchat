ChatMessage = new Mongo.Collection('chatmessage');


if (Meteor.isServer) {
  ChatMessage.allow({
    insert: function (userId, doc) {
//      if (!!userId && doc.sender == userId)
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
//      if (!!userId && doc.userId == userId)      
      return true;
    },

    remove: function (userId, doc) {
//      if (!!userId && doc.userId == userID )
      return true;
    }
  });

/*  ChatMessage.deny({
    insert: function (userId, doc) {
      if (!userId || doc.sender != userId)
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      if (!userId || doc.userId != userId)
      return true;
    },

    remove: function (userId, doc) {
      if (!userId || doc.userId != userId)
      return true;
    } 
  }); */
}
