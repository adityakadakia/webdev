/**
 * Created by Aditya on 4/10/2016.
 */
var q = require("q");

module.exports = function (db, mongoose) {

    var venueSchema = require("./venue.schema.server.js")(mongoose);
    var venueModel = mongoose.model('Venue-Project', venueSchema);


    var api = {
        findVenueByFoursquareId: findVenueByFoursquareId,
        findAllVenues: findAllVenues,
        addVenue: addVenue,
        deleteVenue: deleteVenue,
        updateVenue: updateVenue
    };

    return api;

    function findVenueByFoursquareId(foursquareId) {
        console.log("venueModel findVenueByFoursquareId");
        return venueModel.findOne({foursquareId: foursquareId});
    }

    function findAllVenues() {
        return venueModel.find();
    }

    function addVenue(venue) {
        console.log("venueModel addVenue: " + JSON.stringify(venue));
        return venueModel.create(venue);
    }

    function deleteVenue(foursquareId) {
        console.log("venueModel deleteVenue");
        return venueModel.remove({foursquareId: foursquareId});
    }

    function updateVenue(venueId, venue) {
        console.log("venueModel updateVenue");
        delete venue._id;
        return venueModel.update({_id: venueId}, {$set: venue});
    }
}