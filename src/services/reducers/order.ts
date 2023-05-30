import {
  SET_ORDER_DATA,
  SET_ORDER_DATA_SUCCESS,
  SET_ORDER_DATA_FAILED,
  DELETE_ORDER_DATA,
  TOrderActions,
} from "../actions/order";

type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderData: any;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderData: null,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
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
