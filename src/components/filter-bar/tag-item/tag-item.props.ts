export type TagItemProps = {
  item: { name: string };
  deleteTag: (name: string) => void;
  includeTag?: boolean;
};
