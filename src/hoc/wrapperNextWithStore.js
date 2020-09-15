import { createWrapper } from "next-redux-wrapper";
import { makeStore } from "../app-redux";

const wrapperNextWithStore = createWrapper(makeStore, { debug: true });

export default wrapperNextWithStore;
