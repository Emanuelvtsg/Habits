import { Text, View, ScrollView } from "react-native";

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'


import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesfromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesfromYearStart.length;

const firstDayOfYear = dayjs().startOf('year')
const amountOfDaysTillFirstDayOfYear =  firstDayOfYear.day()

export function Home(){

    const { navigate } = useNavigation();

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text 
                            key={'${weekday}-${i}'}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE}}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom:100 }}
            >
                <View className="flex-row flex-wrap">

                     {
                        amountOfDaysTillFirstDayOfYear > 0 && Array
                        .from({ length: amountOfDaysTillFirstDayOfYear })
                        .map((_, index) => (
                            <View
                                key={index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width: DAY_SIZE, height: DAY_SIZE}}
                            />
                        ))
                    }

                    {   
                        datesfromYearStart.map(date =>(
                            <HabitDay
                                key={date.toISOString()}
                                onPress={() => navigate('habit', { date: date.toISOString() })}
                            />
                        ))
                    }

                    {
                        amountOfDaysToFill > 0 && Array
                        .from({ length: amountOfDaysToFill })
                        .map((_, index) => (
                            <View
                                key={index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width: DAY_SIZE, height: DAY_SIZE}}
                            />
                        ))
                    }
                </View>

            </ScrollView>

            
        </View>
    )
    
}