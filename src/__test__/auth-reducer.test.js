import { authReducer } from "../services/reducers/auth";

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

  changeUserRequest: false,
  changeUserFailed: false,

  checkLoginRequest: false,
  checkLoginFailed: false,
};

test("should return initialState", () => {
  expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should start user request", () => {
  expect(authReducer(undefined, { type: "REQUEST_USER" })).toEqual({
    ...initialState,
    userRequest: true,
  });
});

test("should add ingredients", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_USER_SUCCESS",
      userData: {},
    })
  ).toEqual({
    ...initialState,
    userRequest: false,
    userFailed: false,
    userData: {},
  });
});

test("should set error on user request", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_USER_FAILED",
    })
  ).toEqual({
    ...initialState,
    userRequest: false,
    userFailed: true,
  });
});

test("should request passwordCheck", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_PASSWORD",
    })
  ).toEqual({
    ...initialState,
    passwordRequest: true,
  });
});

test("should set passwordCheck success", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_PASSWORD_SUCCESS",
      passwordMsg: "",
    })
  ).toEqual({
    ...initialState,
    passwordRequest: false,
    passwordFailed: false,
    passwordData: "",
  });
});

test("should set passwordCheck error", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_PASSWORD_FAILED",
    })
  ).toEqual({
    ...initialState,
    passwordRequest: false,
    passwordFailed: true,
  });
});

test("should send create user", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_CREATE_USER",
    })
  ).toEqual({
    ...initialState,
    createUserRequest: true,
  });
});

test("should create user", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_CREATE_USER_SUCCESS",
      user: {},
    })
  ).toEqual({
    ...initialState,
    createUserRequest: false,
    createUserFailed: false,
    loginData: {},
  });
});

test("should set error if user not created", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_CREATE_USER_FAILED",
    })
  ).toEqual({
    ...initialState,
    createUserRequest: false,
    createUserFailed: true,
  });
});

test("should send checklogin request", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_LOGIN",
    })
  ).toEqual({
    ...initialState,
    loginRequest: true,
  });
});

test("should login user", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_LOGIN_SUCCESS",
      user: {},
    })
  ).toEqual({
    ...initialState,
    loginRequest: false,
    loginFailed: false,
    loginData: {},
  });
});

test("should show error if logining in failed", () => {
  expect(
    authReducer(undefined, {
      type: "REQUEST_LOGIN_FAILED",
    })
  ).toEqual({
    ...initialState,
    loginRequest: false,
    loginFailed: true,
  });
});

test("should send request to update coockie", () => {
  expect(
    authReducer(undefined, {
      type: "CHECK_LOGIN",
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: true,
  });
});

test("should update user on success", () => {
  expect(
    authReducer(undefined, {
      type: "CHECK_LOGIN_SUCCESS",
      user: {},
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: false,
    checkLoginFailed: false,
    loginData: {},
  });
});

test("should set error user on failed", () => {
  expect(
    authReducer(undefined, {
      type: "CHECK_LOGIN_FAILED",
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: false,
    checkLoginFailed: true,
  });
});

test("should send request to change user", () => {
  expect(
    authReducer(undefined, {
      type: "CHANGE_USER",
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: true,
  });
});

test("should change user data", () => {
  expect(
    authReducer(undefined, {
      type: "CHANGE_USER_SUCCESS",
      user: {},
    })
  ).toEqual({
    ...initialState,
    changeUserRequest: false,
    changeUserFailed: false,
    loginData: {},
  });
});

test("should set error if changing user data failed", () => {
  expect(
    authReducer(undefined, {
      type: "CHANGE_USER_FAILED",
    })
  ).toEqual({
    ...initialState,
    changeUserRequest: false,
    changeUserFailed: true,
  });
});

test("should send logout request", () => {
  expect(
    authReducer(undefined, {
      type: "LOGOUT",
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: true,
  });
});

test("should  logout user", () => {
  expect(
    authReducer(undefined, {
      type: "LOGOUT_SUCCESS",
      user: {},
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: false,
    checkLoginFailed: false,
    loginData: {},
  });
});

test("should set error if logout failed", () => {
  expect(
    authReducer(undefined, {
      type: "LOGOUT_FAILED",
    })
  ).toEqual({
    ...initialState,
    checkLoginRequest: false,
    checkLoginFailed: true,
  });
});
