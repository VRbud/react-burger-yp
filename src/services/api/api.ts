import { IIngredient } from "../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

const { REACT_APP_PUBLIC_URL } = process.env;

export type TUser = {
  email: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
};

type TResponse = {
  success?: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  data?: ReadonlyArray<IIngredient>;
  user?: TUser;
};

export type TResponseBody<TDataType> = {
  success: boolean;
  user?: TDataType;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

export interface CustomResponse<T> extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  readonly data: ReadonlyArray<IIngredient>;
  readonly success: boolean;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly user?: TUser;
  readonly userData?: string;
  clone(): Response;
  json(): Promise<T>;
}

const checkResponse = (res: Response) => {
  try {
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    if (err instanceof Error)
      return Promise.reject(`Ошибка ${res.status}, ${err.message}`);
  }
};

const checkSuccess = (res: any) => {
  try {
    if (res && res.success) {
      return res;
    }
  } catch (err) {
    if (err instanceof Error)
      return Promise.reject(`Ответ не success: ${res}, ${err.message}`);
  }
};

export const requestToServ = (
  endpoint: string,
  options: RequestInit = {}
): Promise<CustomResponse<TResponseBody<TResponse>>> => {
  return fetch(`${REACT_APP_PUBLIC_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

type TCookieProp<T> = {
  [name: string]: T;
};

export const setCookie = (
  name: string,
  value: string,
  props?: TCookieProp<string | Date | boolean>
) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (typeof exp === "object" && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // disable regexp exlint error
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const DeleteCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
