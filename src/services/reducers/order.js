import {
  SET_ORDER_DATA,
  SET_ORDER_DATA_SUCCESS,
  SET_ORDER_DATA_FAILED,
  DELETE_ORDER_DATA,
} from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderData: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DATA: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case SET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderData: action.orderData,
      };
    }
    case SET_ORDER_DATA_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        orderData: null,
      };
    }

    default: {
      return state;
    }
  }
};
