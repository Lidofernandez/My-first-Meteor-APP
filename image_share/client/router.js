Router.configure({
  layoutTemplate:"ApplicationLayout"
});

Router.route("/", function () {
  this.render("welcome", {
    to: "main"
  });
});

Router.route("/photos", function () {
  this.render("navbar", {
    to:"navbar"
  });
  this.render("photos", {
    to: "main"
  })
});

Router.route("/photo/:_id", function () {
  this.render("navbar", {
    to:"navbar"
  });
  this.render("photo", {
    to: "main",
    data: function() {
      return Photos.findOne({_id:this.params._id});
    }
  })
});