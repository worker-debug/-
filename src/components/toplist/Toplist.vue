<template>
  <div class="top-all">
    <div class="top-aside">
      <div class="top-allTitle">网易云歌曲排行榜</div>
      <ul>
        <li v-for="(item, index) in toplist" :key="index">
          <div class="top-every" @click="getTopDetail(index)" :idx='step(index)'>
          <img :src="item.coverImgUrl" alt="">
          <div class="top-updata">{{item.updateFrequency}}</div>
          <div class="top-name">{{item.name}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 排行榜单详情 -->
    <div class="top-main">
      <div class="top-main-up">
        <img :src="mainUrl" alt="">
        <div class="top-main-title" >{{toplist[topId].name}}</div>
        <div class="top-main-smallTitle">一键点开世界所有好音乐!</div>
      </div>
      <div class="top-main-down">
        <el-table
          @row-click='playTopMusic'
          :data="topPlayList"
          border
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="ar[0].name"
            label="歌手"
            width="180"
            column-key>
          </el-table-column>
          <el-table-column
            prop="name"
            label="歌曲"
            width="180">
          </el-table-column>
          <el-table-column
            prop="dt"
            label="时长">
          </el-table-column>
        </el-table>
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
      toplist: [],
      topId: '' || 0,
      color: '',
      mainUrl: '' || 'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
      topPlayList: []
      // 默认进入加载的top榜单列表
      // firstToplist: []
    }
  },
  created () {
    this.getToplist()
    this.getFirstTop()
  },
  mounted () {
    this.recoverAudio(true)
  },
  methods: {
    // 获取排行榜信息
    async getToplist () {
      let res = await this.$axios.get('http://localhost:3000/toplist')
      // console.log(res.data)
      this.toplist = res.data.list
    },
    step (i) {
      return i++
    },
    // 获取榜单中的信息
    async getTopDetail (id) {
      // console.log(id)
      this.topId = id
      this.mainUrl = this.toplist[id].coverImgUrl
      let lis = document.querySelectorAll('li')
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = '#f9f9f9'
      }
      lis[id].style.backgroundColor = '#e6e6e6'
      // 请求点击榜单中的具体歌曲信息并进行渲染
      let res = await this.$axios.get('http://localhost:3000/top/list?idx=' + this.topId)
      // console.log(res)
      this.topPlayList = res.data.playlist.tracks
      // console.log(this.topPlayList)
      // 计算歌曲的时间
      for (let i = 0; i < this.topPlayList.length; i++) {
        let min = parseInt(this.topPlayList[i].dt / 1000 / 60)
        let sec = parseInt(this.topPlayList[i].dt / 1000 % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.topPlayList[i].dt = min + ':' + sec
      }
    },
    // 请求第一个默认榜单的数据
    async getFirstTop () {
      let res = await this.$axios.get('http://localhost:3000/top/list?idx=0')
      // this.firstToplist = res.data.playlist.tracks
      // let arr = []
      if (this.topPlayList.length === 0) {
        this.topPlayList = res.data.playlist.tracks
        for (let i = 0; i < this.topPlayList.length; i++) {
          let min = parseInt(this.topPlayList[i].dt / 1000 / 60)
          let sec = parseInt(this.topPlayList[i].dt / 1000 % 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          this.topPlayList[i].dt = min + ':' + sec
        }
      }
    },
    // 点击播放榜单列表中的歌曲
    playTopMusic (row) {
      let id = row.id
      let singer = row.ar[0].name
      let songName = row.name
      this.url = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      this.$emit('getUrl', this.url)
      // this.$router.go(-1)
      // 跳转歌词页面,榜单歌曲播放暂且不跳转了
      this.$router.push('/lyric?id=' + id + '&singer=' + singer + '&songName=' + songName)
    }
  }
}
</script>

<style>
.top-all{
  width: 100%;
  height: 1000px;
  display: flex;
}
  .top-aside {
    width: 240px;
    height: 100%;
    background-color:#f9f9f9;

  }
  .top-main {
    flex:1;
    /* background-color: red; */
  }
  .top-main-up {
    width: 100%;
    height: 200px;
    /* background-color: yellow; */
    position: relative;
  }
  .top-main-up>img {
    position: absolute;
    left: 40px;
    top: 25px;
    width: 150px;
    height: 150px;
  }
  .top-main-title {
    position: absolute;
    left: 250px;
    top: 55px;
    font-size: 25px;
    font-style: oblique;
  }
  .top-main-smallTitle {
    position: absolute;
    left: 300px;
    top: 100px;
    font-size: 25px;
    font-style: oblique;
  }

  .top-main-down {
    width: 100%;
    height: 100%;
    /* background-color:green; */
  }
  .top-allTitle {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    margin: 2px 3px;
    font-style: oblique;
  }
  ul {
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
  }
  ul>li {
    position: relative;
    font-size: 12px;
    margin-top: 20px;
  }
  ul>li>div:hover {
    background-color: #e6e6e6;
    cursor: pointer;
    height: 40px;

  }
  .top-every {
    padding-left: 20px;

  }
  ul>li>div>img {
    width: 40px;
    height:100%;

  }

  .top-updata {
    position: absolute;
    bottom: 0;
    margin-left: 50px;
    bottom: 2px;
  }
  .top-name {
    position: absolute;
    top: 0;
    margin-left: 50px;
  }
  </style>
