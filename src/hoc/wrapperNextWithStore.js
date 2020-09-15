import { createWrapper } from "next-redux-wrapper";
import { makeStore } from "../app-redux";

export const store = makeStore();

const wrapperNextWithStore = createWrapper(() => store, { debug: true });

export default wrapperNextWithStore;
