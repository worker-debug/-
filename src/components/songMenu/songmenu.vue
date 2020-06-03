<template>
  <div class="menu-all-head">
    <div class="menu-aside">
      <div class="menu-all">全部主题歌单</div>
      <div v-for="(item, index) in songmenuList" :key="index" class="songmenuName"
      @click="getSongMenuDetail(index)" :id='step(index)'>{{item.name}}></div>
    </div>
    <div class="menu-main">
      <div class="currt-menu-name"><i class="el-icon-service"></i>{{tag}}</div>
      <div class="menu-fengexian"></div>
      <!-- 具体歌单列表 -->
      <div class="menulist">
        <div class="menulist-item" v-for="(item, index) in SongMenuDetail" :key="index" @click="getSongMenuDetailEvery(index)"
        :idx ='step(index)'>
          <div class="img-img"><img :src="item.coverImgUrl" alt="" class="menu-img"></div>
          <div class="menu-name">{{item.name}}</div>
          <div class="menu-by">by {{item.creator.nickname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recoverAudio: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      songmenuList: [],
      SongMenuDetail: [],
      tag: '' || '流行',
      menuId: ''
    }
  },
  created () {
    this.getSongmenuCate()
  },
  mounted () {
    this.recoverAudio(true)
    this.getSongMenuDetailFirst()
  },
  methods: {
    // 获取歌单全部分类，欧美，华语等
    async getSongmenuCate () {
      let res = await this.$axios.get('http://localhost:3000/playlist/catlist')
      // console.log(res)
      this.songmenuList = res.data.sub
    },
    step (i) {
      return i++
    },
    // 获取点击的分类歌单中的精选歌单
    async getSongMenuDetail (id) {
      let tag = this.songmenuList[id].name
      this.tag = tag
      let res = await this.$axios.get('http://localhost:3000/top/playlist/highquality?cat=' + tag)
      console.log(res)
      this.SongMenuDetail = res.data.playlists
      // this.menuId =
      if (this.SongMenuDetail.length === 0) {
        this.$message({
          message: '该歌单模块暂无数据，请更换其他歌单',
          type: 'warning'
        })
      }
    },
    // 进入页面渲染默认页面
    async getSongMenuDetailFirst () {
      let res = await this.$axios.get('http://localhost:3000/top/playlist/highquality?cat=流行')
      this.SongMenuDetail = res.data.playlists
    },
    // step (i) {
    //   return i++
    // },
    // 点击某个歌单得到歌曲并且传递歌单ID
    getSongMenuDetailEvery (id) {
      let menuId = this.SongMenuDetail[id].id
      // console.log(menuId)
      this.$router.push('/menusonglist?id=' + menuId)
    }
  }

}
</script>

<style>
.menu-all-head {
  display: flex;
}
.menu-aside {
  width: 150px;
  height: 100%;
  background-color: #5c5252;
  border: 1px solid #6e5a5a;
}
.menu-main {
  width: 100px;
  height: 20px;
  flex: 1;
  /* background-color: blue; */
}
.menu-all {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 19px;
  text-align: center;
  color: rgb(212, 168, 212);
}
.songmenuName {
  height: 30px;
  text-align: center;
  line-height: 15px;
  color:#e6e6e6;
  margin-top: 3px;
}
.songmenuName:hover {
  font-style: oblique;
  font-size: 17px;
  background-color: #e6e6e6;
  color: cornflowerblue;
  cursor: pointer;
}
.menu-fengexian {
  height: 2px;
  width: 100%;
  background-color: #5c5252;
}
.el-icon-service {
  margin-right: 5px;
  font-size: 18px;
  color: #5c5252;
}
.currt-menu-name {
  font-size: 18px;
  font-weight: 700;
  margin: 2px 0 2px 5px;
}
.menulist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}
.menulist-item {
  width: 200px;
  height: 260px;
  margin-left: 10px;
  margin-bottom: 5px;
  /* background-color: red; */
}
.menulist-item:hover {
  cursor: pointer;
}
.menu-img {
  width: 200px;
  height: 200px;
}
.img-img {
  margin-top: 30px;
}
.menu-name {
  width: 200px;
  height: 22px;
  overflow: hidden;
}
.menu-by {
  color: #b67474;
}
</style>
