const initState = {
    logined: false,
    egu_username:'',
    egu_token:''
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'login':
           return {
               ...state,
               logined:true,
               egu_username:action.egu_username,
               egu_token:action.egu_token
           }
        case 'logout':
            return {
                ...state,
               logined:false,
               egu_username:'',
               egu_token:''
            }
        default:
            return state
    }
}

export default reducer;