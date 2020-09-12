import { actions } from "../modules/demo";

export default function demoMiddleware(store) {
  return (next) => (action) => {
    next(action);
  };
}
