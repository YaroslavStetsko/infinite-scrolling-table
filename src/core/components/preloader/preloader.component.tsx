import classNames from "classnames";
import React from "react";
import PreloaderAnimation from "../../../assets/preloader/spin.svg";
import styles from "./preloader.module.scss";
export const Preloader: React.FC<{ small?: boolean }> = ({ small }) => {
  return (
    <div
      className={
        small ? classNames(styles.preloader, styles.small) : styles.preloader
      }
    >
      <object type="image/svg+xml" data={PreloaderAnimation}>
        svg-animation
      </object>
    </div>
  );
};

export default Preloader;
