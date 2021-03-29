export const getParam = (key, defaultVal, search) => {
    let url = new URLSearchParams(search)
    let param = url.get(key)
    return param || defaultVal
}

export const setParam = (key , val, search) => {
    let url = new URLSearchParams(search)
    url.set(key, val)
    return url.toString()
}