import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
    return (
        <Card
            className="p-8 border-0 bg-gradient-card shadow-custom-md text-center"
        >
            <div className='space-y-3'>
                <Circle className='size-12 mx-auto text-muted-foreground' />
            </div>
            <h3 className='font-medium text-foreground'>
                {
                    filter === 'active' ?
                        'No active tasks yet. Start by adding a new task!' :
                        filter === 'completed' ?
                            'No completed tasks yet.'
                            : 'No tasks yet. Add a task to get started!'
                }
            </h3>
            <p className='text-sm text-muted-foreground'>
                {
                    filter === 'all'
                        ? "add first task"
                        : `try changing the filter ${filter === 'active' ? 'finish' : 'on doing'}`
                }
            </p>

        </Card>
    )
}

export default TaskEmptyState