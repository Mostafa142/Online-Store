import {
  handleAddToCart,
  handleRemoveCartItem,
  handleReduceCartItem,
} from "../actions/Cart.utilis";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SHOW_CART,
  SHOW_MENU,
  REDUCE_CART_ITEM,
  ADD_TO_CART_,
} from "../actions/Constants";

const initState = {
  setOpen: false,
  show: false,
  items: [],
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return {
        ...state,
        setOpen: !state.setOpen,
      };
    case SHOW_CART:
      return {
        ...state,
        show: !state.show,
      };
    case ADD_TO_CART_:
      return {
        ...state,
        items: handleAddToCart({
          prevCartItems: state.items,
          nextCartItem: action.payload,
        }),
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
          },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: handleRemoveCartItem({
          prevCartItems: state.items,
          cartItemToRemove: action.payload,
        }),
      };
    case REDUCE_CART_ITEM:
      return {
        ...state,
        items: handleReduceCartItem({
          prevCartItems: state.items,
          cartItemToReduce: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default menuReducer;
