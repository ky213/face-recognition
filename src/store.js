import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tracking: null,
    recognizing: null,
    enrollNewFace: false,
    picture:null,
    trackedFaces: null,
    recognizedFace: "",
    pictureData:null,
    boundingBox: {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },
  getters: {
    coordinates(state) {
      return {
        width: state.boundingBox.width + "px",
        height: state.boundingBox.height + "px",
        top: state.boundingBox.top + "px",
        left: state.boundingBox.left + "px"
      };
    }
  },
  mutations: {
    positionBoundingBox(state, position) {
      state.boundingBox.width = position.width || 0;
      state.boundingBox.height = position.height + 20 || 0;
      state.boundingBox.top = position.y || 0;
      state.boundingBox.left = position.x || 0;
    },
    toggleState(state, changes) {
      for (const change in changes) {
        state[change] = changes[change];
      }
    }
  },
  actions: {}
});
