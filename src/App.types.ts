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

export type InitialValues = {
  sentMin: number;
  sentMax: number;
  receivedMin: number;
  receivedMax: number;
};

export type FiltersType = {
  minMaxData: InitialValues;
  includeTagsArr: string[];
  excludeTagsArr: string[];
};

export type contactsType = {
  contacts: ContactsItem[] | [];
  nextPage: string;
};

export type TagsType = {
  tags:
    | {
        name: string;
      }[]
    | [];
};
