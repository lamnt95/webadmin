import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import CategoriesScreen from "../src/components/Categories/CategoriesScreen";
import withLayout from "../src/components/withLayout";

function CategoryManagement(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(CategoriesScreen);
}

CategoryManagement.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default CategoryManagement;
