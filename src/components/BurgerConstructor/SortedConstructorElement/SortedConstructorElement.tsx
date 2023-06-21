import { useRef } from "react";
import type { FC } from "react";
import styles from "./SortedConstructorElement.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { IIngredient } from "../../../Types/BurgerConstructorTypes/StoreTypes/IngredientTypes";

export interface CardProps {
  id: string;
  index: number;
  ingredient: IIngredient;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string, index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
}

const SortedConstructorElement: FC<CardProps> = ({
  ingredient,
  index,
  id,
  moveIngredient,
  handleDelete,
}) => {
  const ingRef = useRef<HTMLDivElement>(null);
  /* eslint-disable */
  // без определеиния handlerId не работает хук
  //@ts-ignore
  const [{ handlerId }, drop] = useDrop({
    /* eslint-enable */
    accept: "ingredientInCart",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // toDo add types for Ingredient
    //@ts-ignore
    hover(item: DragItem, monitor) {
      if (!ingRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ingRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (
        hoverClientY &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }
      if (
        hoverClientY &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  /* eslint-disable */
  // без определеиния handlerId не работает хук
  const [{ isDragging }, drag] = useDrag({
    /* eslint-enable */
    type: "ingredientInCart",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ingRef));

  return (
    <>
      <div className={styles.fillings} ref={ingRef} id={`drop${id}`}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleDelete(ingredient._id, index)}
        />
      </div>
    </>
  );
};

export default SortedConstructorElement;
