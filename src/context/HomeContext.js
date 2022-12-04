import { createContext, useState, useEffect } from "react";



const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
    const [geolocation, setGeolocation] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGeolocation({lat: pos.coords.latitude, lon: pos.coords.longitude})
            },
            () => {
                alert("Couldn't determine location")
            }

        )
    }, [])

    return <HomeContext.Provider value={{
        geolocation
    }}>
        {children}
    </HomeContext.Provider>
}

export default HomeContext