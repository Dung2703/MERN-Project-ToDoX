import { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { CheckCircle2, Circle, Calendar, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axious';



const TaskCard = ({ task, index, handleTaskChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/task/${taskId}`);
            toast.success('Task deleted successfully!');
            handleTaskChange();
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task. Please try again.');
        }
    }
    const updateTask = async () => {
        try {
            setIsEditing(false);
            await api.put(`/task/${task._id}`, { title: updateTaskTitle });
            toast.success('Task updated successfully!');
            handleTaskChange();
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again.');
        }
    }
    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/task/${task._id}`, {
                    status: "completed",
                    completedAt: new Date().toISOString()
                });
                toast.success(`${task.title} finished successfully!`);
            } else {
                await api.put(`/task/${task._id}`, {
                    status: "active",
                    completedAt: null
                });
                toast.success(`${task.title} marked as active!`);
            }
            handleTaskChange();
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Failed to update task status. Please try again.');
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updateTask();
        }
    }
    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "completed" && "opacity-75"
        )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center gap-4">
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 rouded-full transition-all duration-200",
                        task.status === "completed" ? "text-success hover:text-success/80" :
                            "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === "completed" ? (
                        <CheckCircle2 className='size-5' />
                    ) : (
                        <Circle className='size-5' />
                    )}
                </Button>
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder='Edit task title'
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(event) => setUpdateTaskTitle(event.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === "completed" ?
                                "line-through text-muted-foreground" :
                                "text-foreground"
                        )}
                        >
                            {task.title}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    <Button
                        onClick={() => {
                            setIsEditing(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                        variant='ghost'
                        size='icon'
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info">
                        <SquarePen className='size-4' />
                    </Button>
                    <Button
                        onClick={() => deleteTask(task._id)}
                        variant='ghost'
                        size='icon'
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className='size-4' />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard