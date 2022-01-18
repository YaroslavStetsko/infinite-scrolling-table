import React, { useEffect, useState } from "react";
import ContactItem from "./contact-item/contact-item.component";
import styles from "./contacts.module.scss";
import { ContactsItem, contactsType } from "../../App.types";
import Preloader from "../../core/components/preloader/preloader.component";
import useDebounce from "../../core/hooks/debounce/debounce.hook";
const Contacts: React.FC<{
  contacts: contactsType;
  fetchContacts: (filters: any | null, page: string) => void;
  preloaderStatus: boolean;
}> = ({ contacts, preloaderStatus }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [contactsFilterResult, setContactsFilterResult] = useState<
    ContactsItem[] | null
  >([]);
  const debouncedSearch = useDebounce(searchValue, 500);
  useEffect(() => {
    if (debouncedSearch) {
      setContactsFilterResult(
        contacts?.contacts.filter((el) =>
          el.name?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setContactsFilterResult(null);
    }
  }, [debouncedSearch]);
  return (
    <div className={styles.contacts}>
      <div className={styles.header}>
        <div className={styles.title}>
          All contacts({contacts?.contacts.length})
        </div>
        <div className={styles.addnew}>+</div>
      </div>
      <input
        type="text"
        placeholder="Search contacts"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {contactsFilterResult && (
        <span className={styles.resultsInfo}>
          Found {contactsFilterResult.length} contacts
        </span>
      )}
      {preloaderStatus ? (
        <Preloader />
      ) : (
        <div className={styles.contactsList}>
          {contactsFilterResult
            ? contactsFilterResult.map((el, i) => (
                <ContactItem el={el} key={i} />
              ))
            : contacts?.contacts?.map((el, i) => (
                <ContactItem el={el} key={i} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
