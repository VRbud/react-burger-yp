import { requestToServ } from "../api/api";

export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const SET_ORDER_DATA_SUCCESS = 'SET_ORDER_DATA_SUCCESS';
export const SET_ORDER_DATA_FAILED = 'SET_ORDER_DATA_FAILED';
export const DELETE_ORDER_DATA = 'DELETE_ORDER_DATA';


export const sendOrderData = (data) => {
    return function (dispatch) {
      dispatch({
        type: SET_ORDER_DATA
      })
      try {
        requestToServ('orders', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        }).then(res => {
          if (res) {
            dispatch({
              type: SET_ORDER_DATA_SUCCESS,
              orderData: res,
            });
          } else {
            dispatch({
              type: SET_ORDER_DATA_FAILED
            });
          }
    
        });
      } catch (err){
        throw new Error(`Ошибка в получении сведений о заказе ${err.message}`)
      }
  
    }
  }