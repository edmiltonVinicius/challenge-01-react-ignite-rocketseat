import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')

    function handleCreateNewTask() {
        const title = newTaskTitle
        const id = Math.round(Math.random() * 550 / 5) * 5 + 5

        const newTask = { 
            id, 
            title, 
            isComplete: false
        }
        
        setTasks([...tasks, newTask])

        const input = document.querySelector('.task-list > header > .input-group > input')
        if(input) {
            (input as HTMLInputElement).value = ''
        }
    }

    function handleToggleTaskCompletion(id: number) {
        const tasksUpdated = tasks.map(task => {
            if(task.id === id) {
                task.isComplete = task.isComplete === true ? false : true
                return task
            }
            return task
        })

        setTasks(tasksUpdated)
    }

    function handleRemoveTask(id: number) {
        const tasksUpdated = tasks.filter(task => task.id !== id)

        setTasks(tasksUpdated)
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Adicionar novo todo"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} id={task.id.toString()}>
                            <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() => handleToggleTaskCompletion(task.id)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}

                </ul>
            </main>
        </section>
    )
}