<template>
  <div class="recommend-head">
     <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item v-for="item in bannerData" :key="item.id">
      <h3 class="medium">
        <img :src="item.pic" alt="">
      </h3>
      </el-carousel-item>
     </el-carousel>
     <i class="el-icon-star-on"></i>
     <div class="recommend-today">今日推荐单曲QAQ</div>
     <div class="recommend-fenge"></div>
     <!-- 今日推荐歌曲列表 -->
     <div class="commend-list">
        <div class="recommend-nav" v-for="(item, index) in recommendMusicList" :key="index">
          <!-- 歌曲具体图片和名字 -->
          <div class="recommend-animate" @click="playRecommendMusic(index)" :id='step(index)'>
            <img :src="item.picUrl" alt="图片未能成功加载" width="200" height="200" :title='item.name'>
          </div>
          <div class="recommend-songName">{{item.name}}</div>
        </div>

     </div>
     <!-- mv模块标题 -->
     <div class="mv-head">
       <i class="el-icon-d-arrow-right"></i>
       <div class="recommend-mv">今日推荐MV</div>
     </div>
     <div class="recommend-fenge-mv">
        >>>最新MV，震撼你的视听
        <div class="recommend-fengexian"></div>
        <!-- mv具体列表 -->
        <div class="recommend-mv-list">
          <div class="recommend-nav" v-for="(item, index) in recommendMvList" :key="index">
          <!-- mv具体图片和名字 -->
          <div class="recommend-animate recommend-mv-tupian" @click="playRecommendMv(index)" :idx='step(index)'>
            <!-- <i class="el-icon-edit"></i> -->
            <img :src="item.picUrl" alt="" width="200" height="200" :title='item.name'>
          </div>
          <div class="recommend-mvName">{{item.name}}-{{item.artistName}}</div>
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
      bannerData: [],
      bannerUrl: '',
      recommendMusicList: [],
      recommendMvList: []

    }
  },
  created () {
    this.getBanner()
    this.getNewSongs()
    this.getMv()
  },
  mounted () {
    this.recoverAudio(true)
  },
  methods: {
    // 获取轮播图信息
    async getBanner () {
      let res = await this.$axios.get('http://localhost:3000/banner?type=2')
      // console.log(res)
      this.bannerData = res.data.banners
      // this.bannerUrl = res.data.banners[0].pic
    },
    // 获取推荐的新音乐
    async getNewSongs () {
      let res = await this.$axios.get('http://localhost:3000/personalized/newsong')
      // console.log(res)
      this.recommendMusicList = res.data.result
    },
    step (i) {
      return i++
    },
    // 播放推荐歌曲
    playRecommendMusic (id) {
      // console.log(id)
      let singer = this.recommendMusicList[id].song.artists[0].name
      let songName = this.recommendMusicList[id].name
      let recommendMusicId = this.recommendMusicList[id].id
      this.url = 'https://music.163.com/song/media/outer/url?id=' + recommendMusicId + '.mp3'
      this.$emit('getUrl', this.url)
      // this.$router.go(-1)
      // 跳转歌词页面
      this.$router.push('/lyric?id=' + recommendMusicId + '&singer=' + singer + '&songName=' + songName)
    },
    // 获取推荐MV信息图片名字
    async getMv () {
      let res = await this.$axios.get('http://localhost:3000/personalized/mv')
      // console.log(res)
      this.recommendMvList = res.data.result
    },
    // 点击播放MV，获取mv相关信息
    async playRecommendMv (id) {
      // console.log(id)
      let mvId = this.recommendMvList[id].id
      let res = await this.$axios.get('http://localhost:3000/mv/url?id=' + mvId)
      // console.log(res.data.data.url)
      // let obj = {}
      // this.$emit('getUrl', res.data.data.url)
      // this.$router.go(-1)
      // 跳转mv播放页面
      this.$router.push('/mvPlay?url=' + res.data.data.url)
    }
  }
}
</script>

<style>
  .recommend-head {
    background-color: #9fa19e;
    height: 300px;
    width: 100%;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;

  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .recommend-fenge {
    background-color:#860808;
    height: 2px;
  }
  .recommend-today {
    font-size: 20px;
    padding-left: 30px;
  }
  .el-icon-star-on {
    color: #850908;
    font-size: 18px;
    float: left;
    padding-left: 5px;
    padding-top: 2px;
  }
.commend-list {
  height: 610px;
  /* background-color: red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
  border-left: 1px solid #860808;
}
.recommend-nav {
  width: 200px;
  height: 260px;
  /* background-color: blue; */
  margin-top: 30px;
  /* margin-bottom: 50px; */
}
.recommend-animate {
   overflow: hidden;
}
.recommend-animate>img {
  transition-property: all;
    transition-duration: 4s;
    transition-delay: 0s, 1s, 0s;
}
.recommend-animate>img:hover{
  /* height: 100px; */
  width: 250px;
  height: 250px;
  box-shadow: 5px 3px 5px #03040a;
  cursor: pointer;
}
.recommend-songName {
  text-align: center;
}
.recommend-songName:hover {
  cursor: pointer;
  font-style: italic;
  color: darkgrey;
  font-size: 20px;
}
.mv-head {
  width: 100%;
  height: 30px;
  /* background-color: red; */
  display: flex;
}
.el-icon-d-arrow-right {
  color: #850908;
  font-size: 18px;
    padding-left: 5px;
    padding-top: 2px;
}
.recommend-mv {
  font-size: 20px;
  padding-left: 5px;

}
.recommend-fenge-mv {
  /* background-color:#860808; */
  height: 100%;
  width: 100%;

}
.recommend-fengexian {
  height: 2px;
  width: 100%;
  background-color: #860808;

}
.recommend-mv-list {
  width: 100%;
  height: 100%;
  /* background-color:#860808; */
  border-left: 1px solid #860808;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}
.recommend-mvName {
  text-align: center;

}
.recommend-mv-tupian {
  margin-left: -30px;
}
</style>
