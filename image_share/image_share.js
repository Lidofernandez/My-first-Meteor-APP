Photos = new Mongo.Collection("photos");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  Template.photos.helpers({
    photos:Photos.find({}, {sort:{createdOn: -1, rating: -1}}),
    getUser:function(user_id){
      var user = Meteor.users.findOne({_id:user_id});
      if (user) {
        return user.username;
      } else {
        return "anom";
      }
    }
  });

  Template.body.helpers({
    username:function(){
      if(Meteor.user()){
        return Meteor.user().username;
      } else {
        return "anonymous internet user";
      }
    }
  });

  Template.photos.events({
    'click .js-photos':function(event){
      $(event.target).css("width", "50px");
    },
    'click .js-del-photo': function(event){
      var photo_id = this._id;
      //use jQuery to hide the photo and then a callback function to remove it.
      $("#"+photo_id).hide('slow', function() {
        Photos.remove({"_id": photo_id});
      })
    },
    'click .js-stars-photo': function(event){
      var rating = $(event.currentTarget).data('userrating');
      var photo_id = this.id;
      Photos.update({_id: photo_id}, 
        {$set: {rating: rating}});
    },
    'click .js-show-photo-form': function(event){
      $("#upload_photo").modal("show");
    }
  });

  Template.upload_photo.events({
    'submit .js-add-photo': function(event){
      var src_img, alt_img;
      src_img = event.target.src_img.value;
      alt_img = event.target.alt_img.value;
      console.log("src " + src_img + " alt:" + alt_img );
      if (Meteor.user()) {
        Photos.insert({
          src_img: src_img,
          alt_img: alt_img,
          createdOn: new Date(),
          createdBy:Meteor.user()._id
        });
      }

      $("#upload_photo").modal("hide");      
      return false;

    }
  });
}
