<template v-clock>
  <div class="posts-container">
      <div class="posts-item" v-for="(post, index) in posts" :key="index">
          <img class="avatar" :src="post.author.avatar_url" alt="post.author.loginname"/>
          <div class="title">
             <router-link tag="h3" class="title-link" :to="`/post/${post.id}`"><span class="title-tag" :class="{'title-tag-light': post.good || post.top}" v-text="tab2Name(post)"></span><a class="title-content">{{ post.title }}</a></router-link>
             <div class="title-extra"><time>{{ post.create_at | localeTime }}</time> · <router-link tag="a" :to="`/user/${post.author.loginname}`">{{ post.author.loginname }}</router-link></div>
          </div>
          <div class="reply">
              <span>{{ post.reply_count }}</span>
              <span>回复</span>
          </div>
          <div class="visit">
              <span>{{ post.visit_count }}</span>
              <span>访问</span>
          </div>
          <div class="last"></div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import { siteUrl } from '@/constants/url.const'
export default {
  name: 'Posts',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      siteUrl
    }
  },
  methods: {
    tab2Name (post) {
      const { tab, good, top } = post
      if (top) return '置顶'
      if (good) return '精华'
      return {
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘',
        top: '置顶'
     }[tab] || ''
    }
  }
}
</script>
<style lang="less" scoped>
.posts-item {
  display: flex;
  height: 100px;
  margin: 10px;
  .avatar {
    border-radius: 50%;
    height: 100%;
    outline: none;
    margin-right: 10px;
  }
  .title {
    display: flex;
    flex-direction: column;
    flex-basis: 70%;
    > h3 {
      text-align: left;
      margin-bottom: 5px;
      text-decoration: none;
    }
    &-tag {
        display: inline-block;
        margin-right: 5px;
        border-radius: 3px;
        background-color: #E5E5E5;
        color: #AC9999;
        padding: 2px 4px;
        &-light {
            background-color: #80BD01;
            color: #fff;
        }
    }
    &-content {
      font-size: 18px;
      font-weight: 800;
      color: #008cba;
      cursor: pointer;
      overflow: hidden;
      text-decoration: none;
      &:link {
        color: #008cba;
      }
      &:visited {
        color: #641A8B;
      }
      &:hover {
        text-decoration: underline;
      }
    }
    &-extra {
        text-align: left;
    }
  }
  .reply,
  .visit {
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 100%;
    align-content: flex-end;
    margin-right: 10px;
    &:nth-of-type(2) {
      font-size: 17px;
    }
    > span {
        height: 50%;
        line-height: 50px;
    }
  }
}
</style>

