import { TagsType } from "../../App.types";

export type filterBarProps = {
  tags: TagsType;
  setFilters: any;
  preloaderStatus: boolean;
  deleteTag: (name: string) => void;
};
