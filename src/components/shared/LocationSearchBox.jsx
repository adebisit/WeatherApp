import { useRef, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { MdOutlineLocationOn } from "react-icons/md"
import { reverseGeoding } from "../../context/GeolocationActions"


const extractLocationInfo = (place) => {
    const components = place.address_components
    let state = null
    let countryCode = ""
    
    const lat = place.geometry.location.lat
    const lon = place.geometry.location.lng
    const formattedAddress = place.formatted_address
    
    for (var component of components) {
        const {long_name, short_name, types} = {...component}
        if (types !== undefined && types[0] === 'country') {
            countryCode = short_name
        }
        if (types !== undefined && types[0] === "administrative_area_level_1") {
            state = long_name
        }
    }    
    
    return {
        lat: lat instanceof Function ? lat() : lat,
        lon: lon instanceof Function ? lat() : lon,
        formattedAddress,
        state,
        countryCode
    }
}


function LocationSearchBox({ exact, locationSelected, initialInput }) {
    const [location, setLocation] = useState(initialInput)
    const [keyword, setKeyword] = useState(initialInput?.formattedAddress ?? "")
    const autoCompleteRef = useRef(null)
    const inputRef = useRef()
    const options = {
        fields: ["name", "geometry", "address_components", "formatted_address"],
        // types: ["(cities)"]
    }
    exact === null && (options.types = ["(cities)"])

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            const locationData = extractLocationInfo(place)
            locationSelected(locationData)
            setLocation(locationData)
           });
    }, [])

    const placeSelected = () => {
        
    }
    const getCurrentGeolocation = async (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const data = await reverseGeoding({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                })
                if (data === null) {
                    alert('Error Locating your position')
                } else {
                    const results = data.results[0]
                    const locationData = extractLocationInfo(results)
                    // setKeyword(locationData.formattedAddress)
                    setLocation(locationData)
                    locationSelected(location)
                }
            },
            () => { alert("Couldn't determine location")}
        )
    }

    const onEditSearchBox = (e) => {
        setLocation(null)
        setKeyword(e.target.value)
    }

    return (
        <div className="flex w-full justify-between">
            <div className="w-full relative">
                <div className="absolute inset-y-0 w-12 flex items-center justify-center">
                    <FaSearch className="text-lg"/>
                </div>
                <input
                    id="keyword"
                    ref={inputRef}
                    value={keyword}
                    // value={keyword}
                    type="text"
                    className="w-full rounded-lg pl-12 py-3"
                    style={{backgroundColor: "#171642"}}
                    onChange={onEditSearchBox}
                />  
            </div>
            <button
                    className="px-4 ml-3 rounded-lg"
                    style={{backgroundColor: "#171642"}}
                    onClick={getCurrentGeolocation}
            >
                    <MdOutlineLocationOn color="white"/>
            </button>
        </div>
    )
}


export default LocationSearchBox