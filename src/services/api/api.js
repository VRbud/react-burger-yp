const { REACT_APP_PUBLIC_URL } = process.env;

const checkResponse = (res) => {
  try {
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    return Promise.reject(`Ошибка ${res.status}, ${err.message}`);
  }
};

const checkSuccess = (res) => {
  try {
    if (res && res.success) {
      return res;
    }
  } catch (err) {
    return Promise.reject(`Ответ не success: ${res}, ${err.message}`);
  }
};

export const requestToServ = (endpoint, options) => {
  return fetch(`${REACT_APP_PUBLIC_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const refreshCookie = (token) => {
  try {
    return requestToServ("auth/token", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
  } catch (err) {
    return Promise.reject(`Ответ не обновление кук:  ${err.message}`);
  }
};

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
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
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function DeleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
