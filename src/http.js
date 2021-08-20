import axios from 'axios'

const instance=axios.create({
    baseURL:"http://mockjs.docway.net/mock/1hWdPyYUfGCuser/",
    timeout:3000
})

export default instance;