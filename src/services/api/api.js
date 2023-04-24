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
