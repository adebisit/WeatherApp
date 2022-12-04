import AQIBreakpoints from "../data/AQIBreakpoints";


const getPollutantIndex = ({iHi, iLo, BPHi, BPLo, Cp}) => {
    const ip = ((iHi - iLo) / (BPHi - BPLo) * (Cp - BPLo)) + iLo
    return ip
}


const truncateCP = ({p, cp}) => {
    switch (p) {
        case 'co': return (Math.round(cp * 10) / 10) / 1000;
        case 'o3': return (Math.round(cp * 1000) / 1000) / 1000;
        case 'pm2_5': return Math.round(cp * 10) / 10;
        // case 'pm10': return Math.round(cp);
        default: return Math.round(cp);
    }
}

export const getAirQualityIndex = (components) => {
    if (components === null) {
        return null
    }
    const pollutionIndecies = []
    try {
        Object.keys(components).forEach((key) => {
            components[key] = truncateCP({p: key, cp: components[key]})
        })
        for (var p in components) {
            const cp = components[p]
            const breakpoints = AQIBreakpoints[p]
            if (breakpoints === null || breakpoints === undefined) { continue }

            for (var breakpoint of breakpoints) {
                if (cp > breakpoint.BPLo && cp < breakpoint.BPHi) {
                    pollutionIndecies.push(getPollutantIndex({...breakpoint, Cp: cp}))
                    break
                }
            }
        }
        return Math.round(Math.max(...pollutionIndecies))
    } catch (err) {
        console.log("Error Calculating Air Quality Index")
        return null
    }
}
