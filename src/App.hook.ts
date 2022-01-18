import React, { useEffect, useState } from "react";
import { contactsType, FiltersType, TagsType } from "./App.types";
import { AppServices } from "./AppServices.hook";

const useAppData = () => {
  const {
    token,
    contacts,
    tags,
    tagsPreloader,
    contactsPreloader,
    appPreloader,
    deleteTags,
    getAlltags,
    getToken,
    fetchContacts,
  } = AppServices();
  const [filters, setFilters] = useState<FiltersType | null>(null);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    fetchContacts(filters, "");
  }, [filters, token]);

  useEffect(() => {
    getAlltags();
  }, [token]);

  return {
    contacts,
    tags,
    filters,
    tagsPreloader,
    contactsPreloader,
    appPreloader,
    setFilters,
    deleteTags,
    fetchContacts,
  };
};

export { useAppData };
