import axios from "axios";
import React, { useState } from "react";
import { contactsType, FiltersType, TagsType } from "./App.types";

const AppServices = () => {
  const [token, setToken] = useState("");
  const [tagsPreloader, setTagsPreloader] = useState(false);
  const [contactsPreloader, setContactsPreloader] = useState(false);
  const [appPreloader, setAppPreloader] = useState(false);
  const [contacts, setContacts] = useState<contactsType>({
    contacts: [],
    nextPage: "",
  });
  const [tags, setTags] = useState<TagsType>({ tags: [] });
  const instance = axios.create({
    baseURL: "https://api-im.chatdaddy.tech",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getToken = () => {
    setAppPreloader(true);
    axios
      .post(`https://api-teams.chatdaddy.tech/token`, {
        refreshToken: "059c420e-7424-431f-b23b-af0ecabfe7b8",
        teamId: "a001994b-918b-4939-8518-3377732e4e88",
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.access_token);
      })
      .catch((err) => console.log(err, "er"))
      .finally(() => {
        setAppPreloader(false);
      });
  };

  const fetchContacts = async (filters: FiltersType | null, page: string) => {
    setContactsPreloader(true);
    const res = await instance
      .get(
        `/contacts?count=100${
          filters
            ? `&minMessagesSent=${filters.minMaxData.sentMin}&maxMessagesSent=${filters.minMaxData.sentMax}&minMessagesRecv=${filters.minMaxData.receivedMin}&maxMessagesRecv=${filters.minMaxData.receivedMax}&tags=${filters.includeTagsArr}&notTags=${filters.excludeTagsArr}`
            : `&page=${page}`
        }`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {})
      .finally(() => {
        setContactsPreloader(false);
      });
    setContacts(res);
  };
  const deleteTags = (name: string) => {
    setTagsPreloader(true);
    setContactsPreloader(true);
    axios
      .delete(`/tags?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getAlltags();
        fetchContacts(null, "");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTagsPreloader(false);
        setContactsPreloader(false);
      });
  };
  const getAlltags = () => {
    setTagsPreloader(true);
    instance
      .get(`/tags`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTagsPreloader(false);
      });
  };
  return {
    token,
    contacts,
    tags,
    tagsPreloader,
    contactsPreloader,
    appPreloader,
    deleteTags,
    getToken,
    fetchContacts,
    getAlltags,
  };
};

export { AppServices };
