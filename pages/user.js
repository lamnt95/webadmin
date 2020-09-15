import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import withLayout from "../src/components/withLayout";

function UserScreen(){
  return <div>UserScreen</div>
}

function UserPage(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(UserScreen);
}

UserPage.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default UserPage;
