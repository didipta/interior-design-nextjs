import Userslices from "./Slice/Userslice/Userslices";
import { api } from "./api/apiSlice";

export const reducer = {
  UserSlice: Userslices,
  [api.reducerPath]: api.reducer,
};
