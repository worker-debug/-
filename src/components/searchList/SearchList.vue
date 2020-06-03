<template>
  <div class="list">
    <h2>{{$route.query.key}}<span>共找到{{this.songsData.length}}首相关歌曲</span></h2>

    <el-table
    @row-click='playMusic'
    :data="songsData"
    height="440px"
    border
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column
      prop="artists[0].name"
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
      prop="album.name"
      label="专辑">
    </el-table-column>
    <el-table-column
      prop="duration"
      label="时长">
    </el-table-column>
    </el-table>
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
      songsData: [],
      url: ''
    }
  },

  created () {
    this.searchMusic()
  },
  mounted () {
    this.recoverAudio(true)
  },
  methods: {
    // 搜索结果
    async searchMusic () {
      let res = await this.$axios.get('http://localhost:3000/search?keywords=' + this.$route.query.key)
      this.songsData = res.data.result.songs
      // 计算歌曲的时间
      for (let i = 0; i < this.songsData.length; i++) {
        let min = parseInt(this.songsData[i].duration / 1000 / 60)
        let sec = parseInt(this.songsData[i].duration / 1000 % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.songsData[i].duration = min + ':' + sec
      }
    },
    // 播放歌曲,传递歌曲id
    playMusic (row) {
      // console.log(row)
      let singer = row.artists[0].name
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
  .list {
    max-height: 495px;
    background-color: #fff;
  }
  h2 {
    color: cadetblue;
    margin: 10px 0 10px 10px;
    background-color: #fff;
  }
  span {
    font-size: 10px;
    margin-left: 20px;
    color: darkgrey;
  }

</style>
