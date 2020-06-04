import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Mid: 0,
    recommendMusicList: [],
    t: true
  },
  mutations: {
    // 上一首-1
    upsong (state) {
      state.Mid -= 1
    },
    // 下一首
    downsong (state) {
      state.Mid += 1
    },
    // 保存当前点击的歌曲盒子id
    save (state, num) {
      state.Mid = num
      // state.recommendMusicList = list
    },
    save1 (state, list) {
      state.recommendMusicList = list
    },
    // mid = 0上一首
    ret (state) {
      state.Mid = 0
    },
    // 下一首
    next (state) {
      state.Mid = 9
    }
  },
  actions: {}
})
