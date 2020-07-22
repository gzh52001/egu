import { GET_CART_LIST } from "../actionType/cart";

export default {
    getCartList(cartList) {
        // console.log(7777, cartList);
        let action = {
            type: GET_CART_LIST,
            cartList
        }
        return action;
    }
}