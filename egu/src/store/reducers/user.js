const initState = {
    logined: false,
    egu_username:localStorage.getItem('egu_username'),
    egu_token:localStorage.getItem('egu_token')
}

function reducer(state = initState, action) {
    switch (action.type) {
        // case 'login':
        //    return {
        //        ...state,
        //        logined:true,
        //        egu_username:localStorage.setItem(action.egu_username),
        //        egu_token:localStorage.setItem(action.egu_token),
        //        egu_userId:localStorage.setItem(action.egu_id)
        //    }
        case 'logout':
            return {
                ...state,
               logined:false,
               egu_username:'',
               egu_token:'',
               egu_userId:''
            }
        default:
            return state
    }
}

export default reducer;