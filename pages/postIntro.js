import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import PostIntroScreen from "../src/components/PostIntro/PostIntroScreen";
import withLayout from "../src/components/withLayout";

function PostIntroManagement(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(PostIntroScreen);
}

PostIntroManagement.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default PostIntroManagement;
