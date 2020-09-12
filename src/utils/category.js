import _ from "lodash"

function convertCategory(category) {
  const { images } = category || {}
  const imagesString = _.map(images, i => i.data)
  return { ...category, images: imagesString }
}

export default {
  convertCategory
}