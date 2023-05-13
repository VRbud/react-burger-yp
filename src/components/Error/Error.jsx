import styles from "./Error.module.css";

function Error() {
  return (
    <div className={`text text_type_main-large ${styles.error}`}>
      Страница не найдена
    </div>
  );
}

export default Error;
