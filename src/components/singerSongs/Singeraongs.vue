<template>
  <div>
    <div class="ss-up">
      <div class="ss-singer">{{this.singerSongList[0].ar[0].name}}<i class="el-icon-info"></i></div>
      <div class="ss-dec" style="text-indent:2em">简介:{{this.SingerSong}}</div>
    </div>
    <div class="ss-title">热门单曲50首</div>
    <div class="ss-fengexian"></div>
    <!-- 歌曲列表 -->
    <div class="ss-down">
      <el-table
      @cell-click="playSsMusic"
       :data="singerSongList"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="name"
        label="歌曲"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        width="180">
      </el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑">
      </el-table-column>
      <el-table-column
        prop="dt"
        label="时长">
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      singerId: '',
      singerSongList: [],
      SingerSong: ''
    }
  },
  created () {
    this.getSingerSong()
    this.getSingerDesc()
  },
  methods: {
    async getSingerSong () {
      this.singerId = this.$route.query.SID
      let res = await this.$axios.get('http://localhost:3000/artist/top/song?id=' + this.singerId)
      // console.log(res)
      this.singerSongList = res.data.songs
      for (let i = 0; i < this.singerSongList.length; i++) {
        let min = parseInt(this.singerSongList[i].dt / 1000 / 60)
        let sec = parseInt(this.singerSongList[i].dt / 1000 % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.singerSongList[i].dt = min + ':' + sec
      }
    },
    // 获取歌手描述
    async getSingerDesc () {
      let res = await this.$axios.get('http://localhost:3000/artist/desc?id=' + this.singerId)
      console.log(res)
      this.SingerSong = res.data.briefDesc
    },
    // 播放当前点击的音乐
    playSsMusic (row) {
      let singer = row.ar[0].name
      let songName = row.name
      let id = row.id
      this.url = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      this.$emit('getUrl', this.url)
      // this.$router.go(-1)
      // 跳转歌词页面
      this.$router.push('/lyric?id=' + id + '&singer=' + singer + '&songName=' + songName)
    }
  }
}
</script>

<style>
.ss-up {
  height: 200px;
  background-color: rgb(218, 204, 204);
  padding-top: 15px;
}
.ss-fengexian {
  height: 2px;
  background-color: #c20c0c;
}
.ss-title {
  font-size: 18px;
  margin: 2px 0 4px 3px;
}
.ss-singer {
  font-size: 32px;
  font-style: oblique;
  margin: 0px 0 0 50px;
}
  .ss-dec {
    width: 800px;
    height: 105px;
    overflow: hidden;
    transition:all .6s ease-in-out;
    -webkit-transition:all .6s ease-in-out;
    -moz-transition:all .6s ease-in-out;
    -o-transition:all .6s ease-in-out;
    -ms-transition:all .6s ease-in-out;
    /* background-color: orange; */
    position: relative;
    margin-left: 50px;
    font-style: oblique;
  }
  .ss-dec::after {
    content: '∨';
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: -20px;
    /* background-color: red; */
    font-size: 18px;
    color: blue;
    font-weight: 700;
  }
  .ss-dec:hover {
     height: 150px;
     /* background-color: rgb(174, 182, 192); */
  }
  .ss-dec:hover::after {
    content: '∧'
  }
  .el-icon-info {
    font-size: 14px;
    margin-left: 8px;
  }
</style>
