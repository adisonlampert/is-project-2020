var autocomplete;
function initialize() {
 autocomplete = new google.maps.places.Autocomplete(
     /** @type {HTMLInputElement} */(document.getElementById('location')),
     { types: ['geocode'] });
 google.maps.event.addListener(autocomplete, 'place_changed', function() {
 });
}
