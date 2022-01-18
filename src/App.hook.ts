import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { contactsType, FiltersType, TagsType } from "./App.types";

const useAppData = () => {
  const [token, setToken] = useState(
    "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6IjEwMTExMTEwMDAwMDAwMDExMTExMTExMTEwMTAwMTExMDAwMDAwMDExMDAwMDAwMDAwMDAxMDAxMTExMTExMTExMSIsImlhdCI6MTY0MjUwMDU2MCwiZXhwIjoxNjQyNTA0MTYwLCJ1c2VyIjp7ImlkIjoiYWI4OWUyNWUtNWEyYy00NTU1LThjYjUtNTcxMTYwNmM2ZWQxIiwiZnVsbE5hbWUiOiJ6b29tZGVtbzIiLCJwaG9uZU51bWJlciI6Ijg1MjY1ODc4NTQ0IiwidGVhbUlkIjoiYTAwMTk5NGItOTE4Yi00OTM5LTg1MTgtMzM3NzczMmU0ZTg4In19.v9qUJd2sjMbgGthWXKqrRrCRl84XONFJZ1q68lFjbR9OOlvtjPqQ5g1xBPcVqgoAxZ_SkuG7l3Di7NuI7brn0g"
  );
  const [contacts, setContacts] = useState<contactsType>({
    contacts: [],
    nextPage: "",
  });
  const [tagsPreloader, setTagsPreloader] = useState(false);
  const [contactsPreloader, setContactsPreloader] = useState(false);
  const [filters, setFilters] = useState<FiltersType | null>(null);
  const [tags, setTags] = useState<TagsType>({ tags: [] });

  const instance = axios.create({
    baseURL: "https://api-im.chatdaddy.tech",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getToken = () => {
    axios
      .post(`api-teams.chatdaddy.tech/token`, {
        body: {
          refreshToken: "059c420e-7424-431f-b23b-af0ecabfe7b8",
          teamId: "a001994b-918b-4939-8518-3377732e4e88",
        },
      })
      .then((res) => {})
      .catch((err) => console.log(err, "er"));
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

  useEffect(() => {
    fetchContacts(filters, "");
  }, [filters]);

  useEffect(() => {
    getAlltags();
    // getToken();
  }, []);

  console.log("component render");

  return {
    contacts,
    tags,
    filters,
    tagsPreloader,
    contactsPreloader,
    setFilters,
    deleteTags,
    fetchContacts,
  };
};

export { useAppData };
