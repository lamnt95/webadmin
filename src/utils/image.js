import _ from "lodash"
import { v4 as uuidv4 } from 'uuid';

function addIdImage(images) {
  return _.map(images, i => ({ id: uuidv4(), data: i }))
}

function addIdOneImage(image) {
  return { id: uuidv4(), data: image }
}

export default {
  addIdImage,
  addIdOneImage
}