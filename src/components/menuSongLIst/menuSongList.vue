<template>
<div>
  <div class="menu-up">
    <div class="menu-up-left"><img :src="info.coverImgUrl" alt=""></div>
    <div class="menu-up-right">
      <div class="right-info-name">{{info.name}}</div>
      <div class="right-info-img"><img :src="info.creator.avatarUrl" alt="">{{info.creator.nickname}}</div>
      <div class="right-info-dec">介绍：{{info.description}}</div>
    </div>
  </div>
  <div class="menu-down">
    <div class="down-list">歌曲列表</div>
    <div class="down-fengexian"></div>
    <div class="down-song">
      <el-table
        @row-click='playMenuMusic'
        :data="ThisMenuSongList"
        height="700px"
        border
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
          width="200">
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
</div>
</template>

<script>
export default {
  data () {
    return {
      ThisMenuSongList: [],
      info: ''
      // coverImgUrl: ''
    }
  },
  created () {
    this.getThisMenuSong()
  },
  mounted () {

  },
  methods: {
    // 获取对应歌单中的所有歌曲
    async getThisMenuSong () {
      // console.log(this.$route.query.id)
      let res = await this.$axios.get('http://localhost:3000/playlist/detail?id=' + this.$route.query.id)
      console.log(res)
      this.ThisMenuSongList = res.data.playlist.tracks
      // this.coverImgUrl = res.data.playlist.coverImgUrl
      this.info = res.data.playlist
      // 计算歌曲的时间
      for (let i = 0; i < this.ThisMenuSongList.length; i++) {
        let min = parseInt(this.ThisMenuSongList[i].dt / 1000 / 60)
        let sec = parseInt(this.ThisMenuSongList[i].dt / 1000 % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.ThisMenuSongList[i].dt = min + ':' + sec
      }
    },
    // 点击播放歌单中的歌曲
    playMenuMusic (row) {
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
.menu-up {
  width: 100%;
  height: 200px;
  /* background-color: red; */
  display: flex;
}
.menu-down {
  width: 100%;
  height: 100%;
  /* background-color: green; */
}
.menu-up-left {
  width: 150px;
  height: 150px;
  background-color: yellow;
  margin: 25px 0 25px 50px;
}
.menu-up-left>img {
  width: 150px;
  height: 150px;
}
.menu-up-right {
  height: 150px;
  flex: 1;
  /* background-color: blue; */
  margin-top: 25px;
  margin-left: 50px;
  font-size: 18px;
  font-style: oblique;
}
.menu-up-right img {
  width: 20px;
  height: 20px;
}
.right-info-name {
  font-size: 18px;

}
.right-info-img {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 30px;
}
.right-info-dec {
    width: 500px;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 60px;
}
.down-fengexian {
  background-color: #c20c0c;
  height: 2px;
  margin-top: 5px;
}

</style>
