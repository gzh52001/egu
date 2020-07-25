import { GET_CART_LIST } from "../actionType/cart";

export default {
    getCartList(storeCartList) {
        // console.log(7777, storeCartList);
        let action = {
            type: GET_CART_LIST,
            storeCartList
        }
        return action;
    }
}