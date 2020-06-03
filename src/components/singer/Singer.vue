<template>
  <div>
    <div class="singer-title">TOP30  歌手</div>
    <div class="singer-fengexian"></div>
    <div class="singer-list">
      <div v-for="(item, index) in singerList" :key="index" class="singer-eve"
      :idx='step(index)' @click="getSingerSong(index)">
        <img :src="item.picUrl" alt="">
        <div class="singer-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   recoverAudio: {
  //     type: Function,
  //     default: null
  //   }
  // },
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.getArtists()
  },
  mounted () {
    // this.recoverAudio(true)
  },
  methods: {
    step (i) {
      return i++
    },
    // 获取热门歌手信息
    async getArtists () {
      let res = await this.$axios.get('http://localhost:3000/top/artists?offset=0&limit=50')
      console.log(res)
      this.singerList = res.data.artists
    },
    // 点击跳转歌手的热门歌曲页面并传递歌手id
    getSingerSong (id) {
      let singerID = this.singerList[id].id
      console.log(singerID)
      this.$router.push('/singersongs?SID=' + singerID)
      // console.log(id)
    }
  }
}
</script>

<style>
.singer-fengexian {
  margin-top: 5px;
  height: 2px;
  width: 2000px;
  background-color: #c20c0c;
}
.singer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}
.singer-eve {
  width: 200px;
  height: 250px;
  margin-top: 10px;
}
.singer-eve:hover {
  cursor: pointer;
}
.singer-list img {
  width: 200px;
  height: 200px;
}
.singer-name {
  text-align: center;
}
.singer-title {
  margin: 5px 0 0 3px;
}
</style>
