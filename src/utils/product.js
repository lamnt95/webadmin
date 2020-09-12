import _ from "lodash"

function convertProduct(product) {
  const { subImages, image } = product || {}
  const subImagesSrc = _.map(subImages, i => i.data)
  const imageSrc = _.map(image, i => i.data)[0]
  return { ...product, subImages: subImagesSrc, image: imageSrc }
}

export default {
  convertProduct
}