import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import ProductScreen from "../src/components/Product/ProductScreen";
import withLayout from "../src/components/withLayout";

function Product(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(ProductScreen);
}

Product.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default Product;
