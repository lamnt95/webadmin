import _ from "lodash"
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import '../public/fontawesome-free-5.14.0-web/css/all.min.css'
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import { useEffect } from "react"
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux"
import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import { selectors } from "../src/app-redux"
import { useRouter } from "next/router"


function MyApp({ Component, pageProps }) {
  const accessToken = useSelector(selectors.auth.getAccessToken);
  const router = useRouter()
  useEffect(() => {
    if (_.isEmpty(accessToken)) {
      router.push("/login")
    }
  }, [accessToken])
  return <>
    <Component {...pageProps} />
    <ToastContainer hideProgressBar autoClose={2000} />
  </>
}

export default wrapperNextWithStore.withRedux(MyApp);
