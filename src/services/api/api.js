import axios from "axios";

const { REACT_APP_PUBLIC_URL } = process.env;

export const fetchData = async () => {
  try {
    const result = await axios(`${REACT_APP_PUBLIC_URL}ingredients`);
    if (result.status >= 200 && result.status < 300) {
      return result.data.data;

    } else {

      throw new Error("Что-то пошло не так");
    }
  } catch (e) {
    console.log(e.message);
  }
}