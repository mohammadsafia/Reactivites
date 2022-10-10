import ActivityStore from "app/stores/activityStore";
import { createContext, useContext } from "react";
import CommonStore from "app/stores/commonStore";
import UserStore from "app/stores/userStore";
import ModalStore from "app/stores/modalStore";

type Store = {
  activityStore: ActivityStore;
  commonStore: CommonStore,
  userStore: UserStore,
  modalStore: ModalStore,
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
