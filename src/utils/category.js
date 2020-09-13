import _ from "lodash"

function convertCategory(category) {
  const { images, storyMedias } = category || {}
  const imagesString = _.map(images, i => i.data)
  const storyMediasData = _.map(storyMedias, i => {
    if (_.isEmpty(i.videoSrc)) return { imageSrc: i.imageSrc }
    return { videoSrc: i.videoSrc }
  })
  return { ...category, images: imagesString, storyMedias: storyMediasData }
}

export default {
  convertCategory
}