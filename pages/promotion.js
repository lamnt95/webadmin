import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import PromotionScreen from "../src/components/Promotion/PromotionScreen";
import withLayout from "../src/components/withLayout";

function CategoryManagement(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(PromotionScreen);
}

CategoryManagement.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default CategoryManagement;
