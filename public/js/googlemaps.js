function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(34, -84),
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //upon clicking the map marker, this function populates the google popup with the party href link
  const getMarkerLink = party => {
    if (localStorage.getItem("uid")) {
      return `<a href=/parties/${party.id}><strong>${party.eventName}</strong></a>`;
    } else {
      return "<a href=#><b>Please Login to view Party details</b></a>";
    }
  };

  const infoWindow = new google.maps.InfoWindow();

  fetch("/api/parties")
    .then(res => res.json())
    .then(parties => {
      let arrOfPromise = parties.map(party => {
        return fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
              party.eventAddress
          }&key=AIzaSyAw1zriz4pPpa2YVpyr9tAhomDohpi2FBg`
        )
          .then(res => res.json())
          .then(addressData => {
            const { lat, lng } = addressData.results[0].geometry.location;
            const latLng = new google.maps.LatLng(lat, lng);

            // Creating a marker and putting it on the map
            const marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: party.eventName,
              eventAddress: party.eventAddress
            });

            //event listening for the flag link (party) to be clicked so we can redirect
            google.maps.event.addListener(marker, "click", function(e) {
              infoWindow.setContent(
                `<div class=text-center> ${getMarkerLink(party)} <br/> ${
                    party.eventDescription
                } </div>`
              );
              infoWindow.open(map, marker);
            });
            return marker;
          })
          .catch(err => err);
      });

      Promise.all(arrOfPromise)
        .then(markers => {
          const markersCopy = markers;
          document.querySelector("#pac-input").addEventListener("input", e => {
            const address = e.target.value;
            markers.forEach(m => m.setVisible(false));
            if (address) {
              markers = markersCopy.filter(
                m => m.eventAddress.toLowerCase().indexOf(address.toLowerCase()) >= 0
              );
              markers.forEach(m => m.setVisible(true));
            } else {
              markers.forEach(m => m.setVisible(false));
              markers = markersCopy;
              markers.forEach(m => m.setVisible(true));
            }
          });
        })
        .catch(err => console.log("err loading markers", err));
    })
    .catch(err => console.log("error loading Map Data", err));
}
