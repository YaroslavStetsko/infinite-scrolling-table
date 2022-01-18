import { Field } from "formik";
import React from "react";
import styles from "./tag-item.module.scss";
import { TagItemProps } from "./tag-item.props";

const TagItem: React.FC<TagItemProps> = ({ item, deleteTag, includeTag }) => {
  return (
    <label className={styles.item}>
      <div>{item.name}</div>

      <span onClick={() => deleteTag(item.name)}>
        <img
          src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
          alt="delete"
        />
      </span>

      <Field
        className={styles.item}
        name={includeTag ? "include_" + item.name : "exclude_" + item.name}
        type="checkbox"
      />
      <div>&#10003;</div>
    </label>
  );
};

export default TagItem;
