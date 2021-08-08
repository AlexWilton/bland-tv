import React, {useState, useCallback, useMemo} from 'react'
import { getTodaysSchedule } from "../services/scheduleService"
import { getShowInfo } from "../services/showService"

export const BlandDataContext = React.createContext(null)
BlandDataContext.displayName = 'Bland Data Hook'

export const BlandDataProvider = ({ children }) => {
    const [schedule, setSchedule] = useState(null)
    const [shows, setShows] = useState({})

    const refreshAndGetSchedule = useCallback(async () => {
        const schedule = (await getTodaysSchedule()).data.result
        setSchedule(schedule)
        return schedule
    }, [])
    
    const getSchedule = useCallback(async () => {
        if (schedule == null) {
            return await refreshAndGetSchedule()
        }
        return schedule
    }, [schedule,refreshAndGetSchedule])

    const refreshAndGetShow = useCallback(async (showId) => {
        const show = (await getShowInfo(showId)).data
        const updatedShows = shows
        updatedShows[showId] = show
        setShows(updatedShows)
        return show
    }, [shows])

    const getShow = useCallback(async (showId) => {
        if (!shows[showId]) {
            return await refreshAndGetShow(showId)
        }
        return shows[showId]
    }, [shows, refreshAndGetShow])

    const values = useMemo(() => ({
        getSchedule,
        refreshAndGetSchedule,
        getShow,
        refreshAndGetShow,
    }), [getSchedule, refreshAndGetSchedule, getShow, refreshAndGetShow])

    return <BlandDataContext.Provider value={values}>{children}</BlandDataContext.Provider>
}


export default function useBlandData() {
  const context = React.useContext(BlandDataContext)

  if (context === undefined) {
    throw new Error('`useBlandData` hook must be used within a `Provider` component')
  }

  return context
}

