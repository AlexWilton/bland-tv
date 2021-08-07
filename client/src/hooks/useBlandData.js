import React, {useState, useEffect, useCallback, useMemo} from 'react'
import { getTodaysSchedule } from "../services/scheduleService"

export const BlandDataContext = React.createContext(null)
BlandDataContext.displayName = 'Bland Data Hook'

export const BlandDataProvider = ({ children }) => {
    const [schedule, setSchedule] = useState(null)
    
    const getSchudule = useCallback(async () => {
        if (schedule == null) {
            return await refreshAndGetSchedule()
        }
        return schedule
    }, [schedule])

    const refreshAndGetSchedule = useCallback(async () => {
        const schedule = (await getTodaysSchedule()).data.result
        console.log(schedule)
        setSchedule(schedule)
        return schedule
    }, [schedule])


    const values = useMemo(() => ({
        getSchudule,
        refreshAndGetSchedule,
    }), [getSchudule, refreshAndGetSchedule])

    return <BlandDataContext.Provider value={values}>{children}</BlandDataContext.Provider>
}


export default function useBlandData() {
  const context = React.useContext(BlandDataContext)

  if (context === undefined) {
    throw new Error('`useBlandData` hook must be used within a `Provider` component')
  }

  return context
}

