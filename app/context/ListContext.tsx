// create an context for the list
import type { ReactElement } from "react";
import { createContext, useContext } from "react";
import type { List } from "types/List";

const ListContext = createContext<List>({
  links: [],
  productList: [],
  taxes: [],
  updateDate: "",
});

const ListProvider = ({
  value,
  children,
}: {
  value: List;
  children: ReactElement;
}) => {
  return <ListContext.Provider {...{ value }}>{children}</ListContext.Provider>;
};

const useList = () => useContext(ListContext);

export { ListProvider, useList };
