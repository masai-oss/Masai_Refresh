const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getFromStorage = (key, default_val) => {
    try{
        let value = localStorage.getItem(key)
        return JSON.parse(value)
    }
    catch{
        return default_val
    }
}

const removeFromStorage = (key) => {
    localStorage.removeItem(key)
}

export {saveToStorage, getFromStorage, removeFromStorage };