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
  CHANGE_USER,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,
  TAuthActions,
} from "../actions/auth";
import { TUser } from "../api/api";

type TAuthState = {
  userRequest: boolean;
  userFailed: boolean;
  userData: TUser | null;

  passwordRequest: boolean;
  passwordFailed: boolean;
  passwordData: string | null;

  createUserRequest: boolean;
  createUserFailed: boolean;
  createUserData: TUser | null;

  loginRequest: boolean;
  loginFailed: boolean;
  loginData: TUser | null;

  changeUserRequest: boolean;
  changeUserFailed: boolean;

  checkLoginRequest: boolean;
  checkLoginFailed: boolean;
};

const initialState: TAuthState = {
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

  changeUserRequest: false,
  changeUserFailed: false,

  checkLoginRequest: false,
  checkLoginFailed: false,
};

export const authReducer = (
  state = initialState,
  action: TAuthActions
): TAuthState => {
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
        checkLoginRequest: true,
      };
    }
    case CHECK_LOGIN_SUCCESS: {
      return {
        ...state,
        checkLoginRequest: false,
        checkLoginFailed: false,
        loginData: action.user,
      };
    }
    case CHECK_LOGIN_FAILED: {
      return {
        ...state,
        checkLoginRequest: false,
        checkLoginFailed: true,
      };
    }
    case CHANGE_USER: {
      return {
        ...state,
        checkLoginRequest: true,
      };
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        changeUserRequest: false,
        changeUserFailed: false,
        loginData: action.user,
      };
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeUserRequest: false,
        changeUserFailed: true,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        checkLoginRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        checkLoginRequest: false,
        checkLoginFailed: false,
        loginData: action.user,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        checkLoginRequest: false,
        checkLoginFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
