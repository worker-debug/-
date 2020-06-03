<template>
  <div>
    <div>>>当前播放MV接口被封...</div>
    <video :src="mvUrl" controls autoplay></video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mvUrl: '66'
    }
  },
  created () {
    this.preserveMvUrl()
    console.log(this.mvUrl)
  },
  methods: {
    // 保存传过来的mv播放地址
    preserveMvUrl () {
      this.mvUrl = this.$route.query.url
    }
  }
}
</script>

<style>
  video {
    width: 100%;
    height: 500px;
  }
</style>
