import axios from "axios";


axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {

  if(!refresh && error.response.status === 401) {
    refresh = true;
    const response = await axios.post('refresh');
    if(response.status === 201) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axios(error.config);
    }
  }
  refresh = false;

  return Promise.reject(error);
});
