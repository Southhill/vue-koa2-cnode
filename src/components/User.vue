<template v-cloak>
  <div class="user-container">
    <div class="card user-card">
      <div class="user-card-header">
        <bread-crumbs></bread-crumbs>
      </div>
      <div class="user-card-profiles">
        <div class="avatar">
          <img :src="user.avatar_url" alt="avatar"/>
          <span>{{ user.loginname }}</span>
        </div>
        <span>{{ user.score }} 积分</span>
        <a class="user-github" :href="`https://www.github.com/${user.githubUsername}`" target="_blank"><span><icon name="github" scale="1.5"></icon> @{{ user.githubUsername }}</span></a>
        <time style="color: #C2B0AB">注册于{{ user.create_at | localeTime }}</time>
        <el-button class="add-topic-btn" @click="showForm">发布话题</el-button>
      </div>
    </div>
    <div class="card topics-card">
      <div class="card-header">最近创建的话题 {{user.recent_topics ? user.recent_topics.length : ''}}</div>
      <div v-if="user.recent_topics.length > 0" class="card-content">
        <div v-for="(topic, index) in user.recent_topics" class="card-item topics-item" v-if="index < 5 || (index >=5 && hasMoreTopics)" :key="index">
          <router-link :to="`/user/${topic.author.loginname}`" class="card-item-avatar"><img :src="topic.author.avatar_url" alt="avatar"/></router-link>
          <router-link class="card-item-title" :to="`/post/${topic.id}`">{{ topic.title }}</router-link>
          <time class="card-item-time">最新回复于 {{ topic.last_reply_at | localeTime }}</time>
        </div>
        <div v-if="user.recent_topics.length > 5" class="card-item"  @click="toggleMoreList('hasMoreTopics')">{{ hasMoreTopics ? '更少一些«': '查看更多»' }}</div>
      </div>
      <div v-else class="card-nocontent">无话题</div>
    </div>
    <div class="card reply-card">
      <div class="card-header">最近参与的话题 {{user.recent_replies ? user.recent_replies.length : ''}}</div>
      <div v-if="user.recent_replies.length > 0" class="card-content">
        <div v-for="(reply, index) in user.recent_replies" class="card-item replies-item" v-if="index < 5  || (index >=5 && hasMoreReplies)" :key="index">
          <router-link :to="`/user/${reply.author.loginname}`" class="card-item-avatar"><img :src="reply.author.avatar_url" alt="avatar"/></router-link>
          <router-link class="card-item-title" :to="`/post/${reply.id}`">{{ reply.title }}</router-link>
          <time class="card-item-time">最新回复于 {{ reply.last_reply_at | localeTime }}</time>
        </div>
        <div v-if="user.recent_replies.length > 5" class="card-item" @click="toggleMoreList('hasMoreReplies')">{{ hasMoreReplies ? '更少一些«' : '查看更多»' }}</div>
      </div>
      <div v-else class="card-nocontent">无话题</div>
    </div>
    <form-topic></form-topic>
  </div>
</template>
<script>
import BreadCrumbs from '@/components/BreadCrumbs'
import { authAK, getUser } from '@/api/index'
export default {
  name: 'User',
  components: {
    BreadCrumbs
  },
  props: {
    name: String
  },
  data () {
    return {
      user: {
        recent_topics: [],
        recent_replies: []
      },
      hasMoreTopics: false,
      hasMoreReplies: false
    }
  },
  async created () {
    const name = this.$route.params.name
    if (name) {
      const userRes = await getUser(name)
      this.user = userRes
      return
    }
    let ak = sessionStorage.getItem('accessToken')
    if (typeof ak === 'undefined' || ak === null) {
      const confirmObj = await this.$prompt('请输入accessToken值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      ak = confirmObj.value
    }
    const res = await authAK(ak)
    if (!res) return
    const data = res.data
    if (data.success) {
      sessionStorage.setItem('accessToken', ak)
      sessionStorage.setItem('loginname', data.loginname)
      const userRes = await getUser(data.loginname)
      this.user = userRes
    } else {
      this.$msg.error(`认证ak失败，${data.error_msg}`)
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.params.name': async function (to) {
      const userRes = await getUser(to)
      this.user = userRes
    }
  },
  methods: {
    toggleMoreList (key, status) {
      this[key] = status || !this[key]
    },
    showForm () {
      this.$bus.$emit('showForm', true)
    }
  }
}
</script>
<style lang="less" scoped>
.user-container {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
  .card {
    margin: 10px auto;
    border: 1px solid #E5E5E5;
    border-radius: 3px;
    text-align: left;
    &-header {
      padding: 10px;
      border-bottom: 1px solid #E5E5E5;
      background-color: #F6F6F6;
    }
    &-content {
      padding: 10px;
    }
    &-nocontent {
      padding: 10px 10px 20px;
    }
    &-item {
      display: flex;
      height: 30px;
      line-height: 30px;
      padding: 10px;
      border-bottom: 1px solid #F3F3F3;
      cursor: pointer;
      &:nth-last-child(1) {
        border-bottom: 0 none;
        padding-bottom: 0;
      }
      &-avatar {
        height: 100%;
        outline: none;
        margin-right: 10px;
        > img {
          height: 100%;
          outline: none;
        }
      }
      &-title {
        width: 70%;
        flex-basis: 70%;
        font-weight: bold;
        color: #1188D4;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      &-time {
        flex-grow: 1;
        color: #C1ABC1;
        text-align: right;
        font-size: .8em;
      }
    }
  }
}
.user-card {
  &-profiles {
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;
    .avatar {
      width: 100%;
      > img {
        width: 50px;
        margin-right: 10px;
      }
      > span {
        vertical-align: top;
      }
    }
    > span {
      flex-basis: 30px;
      margin: 10px 0;
    }
    .user-github {
      color: #333333;
      text-decoration: none;
      width: 100px;
      &:hover {
        text-decoration: underline;
      }
    }
    .add-topic-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
      background-color: #80BD01;
      &:hover {
        background-color: #6ba44e;
      }
    }
  }
}
</style>
