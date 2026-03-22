import StatsAndFilter from '@/components/StatsAndFilter'
import { Header } from '@/components/Header'
import AddTask from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import React, { useState, useEffect } from 'react'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import api from '@/lib/axious'
import { visibleTaskLimit } from '@/lib/Data'

const HomePage = () => {

    const [taskBuffer, setTaskBuffer] = useState([])
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);



    const fetchTasks = async () => {
        try {
            const res = await api.get(`/task?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompletedTaskCount(res.data.completedCount);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again later.');
        }
    }

    const handleTaskChange = () => {
        fetchTasks();
    }

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active';
            case 'completed':
                return task.status === 'completed';
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasks.slice((page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTasks.length === 0) {
        handlePrev
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);






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
                    <AddTask handleNewTaskAdded={handleTaskChange} />
                    <TaskList filteredTasks={filteredTasks} filter={filter} handleTaskChange={handleTaskChange} />
                    <StatsAndFilter
                        filter={filter}
                        setFilter={setFilter}

                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completedTaskCount}
                    />

                    <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completedTaskCount}
                    />
                </div>
            </div>
        </div>




    )
}

export default HomePage