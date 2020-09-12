import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import CartScreen from "../src/components/Cart/CartScreen";
import withLayout from "../src/components/withLayout";

function Cart(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(CartScreen);
}

Cart.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default Cart;
