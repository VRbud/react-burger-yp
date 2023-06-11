// rootReducer.ts
import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLOSE,
} from "../actions/ws";
import { TWSActions } from "../actions/ws";

export type Torder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

type currentOrder = {
  order: Torder;
  ingredients: IIngredient[];
};

export type TWSState = {
  wsConnected: boolean;
  orders: Torder[];
  total: number;
  totalToday: number;
  currentOrder: currentOrder | null;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
};

// Создадим редьюсер для WebSocket
export const wsReducer = (
  state = initialState,
  action: TWSActions
): TWSState => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В orders передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders.reverse(),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CLOSE:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};
