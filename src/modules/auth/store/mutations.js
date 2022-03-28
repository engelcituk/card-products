export function setUser(state, user){ //se ejecuta una vez el usaurio haga login
    state.user = user    
    state.isLogged = true    
}

export function logout(state){
    state.user = null
    state.isLogged = false     
}

export function setDataQueryParams(state, queryParams) {
    state.queryParams = queryParams
}