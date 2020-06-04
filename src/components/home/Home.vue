<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="70px">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <img src="../../assets/css/logo.png" alt="" /></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple-light a" @click="recom">推荐</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple a" @click="toplist">排行榜</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple-light a" @click="songmenu">精品歌单</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple-light a" @click="singer">热门歌手</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple b">
            <div id="test">
              <i class="el-icon-search"></i>
            <input
              type="text"
              placeholder="查找你喜欢的音乐/歌手"
              v-model="searchData"
              @keyup.enter="search"

            /></div></div
        ></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边区域 -->
      <el-aside width="200px" class="aside-cebian">暂且空着</el-aside>
      <el-container>
        <!-- 主体区域 -->
        <el-main>
          <router-view @getUrl='getUrl' :recoverAudio='recoverAudio' :curtime='curTime'></router-view>
          <!-- <SearchList></SearchList> -->
        </el-main>
        <!-- 底部区域 -->
        <el-footer>
          <div class="div-audio">
          <audio :src="musicUrl" controls loop autoplay></audio>
          <button>
          <i class="el-icon-caret-left" @click="upsongs"></i>
          </button>
          <button>
          <i class="el-icon-caret-right" @click="downsongs"></i>
          </button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
// import lyric from '../lyric/Lyric'
// import lyrics from '../../js/lyrics'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      searchData: '',
      songsData: [],
      musicUrl: ''
      // curTime: ''
      // mvUrl: ''
    }
  },

  created () {
    this.getUrl()
  },
  mounted () {
    this.recoverAudio(true)
    // console.log(this.$route.path)
  },
  computed: {
    ...mapState(['Mid'])
  },
  methods: {
    ...mapMutations(['upsong', 'downsong', 'ret', 'next']),
    // 跳转查询歌曲列表页
    search () {
      if (this.searchData === '') {
        this.$message({
          message: '请输入具体的内容',
          type: 'warning'
        })
      } else {
        this.$router.push('/searchList?key=' + this.searchData)
      }
    },
    // 获取当前点击的URL
    getUrl (address) {
      // console.log(address)
      this.musicUrl = address
      // this.mvUrl = address
      // console.log(this.mvUrl)
    },
    // 跳转推荐页面
    recom () {
      this.$router.push('./recommend')
    },
    // 跳转歌曲排行榜页面
    toplist () {
      this.$router.push('./toplist')
    },
    // 操作audio标签
    recoverAudio (onOff) {
      let myaudio = document.querySelector('audio')
      // 隐藏播放按钮audio
      myaudio.volume = 0.5
      if (this.$route.path === '/lyric') {
        myaudio.parentNode.className = 'div-audio hidd'
        // myaudio.hidden = 'hidden'
      } else {
        myaudio.parentNode.className = 'div-audio'
      }
      // myaudio.play()
      // let onOff = true
      if (onOff) {
        myaudio.play()
      } else {
        myaudio.pause()
        // onOff = true
      }
      // 监听歌曲播放时间
      myaudio.addEventListener('timeupdate', () => {
        let curTime = parseInt(myaudio.currentTime)
        this.curTime = curTime
        // lyrics.curTime = curTime
        // console.log(this.curTime)
        let op = document.getElementsByTagName('p')
        // let divs = op[0].parentNode
        // divs.style.top = '-100px'

        // let divs = document.getElementsByClassName('lyric')
        // let num = 1
        if (document.getElementById(curTime)) {
          for (let i = 0; i < op.length; i++) {
            op[i].style.color = 'black'
            op[i].style.display = 'none'
          }
          document.getElementById(curTime).style.color = 'skyblue'
          document.getElementById(curTime).style.display = 'block'
          // num++
        }
      })
      // console.log('audio')
    },
    // 点击歌词跳转歌词页面
    lyrPage () {
      this.$router.push('/lyric')
    },
    // 跳转歌单页面
    songmenu () {
      this.$router.push('/songmenu')
    },
    // 跳转歌手页面
    singer () {
      this.$router.push('/singer')
    },
    // 播放上一首歌
    upsongs () {
      if (this.$store.state.Mid > 0) {
        this.upsong()
        let id = this.$store.state.Mid
        // console.log(id)
        let recommendMusicList = this.$store.state.recommendMusicList
        // let singer = recommendMusicList[id].song.artists[0].name
        // let songName = recommendMusicList[id].name
        let recommendMusicId = recommendMusicList[id].id
        this.musicUrl = 'https://music.163.com/song/media/outer/url?id=' + recommendMusicId + '.mp3'
      } else {
        this.ret()
      }
    },
    // 播放下一首
    downsongs () {
      if (this.$store.state.Mid < this.$store.state.recommendMusicList.length - 1) {
        this.downsong()
        let id = this.$store.state.Mid
        let recommendMusicList = this.$store.state.recommendMusicList
        let recommendMusicId = recommendMusicList[id].id
        this.musicUrl = 'https://music.163.com/song/media/outer/url?id=' + recommendMusicId + '.mp3'
      } else {
        this.next()
      }
    }

  }
}
</script>

<style>
.el-container {
  height: 100%;
  min-width: 900px;
  position: relative;
}
.el-header {
  background-color: #242424;
}
.el-header .a {
  color: azure;
  text-align: center;
  line-height: 70px;
}
.el-header .b {
  margin: 20px auto;
}
#test {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 30px;
  padding-left: 5px;
}

.el-header .b input {
  width: 65%;
  height: 30px;
  border: none;
  outline: none;
}

.el-header .a:hover {
  background-color: #000000;
}
.aside-cebian {
  background-color: blue;
  /* background: url('../../assets/css/02.jpg'); */
  /* height: 555px; */
  background-image: url('../../assets/css/01740558facf44a8012160f705a51b.gif') ;
}
.el-main {
  /* background: yellow; */
  padding: 0;
  margin: 0;
  /* background: url('../../assets/css/02.jpg') no-repeat; */
  background-size: 1166px 500px;
}
.el-footer {
  width: 100%;
  /* background: url('../../assets/css/big.jpg'); */
  background-color: #dffceb;
  position: absolute;
  bottom: 0px;
  right: 0;
  height: 30px;
  display: flex;
}
.el-footer audio {
  width: 950px;
  height: 40px;
  /* border-style: groove; */
  margin: 10px 0;
  /* flex: 1; */
}

.div-audio {
  width: 100%;
  height: 60px;
  /* background-color: red; */
  position: relative;
  /* display: none; */
}
.hidd {
  display: none;
}
.div-audio i {
  position: absolute;
  font-size: 40px;
  top: 10px;
}
.div-audio i:hover {
  cursor: pointer;
}
.el-icon-caret-right {
  margin-left: 60px;
}
.el-icon-caret-left {
  margin-left: 10px;
}
</style>
