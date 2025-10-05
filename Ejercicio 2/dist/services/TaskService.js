"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.getTaskIndexByTitle = exports.getTasks = exports.getStatus = exports.getFilteredTasks = exports.getDifficulty = void 0;
const Validators_1 = require("../utils/Validators");
const tasks = []; // Array principal donde se guardan las tareas
const sortTasksByTitle = (tasks) => {
    const result = [...tasks]; // Copiamos el array original
    const n = result.length; // Tamaño del array
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            // Comparar alfabéticamente los títulos
            if (result[j].title.toLowerCase() < result[minIndex].title.toLowerCase()) {
                minIndex = j;
            }
        }
        // Intercambio
        if (minIndex !== i) {
            const temp = result[i]; // Variable auxiliar
            result[i] = result[minIndex];
            result[minIndex] = temp;
        }
    }
    return result;
};
const getDifficulty = (difficulty) => {
    switch (difficulty) {
        case 1:
            return "★☆☆";
        case 2:
            return "★★☆";
        case 3:
            return "★★★";
        default:
            return "ERROR";
    }
};
exports.getDifficulty = getDifficulty;
const getFilteredTasks = (status, tasks) => {
    const result = []; // Array de tareas encontradas con la petición
    for (let i = 0; i < tasks.length; i++) {
        // Si el estado de la tarea por la que se está iterando coincide con nuestra petición, entra al if y se agrega esa tarea al array "result"
        if (tasks[i].status === status) {
            result.push(tasks[i]);
        }
    }
    return result; // Devuelve el array "result"
};
exports.getFilteredTasks = getFilteredTasks;
const getStatus = (status) => {
    switch (status.toUpperCase()) {
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
};
exports.getStatus = getStatus;
const getTasks = () => tasks; // Función que devuelve el array de tareas
exports.getTasks = getTasks;
const getTaskIndexByTitle = (tasks, title) => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === title) {
            return i; // Devolvemos el índice cuando coincida
        }
    }
    return -1; // Si no se encuentra
};
exports.getTaskIndexByTitle = getTaskIndexByTitle;
exports.taskService = {
    addTask: (task) => {
        const now = (0, Validators_1.today)(); // Obtener la fecha actual en el momento de creación
        tasks.push(Object.assign(Object.assign({}, task), { creation: now, lastEdition: now })); // Agregar tarea nueva al array "tasks"
        sortTasksByTitle(tasks); // Ordenar alfabéticamente cada tarea por título al agregar una nueva
    }
};
