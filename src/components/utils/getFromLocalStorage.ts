

export const getFromLocalStorage = () => {
    const username = localStorage.getItem('username');
    const auth = localStorage.getItem('auth')
    let isAuth = false
    if(auth === 'true') {
        isAuth = true
    }
    console.log(username)
    console.log(isAuth)

    return {
        username,
        isAuth
    }
}