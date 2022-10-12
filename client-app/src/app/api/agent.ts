import { ActivitiesApi } from "app/api/activities.api";
import { AccountApi } from "app/api/account.api";
import { ProfilesApi } from "app/api/profiles.api";

const agent = {
  Activities: ActivitiesApi,
  Account: AccountApi,
  Profiles: ProfilesApi
};

export default agent;