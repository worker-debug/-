<template>
  <div class="lyric-head">
    <el-container class="cont-div">
      <el-aside width="400px"></el-aside>
      <el-main>
        <div class="songname"><span>{{$route.query.songName}}</span></div>
        <div class="singer"><span>{{$route.query.singer}}</span></div>
      </el-main>
    </el-container>
    <!-- 图片 -->
    <div class="imgRote">
      <div class="img-div"><img class='imgs'  src="../../assets/css/changpian-2.png" alt=""
      @click="playThisMusic"></div>
      <!-- 歌词区域 -->
      <div class="lyric-out">
        <!-- <div v-for="(item , index) in lyrics" :key="index" id=''></div> -->
      <div class="lyric"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import lyrics from '../../js/lyrics'
export default {
  props: {
    recoverAudio: {
      type: Function,
      default: null
    },
    curtime: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      lyrics: [],
      singer: '',
      songName: '',
      t: true
    }
  },

  created () {
    this.getLyric()
  },
  mounted () {
    this.hiddenPlayer()
    // console.log(this.$route.path)
  },
  // props: ['curtime'],
  methods: {
    // 请求当前歌曲的歌词
    async getLyric () {
      // 获取搜索页传递过来的歌曲id
      let id = this.$route.query.id
      // console.log(id)
      let res = await this.$axios.get('http://localhost:3000/lyric?id=' + id)
      // console.log(res)
      // console.log(this.lyric)
      // 处理歌词
      let div = document.querySelector('.lyric')
      let html = ''
      let lyrArr = res.data.lrc.lyric.split('[')
      for (let i = 0; i < lyrArr.length; i++) {
        let lyr = lyrArr[i].split(']')
        let allTimer = lyr[0].split('.')
        let time = allTimer[0].split(':')
        let curTimer = time[0] * 60 + time[1] * 1
        let text = lyr[1]
        if (text) {
          html += '<p id=' + curTimer + '>' + text + '</p>'
        }
      }
      div.innerHTML = html
      // lyrics.logo()
    },
    // 当前歌词页面隐藏播放器按钮，图片替代
    hiddenPlayer () {
      this.recoverAudio()
    },
    // 点击图片即可播放暂停
    playThisMusic () {
      let imgRote = document.querySelector('.imgs')
      // console.log(this.t)
      if (this.t) {
        this.recoverAudio(this.t)
        imgRote.className = 'rotate imgs'
        this.t = false
        // console.log(this.curTime)
      } else {
        this.recoverAudio(this.t)
        imgRote.className = 'imgs'
        this.t = true
      }
    }
  }
}
</script>

<style>
  .lyric-head {
    height: 100%;
    width: 100%;
  }
  .cont-div {
    height: 100px;
    background-color: #dffceb;
  }
 .rotate {
   animation: rot 5s linear infinite;
   transform-origin: center;
 }
 @keyframes rot {
   from{transform: rotate(0deg);}
   to{transform: rotate(360deg);}
 }
.imgRote {
  height: 400px;
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgRote img {
  width: 300px;
  height: 300px;
}
.songname {
  width: 100%;
  height: 50px;
  background-color: #dffceb;
  /* background-color: red; */
  text-align: center;
  line-height: 50px;
  /* font-size: 20px; */
  text-shadow: 2px 3px 1px rgba(157, 179, 179, 0.8);
  font-style: oblique;
}

.singer {
  width: 100%;
  height: 50px;
  background-color: #dffceb;
  text-align: center;
  line-height: 50px;
  /* font-size: 18px; */
   text-shadow: 2px 3px 1px rgba(157, 179, 179, 0.8);
   font-style: oblique;
}
span {
  font-size: 22px;
}

.lyric {
  width: 650px;
  height: 300px;
  margin-left: 90px;
  /* text-align: center; */
  background: url('../../assets/css/lyr.png') no-repeat;
  background-size: 600px  300px;
}

.lyric p {
  margin-top: 5px;
  display: none;
  position: absolute;
  top: 200px;
  left: 280px;
  font-size: 18px;
  font-style: oblique;
  /* color: aliceblue; */
  text-shadow: 2px 3px 1px rgba(157, 179, 179, 0.8);
}
.lyric-out {
  flex: 1;
  height: 405px;
  background-color: #dffceb;
  position: relative;
  overflow: hidden;
}
.img-div {
  width: 400px;
  height: 400px;
  background-color:#dffceb;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
