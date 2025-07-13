import activityModel from "../models/activities.js"
import {v4 as uuid} from "uuid"

const createActivity =  async (userData) => {
  return await activityModel.create({
    keyword: userData.keyword,
    hyperlink: userData.hyperlink,
    href: userData.href,
    uid: uuid()
  })
}

export default createActivity
