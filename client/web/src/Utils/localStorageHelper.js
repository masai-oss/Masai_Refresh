export const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key, default_val) => {
    try{
        let value = localStorage.getItem(key)
        return JSON.parse(value)
    }
    catch{
        return default_val
    }
}