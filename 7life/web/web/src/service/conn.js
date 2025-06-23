import axios from "axios"
const ConnApi = axios.create({
    //IP LAB 5
    // baseURL: "http://10.67.23.26:3333"
    //IP LAB 6
    // baseURL: "http://10.67.23.44:3333"
    //LOCALHOST
    baseURL: "http://localhost:3333"
    //KINGHOST
    // baseURL: "http://7life.kinghost.net:21016/"

    
})
export default ConnApi