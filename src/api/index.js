import { Message } from 'element-ui'
import * as moment from 'moment'

import fetcher from '@/tools/fetcher'

moment.locale()

export const getTopics = async (params = {}) => {
  const res = await fetcher.get('topics', { params }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  const data = res.data.data
  return data.map(item => Object.assign({}, item, {
    last_reply_at_locale: moment(item.last_reply_at).fromNow(),
    create_at_locale: moment(item.create_at).fromNow()
  }))
}

export const getTipic = async (id, params) => {
  const res = await fetcher.get(`topics/${id}`, { params }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  return res.data.data
}

export const getCollectTips = async (name, params) => {
  const res = await fetcher.get(`topic_collect/${name}`, { params }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  return res.data.data
}

export const getUser = async (loginname) => {
  const res = await fetcher.get(`user/${loginname}`).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  return res.data.data
}

export const getMessageCount = async (params) => {
  const res = await fetcher.get('message/count', { params }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  return res.data.data
}

export const getMessages = async (params) => {
  const res = await fetcher.get('messages', { params }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  return res.data.data
}

/* eslint-disable */
export const postTopic = async (sendData) => {
  const { topic_id } = sendData
  const url = topic_id ? 'topics/update' : 'topics'
  const tip = topic_id ? '更新成功' : '新增成功'
  const res = await fetcher.post(url, sendData).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    Message.success({
      showClose: true,
      message: tip
    })
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
}

/* eslint-enable */
export const postCollectTipic = async (sendData, hasCollect = true) => {
  const url = hasCollect ? 'topic_collect/collect' : 'topic_collect/de_collect'
  const tip = hasCollect ? '主题收藏成功!' : '主题取消收藏成功!'
  const res = await fetcher.post(url, sendData).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    Message.success({
      showClose: true,
      message: tip
    })
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
}

export const addReplies = async (topicId, sendData) => {
  const res = await fetcher.post(`topic/${topicId}/replies`, sendData).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    return res.data.reply_id
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
}

export const replyUps = async (replyId, sendData) => {
  const res = await fetcher.post(`reply/${replyId}/ups`, sendData).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    return res.data.action
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
}

/* eslint-disable */
/**
 * 验证ak的正确性，返回相应的用户简略信息.
 * @param {Object{accesstoken: String}} sendData 
 */
export const authAK = async (ak) => {
  const res = await fetcher.post('accesstoken', { accesstoken: ak }).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    return res
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
}

/* eslint-enable */
export const markMessage = async (sendData, msgId) => {
  const url = msgId ? `message/mark_one/${msgId}` : 'message/mark_all'
  const tip = msgId ? '已设置该条消息为已读' : '已设置全部消息为已读'
  const res = await fetcher.post(url, sendData).catch(err => {
    Message.error({
      showClose: true,
      message: err.data.error_msg
    })
  })
  if (res.data.success) {
    Message.success({
      showClose: true,
      message: tip
    })
  } else {
    Message.error({
      showClose: true,
      message: res.data.error_msg
    })
  }
  return res.data.success
}
