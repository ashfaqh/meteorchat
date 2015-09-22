/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */
  '/app/user/createUser': function(user, profileImagefile) {
    if (!profileImagefile) {
      user.profile.image = process.env.NO_IMAGE_ID;
    } 
    else {
      user.profile.image = profileImagefile;
    }
    var userId = Accounts.createUser(user);
  },

  '/app/chatmessage/update': function(sessionId, userId) {
    ChatMessage.update(
      {
        sessionId: sessionId, 
        userId: userId, 
        read: false, 
        readDate: null
      }, 
      {
        $set: { read: true },
        $currentDate: { readDate: true }
      }, 
      { multi: true }
    );
  }
});