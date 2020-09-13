import _ from "lodash"
import { v4 as uuidv4 } from 'uuid';

function addIdImage(images) {
  return _.map(images, i => ({ id: uuidv4(), data: i }))
}

function addIdOneImage(image) {
  return { id: uuidv4(), data: image }
}

function addIdOneStoryMedia(storyMedia, type) {
  return { id: uuidv4(), [type]: storyMedia }
}

export default {
  addIdImage,
  addIdOneImage,
  addIdOneStoryMedia
}