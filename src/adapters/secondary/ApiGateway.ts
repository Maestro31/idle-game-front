import axios, { AxiosInstance } from 'axios'

export default class ApiGateway {
  constructor(private resource: string) {}

  protected client(): AxiosInstance {
    const authToken = localStorage.getItem('auth-token')

    return axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}/${this.resource}`,
      headers: { Authorization: `Bearer ${authToken}` },
    })
  }
}
