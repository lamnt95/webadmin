import _ from "lodash"
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import '../public/fontawesome-free-5.14.0-web/css/all.min.css'
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import { ToastContainer } from "react-toastify";
import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";


function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <ToastContainer hideProgressBar autoClose={2000} />
  </>
}

export default wrapperNextWithStore.withRedux(MyApp);
