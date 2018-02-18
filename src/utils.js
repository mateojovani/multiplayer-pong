const hasToken = () => {
    let user = JSON.parse(localStorage.getItem('loggedUser'))
    return user !== null ? 
        user.token !== "" ? 
            true : 
            false : 
        false 
} 

const setToken = (token, username) => {
    localStorage.setItem('loggedUser', JSON.stringify({
        'auth_token': token,
        'username': username
    }))
} 

const flushToken = () => localStorage.setItem('loggedUser', null)

export const LocalStorage = {
    hasToken: hasToken,
    setToken: setToken,
    flushToken: flushToken
}