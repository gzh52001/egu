import { CHANGE_COUNT, GET_CART_LIST } from "../actionType/cart";

const initState = {
    storeCartList: [], // 购物车列表
    count:0, // 购物车数量
}


function reducer(preState = initState, action) {
    const newState = {...preState}; // 不能改传入的参数
    switch(action.type) {
        // 改变数量
        case CHANGE_COUNT: 
            newState.count = newState.storeCartList.length;
            return newState;
        // 获取购物车数据
        case GET_CART_LIST:
            console.log("reducer", action.storeCartList);
            newState.storeCartList = [...action.storeCartList];
            newState.count = newState.storeCartList.length;
            return newState;
        default:
            return newState;

    }
}

export default reducer;