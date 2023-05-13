import { FC } from "react";
import styles from "./IngredientCat.module.css";

interface IIngredientCat {
  title: string;
  thisRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element[];
}

const IngredientCat: FC<IIngredientCat> = ({ children, title, thisRef }) => {
  return (
    <div ref={thisRef}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <div className=" pt-6 pb-10">
        <ul className={`list_reset ${styles.ingredint_list}`}>{children}</ul>
      </div>
    </div>
  );
};

export default IngredientCat;
