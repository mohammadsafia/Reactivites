import { ActivitiesApi } from "app/api/activities.api";
import { AccountApi } from "app/api/account.api";

const agent = {
  Activities: ActivitiesApi,
  Account: AccountApi
};

export default agent;