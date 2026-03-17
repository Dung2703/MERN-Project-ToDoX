import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
    return <>
        {completedTasksCount + activeTasksCount > 0 && (
            <div className="text-center">
                <p className='text-sm text-muted-foreground'>
                    {completedTasksCount > 0 && (
                        <>
                            You have completed {completedTasksCount} task
                            {
                                activeTasksCount > 0 && `, need to complete ${activeTasksCount} more.`
                            }
                        </>
                    )}
                    {completedTasksCount === 0 && activeTasksCount > 0 && (
                        <>
                            Start working on your tasks! You have {activeTasksCount} active taskto complete.

                        </>

                    )}
                </p>
            </div>
        )}
    </>
}

export default Footer