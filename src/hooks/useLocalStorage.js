import { useState, useEffect, useCallback } from "react"


const getSavedItem = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    if (initialValue instanceof Function) { return initialValue() }
    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => (getSavedItem(key, initialValue)))

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

export default useLocalStorage