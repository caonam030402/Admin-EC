import axios, { type AxiosInstance } from 'axios'
import { config } from 'src/constants/config'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const http = new Http().instance
