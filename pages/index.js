import { checkIsServer } from "../src/utils/server";
import withLayout from "../src/components/withLayout";

function home() {
  return <div>Home</div>
}

function Home(props = {}) {
  const { pathname } = props;
  return withLayout({ activedTab: "/category" })(home);
}

Home.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default Home;
