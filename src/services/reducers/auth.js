import {
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILED,
  REQUEST_PASSWORD,
  REQUEST_PASSWORD_SUCCESS,
  REQUEST_PASSWORD_FAILED,
  REQUEST_CREATE_USER,
  REQUEST_CREATE_USER_SUCCESS,
  REQUEST_CREATE_USER_FAILED,
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/auth";

const initialState = {
  userRequest: false,
  userFailed: false,
  userData: null,

  passwordRequest: false,
  passwordFailed: false,
  passwordData: null,

  createUserRequest: false,
  createUserFailed: false,
  createUserData: null,

  loginRequest: false,
  loginFailed: false,
  loginData: null,

  checkLoginRequest: false,
  checkLoginFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case REQUEST_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userFailed: false,
        userData: action.userData,
      };
    }
    case REQUEST_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      };
    }
    case REQUEST_PASSWORD: {
      return {
        ...state,
        passwordRequest: true,
      };
    }
    case REQUEST_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordRequest: false,
        passwordFailed: false,
        passwordData: action.passwordMsg,
      };
    }
    case REQUEST_PASSWORD_FAILED: {
      return {
        ...state,
        passwordRequest: false,
        passwordFailed: true,
      };
    }
    case REQUEST_CREATE_USER: {
      return {
        ...state,
        createUserRequest: true,
      };
    }
    case REQUEST_CREATE_USER_SUCCESS: {
      return {
        ...state,
        createUserRequest: false,
        createUserFailed: false,
        loginData: action.user,
      };
    }
    case REQUEST_CREATE_USER_FAILED: {
      return {
        ...state,
        createUserRequest: false,
        createUserFailed: true,
      };
    }
    case REQUEST_LOGIN: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginData: action.user,
      };
    }
    case REQUEST_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case CHECK_LOGIN: {
      return {
        ...state,
        CheckLoginRequest: true,
      };
    }
    case CHECK_LOGIN_SUCCESS: {
      return {
        ...state,
        CheckLoginRequest: false,
        CheckLoginFailed: false,
        loginData: action.user,
        userData: action.user,
      };
    }
    case CHECK_LOGIN_FAILED: {
      return {
        ...state,
        CheckLoginRequest: false,
        CheckLoginFailed: true,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        CheckLoginRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        CheckLoginRequest: false,
        CheckLoginFailed: false,
        loginData: action.user,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        CheckLoginRequest: false,
        CheckLoginFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
