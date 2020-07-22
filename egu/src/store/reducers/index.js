import {combineReducers} from 'redux';
import cartReducer from './cart';
import userReducer from './user';

// 把多个reducer合并成一个reducer
const reducer = combineReducers({
    cart:cartReducer,
    user:userReducer
})

export default reducer;