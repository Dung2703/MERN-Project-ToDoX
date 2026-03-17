import StatsAndFilter from '@/components/StatsAndFilter'
import { Header } from '@/components/Header'
import AddTask from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import React from 'react'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Teal Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)
      `,
                    backgroundSize: "100% 100%",
                }}
            />
            {/* Your Content/Components */}
            <div className='container pt-8 mx-auto relative z-10'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                    <Header />
                    <AddTask />
                    <TaskList />
                    <StatsAndFilter />

                    <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>




    )
}

export default HomePage