import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const GetInfo = (userRole: string, username: string) => {
    const config = { // set headers
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
    }
    return axios //  axios request to backend
        .get(`${baseUrl}/${userRole}/myInfo/${username}`, config)
        .then(response => response.data) // return the user information

}

const GetAgents = () => {
    const config = { // set headers
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }
    return axios
        .get(`${baseUrl}/Supervisor/agents`, config)
        .then(response => response.data);
};

const GetQueueMetrics = () => {
    const config = { // set headers
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }
    return axios
        .get(`${baseUrl}/Supervisor/metrics`, config)
        .then(response => response.data);
}

export default {
    GetInfo,
    GetAgents,
    GetQueueMetrics
}