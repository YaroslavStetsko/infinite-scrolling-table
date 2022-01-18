import React from "react";
import { ContactsItem } from "../../../App.types";
import styles from "./contact-item.module.scss";

const ContactItem: React.FC<{ el: ContactsItem }> = ({ el }) => {
  return (
    <div className={styles.contactItem}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        alt=""
      />
      <div>
        <div>{el?.name ? el.name : "No name"}</div>

        <div>{el?.phoneNumber ? el.phoneNumber : "063 20 44 093"}</div>
      </div>
      <div className={styles.tags}>
        {el?.tags?.map((tag, i) => (
          <div className={styles.tag} key={i}>
            {tag.name}
            <span>&times;</span>
          </div>
        ))}
        <div className={styles.add}>+</div>
      </div>
    </div>
  );
};

export default ContactItem;
