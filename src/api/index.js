import category from "./category"
import product from "./product"
import promotion from "./promotion"
import cart from "./cart"
import postIntro from "./postIntro"
import post from "./post"
import auth from "./auth"

export default { ...category, ...product, ...promotion, ...cart, ...postIntro, ...post, ...auth }