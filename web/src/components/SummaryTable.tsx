import { HabitDay } from "./HabitDay"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts"
import { useEffect, useState } from "react"
import { api } from "../lib/axios.ts"
import dayjs from "dayjs"


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

const firstDayOfYear = dayjs().startOf('year')
const amountOfDaysTillFirstDayOfYear =  firstDayOfYear.day()

type Summary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return(
                        <div 
                            key={`${weekDay}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            i}`} 
                            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                        >
                        {weekDay}
                    </div>
                    )
                })}
            </div>
                

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    amountOfDaysTillFirstDayOfYear > 0 && Array
                    .from({ length: amountOfDaysTillFirstDayOfYear })
                    .map((_, i) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={i}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                            />
                    ))
                }
                
                {summaryDates.map(date => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (

                        <HabitDay
                            key={date.toString()}
                            amount={dayInSummary?.amount}
                            date={date}
                            completed={dayInSummary?.completed}
                        />
                    )
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <div key={i} 
                        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    )
}