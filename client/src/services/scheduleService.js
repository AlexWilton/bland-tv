import http from "./httpService"
import { apiUrl } from "../config.json"

const apiEndpoint = apiUrl + "/schedule"

export async function getTodaysSchedule() {
  return http.get(`${apiEndpoint}/scheduleToday`)
}