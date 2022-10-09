import ActivityStore from "app/stores/activityStore";
import { createContext, useContext } from "react";
import CommonStore from "app/stores/commonStore";

type Store = {
  activityStore: ActivityStore;
  commonStore: CommonStore
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
