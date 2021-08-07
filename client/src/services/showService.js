import http from "./httpService"
import { apiUrl } from "../config.json"

const apiEndpoint = apiUrl + "/shows"

export async function getShowInfo(showId) {
  return http.get(`${apiEndpoint}/showInfo/${showId}`)
}