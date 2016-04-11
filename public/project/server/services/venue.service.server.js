/**
 * Created by Aditya on 4/10/2016.
 */
module.exports = function (app, venueModel) {

    app.get("/api/project/venue", findAllVenues);
    app.get("/api/project/venue/:foursquareId", findVenueByFoursquareId);
    app.post("/api/project/venue/:foursquareId", addVenue);
    //app.delete("/api/project/venue/:foursquareId", deleteVenue);
    //app.put("/api/project/venue/:id", updateVenue);

    function findAllVenues(req, res) {
        venueModel
            .findAllVenues()
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findVenueByFoursquareId(req, res) {
        var foursquareId = req.params.foursquareId;
        venueModel
            .findVenueByFoursquareId(foursquareId)
            .then(function (venue) {
                res.json(venue);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function addVenue(req, res) {
        var venue = req.body;
        venueModel
            .findVenueByFoursquareId(venue.foursquareId)
            .then(function (response) {
                if (response)
                    return res.json(response);
                else return venueModel.addVenue(venue);
            })
            .then(function (response) {
                return venueModel.findVenueByFoursquareId(venue.foursquareId);
            })
            .then(function (response) {
                res.json(response);
            });
    }
}