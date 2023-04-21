import {SET_MODAL_ING, DEL_MODAL_ING} from '../actions/modal'

const initialState = {
    currentIngredient: null,
    orderData: null,
  }


export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case SET_MODAL_ING: {
        return {
          ...state,
          currentIngredient: action.payload
        }
      }
      case DEL_MODAL_ING: {
        return {
          ...state,
          currentIngredient: null,
        }
      }  
      default: {
        return state
      }
    }
  }