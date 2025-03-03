import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { type FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length === 0) {
            return
        }

        await api.post('habits', {
            title,
            weekDays,
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    function handleToggleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithoutRemovedDay = weekDays.filter(day => day !== weekDay )

            setWeekDays(weekDaysWithoutRemovedDay)
        } else {
            const weekDaysWithAddedDay = [...weekDays, weekDay]

            setWeekDays(weekDaysWithAddedDay)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input 
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                // biome-ignore lint/a11y/noAutofocus: <explanation>
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>



            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay, index) => {
                    return (
                    <Checkbox.Root
                        key={weekDay}
                        className="flex items-center gap-3 group"
                        checked={weekDays.includes(index)}
                        onCheckedChange={() => {
                            handleToggleWeekDay(index)
                        }}
                    >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-data-[state=checked]:animate-fadeIn">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white"/>
                            </Checkbox.Indicator>
                        </div>
    
                        <span className="text-white leading-tight">
                            {weekDay}
                        </span>
                    </Checkbox.Root>
                    )
                })}
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>

    )
}