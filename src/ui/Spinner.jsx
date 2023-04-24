import React from "react";
import styles from "./spinnner.module.css";

function Spinner() {
  return (
    <div className={styles.lds_grid}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
