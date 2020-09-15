import { checkIsServer } from "../src/utils/server";
import withLayout from "../src/components/withLayout";
import LoginScreen from "../src/components/Login/LoginScreen"

function LoginPage(props = {}) {
  const { pathname } = props;
  return <LoginScreen />;
}

LoginPage.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default LoginPage;
