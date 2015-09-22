function createUser(user) {
  Accounts.createUser(user, function(err){
    if (err) FlashMessages.sendError(err.reason);
  });
}

uploadProfileImage = function(userId, profileimagefile) {
  console.log(profileimagefile);
  if (profileimagefile) {
    Images.insert(profileimagefile, function(err, fileObj){
      if (err) {
        FlashMessages.sendError(err.reason);
      } else {
        Session.set("profileImageId", fileObj._id);
        var imageURL = {
          "profile.image": fileObj._id
        };
        Meteor.users.update(userId, {$set: imageURL});
        console.log(Meteor.user());        
      }
    });
  } else {
    if (Meteor.isServer) {
      var imageURL = {
        "profile.image": process.env.NO_IMAGE_ID
      };     
      Meteor.users.update(userId, {$set: imageURL});
    }
  }
}

uploadnoImage = function() {

  if (process.env.NO_IMAGE_ID) return;

  var noImage = Images.findOne({"original.name": "no-image.png"});
  if (noImage) {
    process.env.NO_IMAGE_ID = noImage._id;
    return;
  }

  var fs = Meteor.npmRequire('fs');
  var imagefile = new FS.File();
  var imagefilepath = process.env.PWD + "/cfs/files/images/noimage.png"

  fs.readFile(imagefilepath, Meteor.bindEnvironment(function(error, buffer) {
    imagefile.attachData(buffer, {type: 'image/png'}, function(error){
      if (error) throw error;
      imagefile.name("no-image.png");

      Images.insert(imagefile, function(err, fileObj){
        if (err) {
          throw err;
        } else {
          process.env.NO_IMAGE_ID = fileObj._id;
          console.log(process.env.NO_IMAGE_ID);
        }
      });
    });
  }));  
}
