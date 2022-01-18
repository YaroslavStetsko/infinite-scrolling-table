import React from "react";
import "./App.css";
import styles from "./App.module.scss";
import { useAppData } from "./App.hook";
import FilterBar from "./components/filter-bar/filter-bar.component";
import Contacts from "./components/contacts/contacts.component";

export type ContactsItem = {
  accountId: string;
  assignee: string | null;
  assigner: string | null;
  createdAt: string;
  email: string;
  id: string;
  img: string | null;
  messagesReceived: number;
  messagesSent: number;
  name: null | string;
  phoneNumber: any;
  tags: {
    name: string;
  }[];
};

export type contactsType = {
  contacts: ContactsItem[] | [];
  nextPage: string | null;
};

const App = () => {
  const {
    contacts,
    tags,
    tagsPreloader,
    contactsPreloader,
    deleteTags,
    fetchContacts,
    setFilters,
  } = useAppData();

  return (
    <div className={styles.app}>
      <FilterBar
        tags={tags}
        setFilters={setFilters}
        preloaderStatus={tagsPreloader}
        deleteTag={deleteTags}
      />
      <Contacts
        contacts={contacts}
        preloaderStatus={contactsPreloader}
        fetchContacts={fetchContacts}
      />
    </div>
  );
};

export default App;
