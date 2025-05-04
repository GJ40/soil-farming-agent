//function to set token
export function setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
}

//function to getToken
export function getToken() {
    return JSON.parse(localStorage.getItem("token"));
}

//function to setuser
export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

//function to getuser
export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// // function to setAdmin
// export function setAdmin(isAdmin) {
//     localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
// }

// // function to getAdmin
// export function getAdmin() {
//     return JSON.parse(localStorage.getItem("isAdmin"));
// }