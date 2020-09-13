import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import PostScreen from "../src/components/Post/PostScreen";
import withLayout from "../src/components/withLayout";

function PostManagement(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(PostScreen);
}

PostManagement.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default PostManagement;
