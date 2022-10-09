import ActivityStore from "app/stores/activityStore";
import { createContext, useContext } from "react";

type Store = {
  activityStore: ActivityStore
}

export const store: Store = {
  activityStore: new ActivityStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
