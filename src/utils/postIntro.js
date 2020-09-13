import _ from "lodash"

function convertPostIntro(postIntro) {
  const { images, storyMedias } = postIntro || {}
  const imagesString = _.map(images, i => i.data)
  const storyMediasData = _.map(storyMedias, i => {
    if (_.isEmpty(i.videoSrc)) return { imageSrc: i.imageSrc }
    return { videoSrc: i.videoSrc }
  })
  return { ...postIntro, imageList: imagesString, storyMedias: storyMediasData }
}

function convertPostIntroForm(postIntroResponse) {
  if (_.isEmpty(postIntroResponse)) return {}
  const { id, imageList, intro, policy, story, storyMedias, userManual, videoIntro } = postIntroResponse || {}
  return { id, imageList, intro, policy, story, storyMedias, userManual, videoIntro }
}

export default {
  convertPostIntro,
  convertPostIntroForm
}