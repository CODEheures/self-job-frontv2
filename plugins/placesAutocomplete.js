/*
** This Object transform input text to autocomplete google place
*  input dispatch event 'place' with object place in detail when user choice a place
 */
import LoaderJs from '~/plugins/loaderJs.js'

class PlacesAutocomplete {
  constructor (elem) {
    if (process.client) {
      LoaderJs('https://maps.googleapis.com/maps/api/js?libraries=places' + (process.env.googleMapApiKey.length > 0 ? '&key=' + process.env.googleMapApiKey : ''), function () {
        let _input = elem
        let _options = {
          types: ['(regions)']
        }
        let autocomplete = new window.google.maps.places.Autocomplete(_input, _options)
        elem.placeholder = ''
        autocomplete.addListener('place_changed', function () {
          let place = autocomplete.getPlace()
          if (place.geometry !== undefined) {
            let placeChangedEvent = new CustomEvent('place', { 'detail': place })
            elem.value = place.formatted_address
            elem.dispatchEvent(placeChangedEvent)
          }
        })
      })
    }
  }
}

export { PlacesAutocomplete }
