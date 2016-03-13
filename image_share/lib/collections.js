Photos = new Mongo.Collection("photos");

Photos.allow({
  insert:function (userId, doc) {
    if (Meteor.user()) {
      if (userId != doc.createdBy) {
        return false;
      }
      else {
        return true;
      }
    }
    return false;
  },
  remove: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  }
})