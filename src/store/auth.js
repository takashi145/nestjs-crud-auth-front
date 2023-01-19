import { defineStore } from 'pinia'
import axios from 'axios';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async me() {
      try {
        const res = await axios.get('/user');
        this.authUser = res.data;
      }catch(e) {
        this.authUser = null;
        console.log(e);
      }
    }
  }
})