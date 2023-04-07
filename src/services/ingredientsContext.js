import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../ui/Spinner'

const { REACT_APP_PUBLIC_URL } = process.env;
const ingredientsContext = createContext()


export default function IngredientsProvider({ children }) {

  const [ingredientsData, setIngredientsData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${REACT_APP_PUBLIC_URL}ingredients`);
        if (result.status >= 200 && result.status < 300) {
          setIngredientsData(result.data.data);
        } else {
          setIsError(true);
          throw new Error("Что-то пошло не так");
        }
      } catch (e) {
        setIsError(true);
      }
    }

    fetchData();

  }, []);


  return (
    ingredientsData
      ?
      <>
        <ingredientsContext.Provider value={{ ingredientsData, isError }}>
          {children}
        </ingredientsContext.Provider>
      </>
      :
      isError ? <div>Что-то пошло не так, попробуйте перезагрузить страницу</div> : <Spinner />
  )
}

export function useIngredientsAPI() {
  const context = useContext(ingredientsContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}