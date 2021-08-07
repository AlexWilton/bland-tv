import React, {useState, useEffect, useCallback, useMemo} from 'react'
import { getTodaysSchedule } from "../services/scheduleService"
import { getShowInfo } from "../services/showService"

export const BlandDataContext = React.createContext(null)
BlandDataContext.displayName = 'Bland Data Hook'

export const BlandDataProvider = ({ children }) => {
    const [schedule, setSchedule] = useState(null)
    const [shows, setShows] = useState({})
    
    const getSchudule = useCallback(async () => {
        if (schedule == null) {
            return await refreshAndGetSchedule()
        }
        return schedule
    }, [schedule])

    const refreshAndGetSchedule = useCallback(async () => {
        const schedule = (await getTodaysSchedule()).data.result
        setSchedule(schedule)
        return schedule
    }, [schedule])

    const getShow = useCallback(async (showId) => {
        if (!shows[showId]) {
            return await refreshAndGetShow(showId)
        }
        return shows[showId]
    }, [shows])

    const refreshAndGetShow = useCallback(async (showId) => {
        const show = (await getShowInfo(showId)).data.result
        console.log(show)
        setShows({...shows, showId: show})
        return show
    }, [shows])


    const values = useMemo(() => ({
        getSchudule,
        refreshAndGetSchedule,
        getShow,
        refreshAndGetShow,
    }), [getSchudule, refreshAndGetSchedule, getShow, refreshAndGetShow])

    return <BlandDataContext.Provider value={values}>{children}</BlandDataContext.Provider>
}


export default function useBlandData() {
  const context = React.useContext(BlandDataContext)

  if (context === undefined) {
    throw new Error('`useBlandData` hook must be used within a `Provider` component')
  }

  return context
}

