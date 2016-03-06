Session.set("photosLimit", 8);

lastScrollTop = 0;
$(window).scroll(function(event){
    // test if the scroll is near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() -100) {
      // where are we in the page?
      var scrollTop = $(this).scrollTop();
      //test if I'm going down
      if(scrollTop > lastScrollTop){
        // going down
        Session.set("photosLimit", Session.get("photosLimit") + 4);
      }
      lastScrollTop = scrollTop;
    }
  });

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

Template.photos.helpers({
  photos:function(){
      if(Session.get("userFilter")) { // seeting up the filter
        return Photos.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating: -1}});
      } else {
        return Photos.find({}, {sort:{createdOn: -1, rating: -1}, limit:Session.get("photosLimit")});
      }
    },
    filtering_images:function(){
      if(Session.get("userFilter")){
        return true;
      } else {
        return false;
      }
    },
    getFilterUser: function() {
      if(Session.get("userFilter")){
        var user = Meteor.users.findOne(
          {_id:Session.get("userFilter")});
        return user.username;
      } else {
        return false;
      }
    },
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
      var photo_id = this.ratings_id;
      Photos.update({_id: photo_id},
        {$set: {rating: rating}});
    },
    'click .js-show-photo-form': function(event){
      $("#upload_photo").modal("show");
    },
    'click .js-set-image-filter': function(event){
      Session.set("userFilter", this.createdBy);
    },
    'click .js-unset-image-filter': function(event){
      Session.set("userFilter", undefined);
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