import { Task, TaskOptions } from "../models/Task";
import { today } from "../utils/Validators";

const tasks: Task[] = []; // Array principal donde se guardan las tareas

const sortTasksByTitle = (tasks: Task[]): Task[] => {
    const result = [...tasks]; // Copiamos el array original
    const n = result.length; // Tamaño del array

    for (let i = 0; i < n - 1; i++)
    {
        let minIndex = i;

        for (let j = i + 1; j < n; j++)
        {
            // Comparar alfabéticamente los títulos
            if (result[j].title.toLowerCase() < result[minIndex].title.toLowerCase())
            {
                minIndex = j;
            }
        }

        // Intercambio
        if (minIndex !== i)
        {
            const temp = result[i]; // Variable auxiliar
            result[i] = result[minIndex];
            result[minIndex] = temp;
        }
    }
    return result;
}

export const getDifficulty = (difficulty: number): string => {
    switch(difficulty)
    {
        case 1:
            return "★☆☆";
        case 2:
            return "★★☆";
        case 3:
            return "★★★";
        default:
            return "ERROR";
    }
}

export const getFilteredTasks = (status: string, tasks: Task[]): Task[] => {
    const result: Task[] = []; // Array de tareas encontradas con la petición
    
    for(let i = 0; i < tasks.length; i++)
    {
        // Si el estado de la tarea por la que se está iterando coincide con nuestra petición, entra al if y se agrega esa tarea al array "result"
        if (tasks[i].status === status)
        {
            result.push(tasks[i]);
        }
    }
    return result; // Devuelve el array "result"
}

export const getStatus = (status: string): string => {
    switch(status.toUpperCase())
    {
        case 'P':
            return "Pendiente";
        case 'E':
            return "En curso";
        case 'T':
            return "Terminada";
        case 'C':
            return "Cancelada";
        default:
            return "ERROR";
    }
}

export const getTasks = (): Task[] => tasks; // Función que devuelve el array de tareas

export const getTaskIndexByTitle = (tasks: Task[], title: string): number => {
    for (let i = 0; i < tasks.length; i++)
    {
        if (tasks[i].title === title)
        {
            return i; // Devolvemos el índice cuando coincida
        }
    }
    return -1; // Si no se encuentra
}

export const taskService: TaskOptions = {
    addTask: (task: Task) => {
        const now = today(); // Obtener la fecha actual en el momento de creación
        tasks.push({ ...task, creation: now, lastEdition: now }); // Agregar tarea nueva al array "tasks"
        sortTasksByTitle(tasks) // Ordenar alfabéticamente cada tarea por título al agregar una nueva
    }
};