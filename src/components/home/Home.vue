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
          <audio :src="musicUrl" controls loop><span class="audioLyric">歌词</span></audio>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
// import lyric from '../lyric/Lyric'
// import lyrics from '../../js/lyrics'
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
  watch: {

  },
  methods: {
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
        myaudio.setAttribute('hidden', true)
        // myaudio.hidden = 'hidden'
      } else {
        myaudio.removeAttribute('hidden')
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
    returnLyric () {
      this.$router.push('/lyric')
    },
    // 跳转歌单页面
    songmenu () {
      this.$router.push('/songmenu')
    },
    // 跳转歌手页面
    singer () {
      this.$router.push('/singer')
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
  width: 500px;
  height: 40px;
  border-style: groove;
  margin: 10px 0;
  flex: 1;
}
.audioLyric {
  /* background-color: red; */
  text-align: center;
  line-height: 60px;
  border: 2px solid black;
}

</style>
