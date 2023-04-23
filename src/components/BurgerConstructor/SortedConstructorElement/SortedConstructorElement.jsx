import { useRef } from "react";
import styles from "./SortedConstructorElement.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { burgerIngredientTypes } from "../../../Types/types";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DELETE_FROM_CART } from "../../../services/actions/constructor";

SortedConstructorElement.propTypes = {
  ingredient: burgerIngredientTypes,
  index: PropTypes.number,
  id: PropTypes.string,
  moveIngredient: PropTypes.func,
};

function SortedConstructorElement({ ingredient, index, id, moveIngredient }) {
  const ingRef = useRef(null);
  const dispatch = useDispatch();
  /* eslint-disable */
  // без определеиния handlerId не работает хук
  const [{ handlerId }, drop] = useDrop({
    /* eslint-enable */
    accept: "ingredientInCart",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

  const handleClose = () => {
    dispatch({
      type: DELETE_FROM_CART,
      ing: ingredient._id,
    });
  };

  return (
    <>
      <div className={styles.fillings} ref={ingRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleClose(ingredient._id)}
        />
      </div>
    </>
  );
}

export default SortedConstructorElement;
