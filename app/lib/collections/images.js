Images = new FS.Collection("images", {
 stores: [
  new FS.Store.GridFS("thumbs", {
    transformWrite: function(fileObj, readStream, writeStream) {
      // Transform the image into a 10x10px thumbnail
      gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
    }
  }),
  new FS.Store.GridFS("images")  
 ],
 filter: {
  allow: {
    contentTypes: ['image/*']
  }
 }
});



Images.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return !!userId;
  },

  remove: function (userId, doc) {
    return !!userId;
  },

  download: function() {
    return true;
  }
});

/*Images.deny({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
}); */