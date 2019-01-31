var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      var hbsObject = {
        party: dbParty,
        title: "Wi_Party | Home"
      };
      res.render("intro", hbsObject);
    });
  });

  app.get("/partytime", function(req, res) {
    res.render("index", { title: "Wi_Party | PartyTime" });
  });

  app.get("/parties/:id", (req, res) => {
    db.Party.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Attendee,
          include: [
            {
              model: db.Item
            }
          ]
        }
      ]
    })
      .then(party => {
        console.log("Name of the Party is: " + party.dataValues.eventName);
        var test = party.dataValues.Attendees;
        for (var i in test) {
          console.log(
            "Attendee #" +
              i +
              ": " +
              test[i].dataValues.displayName +
              " is bringing " +
              test[i].dataValues.Items[i].qtyRequested +
              " " +
              test[i].dataValues.Items[i].itemName +
              "'s"
          );
        }
        // console.log(party.dataValues.Attendees);
        // console.log(party.dataValues.Attendees);
        // console.log(JSON.stringify(party));
        // const resObj = party.map(party => {
        //   return Object.assign(
        //     {},
        //     {
        //       id: party.id,
        //       eventName: party.eventName,
        //       items: party.Items.map(Item => {
        //         return Object.assign(
        //           {},
        //           {
        //             itemName: Item.itemName,
        //             qtyRequested: Item.qtyRequested,
        //             qtyCommited: Item.qtyCommited,
        //             hostAdded: Item.hostAdded,
        //             ItemAuthenticationId: Item.AuthenticationId,
        //             addedBy: Item.displayName
        //           }
        //         );
        //       })
        //     }
        //   );
        // });
        // console.log(resObj[0]);
        res.render("party", { party, title: `wi-Party - ${party.eventName}`, partial: "sample" });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
