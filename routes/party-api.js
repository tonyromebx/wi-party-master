var db = require("../models");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      Authentication: req.body.Authentication
    }).then(function(dbUser) {
      res.send(dbUser);
    });
  });

  app.get("/api/parties", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      res.send(dbParty);
    });
  });

  app.post("/api/parties", function(req, res) {
    console.log("inside the api post for creating parties");
    console.log("here to create " + req.body.eventName);
    db.Party.create({
      eventName: req.body.eventName,
      eventAddress: req.body.eventAddress,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      AuthenticationId: req.body.eventHostAuthenticationId,
      eventDescription: req.body.eventDiscription,
      displayName: req.body.displayName
    })
      .then(function(dbParty) {
        console.log("following obj was created in the party table: " + dbParty);
        res.send(dbParty);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  });

  app.delete("/api/parties/:id", function(req, res) {
    db.Party.destroy({ where: { id: req.params.id } })
      .then(party => {
        console.log(party);
        res.send({ msg: "Party record deleted" });
      })
      .catch(err => res.send(err));
  });

  app.post("/attendee/:party/:id/:displayName", function(req, res) {
    console.log(req.params.party);
    console.log(req.params.displayName);
    db.Attendee.create({
      AuthenticationId: req.params.id,
      PartyId: req.params.party,
      displayName: req.params.displayName
    })
      .then(function(dbAttendee) {
        console.log(dbAttendee.dataValues.displayName + " has been added to the attendee table");
        res.send(dbAttendee);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  app.post("/item/:party/:id/:displayName", function(req, res) {
    console.log(req.params.party);
    console.log("name: " + req.params.id + "is trying to add item:" + req.body.itemName);
    db.Item.create({
      attendeeAuthenticationId: req.params.id,
      PartyId: req.params.party,
      displayName: req.params.displayName,
      itemName: req.body.itemName,
      qtyRequested: req.body.itemQty
    })
      .then(function(dbItem) {
        console.log(dbItem.dataValues.itemName + " has been added to the Item table");
        res.send(dbItem);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
