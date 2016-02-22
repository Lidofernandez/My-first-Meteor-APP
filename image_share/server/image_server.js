Meteor.startup(function(){
	if(Photos.find().count() === 0) {
		for (var i = 0; i< 23; i++) {
			Photos.insert(
			{
				src_img: "rambo"+ i + ".jpg",
				alt_img: "Rambo at home number: " + i
			}
			);
		} // end of the for loop
		// count the photos
		console.log("startup.js says: " + Photos.find().count());
	} // No more images
});
