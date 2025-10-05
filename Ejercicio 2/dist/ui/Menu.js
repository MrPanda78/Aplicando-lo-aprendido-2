"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMainMenu = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const TaskService_1 = require("../services/TaskService");
const ErrorMessages_1 = require("../utils/ErrorMessages");
const Validators_1 = require("../utils/Validators");
const prompt = (0, prompt_sync_1.default)();
const showTask = (index) => {
    const task = (0, TaskService_1.getTasks)()[index];
    const difficulty = (0, TaskService_1.getDifficulty)(Number(task.difficulty));
    const status = (0, TaskService_1.getStatus)(task.status);
    console.log("Esta es la tarea que elegiste:\n");
    console.log(`  ${task.title}\n`);
    console.log(`  ${task.description}\n`);
    console.log(`  Estado: ${status}`);
    console.log(`  Dificultad: ${difficulty}`);
    console.log(`  Vencimiento: ${task.expiration}`);
    console.log(`  Creación: ${task.creation}\n`);
    console.log("Si deseas editarla, presiona E, o presiona 0 (cero) para volver.");
    const menu = prompt("> ");
    if (!(0, Validators_1.isNumber)(menu)) {
        if (menu.toUpperCase() === 'E') {
            console.clear(); // Limpiar consola
            console.log(`Estás editando la tarea ${task.title}.\n`);
            console.log("- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.");
            console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n\n");
            const description = prompt("1. Ingresa la descripción: ");
            const status = prompt("2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
            const difficulty = Number(prompt("3. Dificultad ([1] / [2] / [3]):"));
            const expiration = prompt("4. Vencimiento: ");
            task.description = description;
            task.status = status;
            task.difficulty = difficulty;
            task.expiration = expiration;
            console.log("\n¡Datos guardados!\n");
            prompt("Presiona ENTER para continuar...");
            (0, ErrorMessages_1.setErrorMessage)("");
            (0, exports.showMainMenu)();
        }
        else {
            (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.invalidOption);
            (0, exports.showMainMenu)();
        }
        return;
    }
    const menuParsed = Number(menu); // Número de opción del menú parseado a entero
    if (menuParsed === 0) // Volver al menú principal
     {
        (0, ErrorMessages_1.setErrorMessage)("");
        (0, exports.showMainMenu)();
    }
};
const showTasks = () => {
    if ((0, TaskService_1.getTasks)().length === 0) {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.noTasks);
        (0, exports.showMainMenu)();
        return;
    }
    console.clear(); // Limpiar consola
    console.log("¿Qué tarea deseas ver?\n");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[5] Canceladas");
    console.log("[0] Volver\n");
    const menu = prompt("> ");
    if (!(0, Validators_1.isNumber)(menu)) {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.invalidOption);
        (0, exports.showMainMenu)();
        return;
    }
    const menuParsed = Number(menu); // Número de opción del menú parseado a entero
    console.clear(); // Limpiar consola
    console.log(`Estas son todas tus tareas ${menuParsed === 2 ? "pendientes" : menuParsed === 3 ? "en curso" : menuParsed === 4 ? "terminadas" : ""}:\n`);
    let filtered = []; // Tareas filtradas
    switch (menuParsed) {
        case 1:
            filtered = (0, TaskService_1.getTasks)();
            break;
        case 2:
            filtered = (0, TaskService_1.getFilteredTasks)("P", (0, TaskService_1.getTasks)());
            break;
        case 3:
            filtered = (0, TaskService_1.getFilteredTasks)("E", (0, TaskService_1.getTasks)());
            break;
        case 4:
            filtered = (0, TaskService_1.getFilteredTasks)("T", (0, TaskService_1.getTasks)());
            break;
        case 5:
            filtered = (0, TaskService_1.getFilteredTasks)("C", (0, TaskService_1.getTasks)());
            break;
        case 0: break;
    }
    // Volver al menú principal en caso de que no se haya encontrado una tarea filtrada
    if (menuParsed === 0) // Volver al menú principal
     {
        (0, ErrorMessages_1.setErrorMessage)("");
        (0, exports.showMainMenu)();
        return;
    }
    else if (filtered.length === 0 && menuParsed !== 1) {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.noStatus);
        (0, exports.showMainMenu)();
        return;
    }
    // Mostrar las tareas filtradas
    for (let i = 0; i < filtered.length; i++) {
        console.log(` [${i + 1}] ${filtered[i].title}`);
    }
    console.log("\n¿Deseas ver los detalles de alguna?");
    console.log("Introduce el número para verla o 0 (cero) para volver.");
    const task = prompt("> ");
    if (!(0, Validators_1.isNumber)(task)) {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.notFound);
        (0, exports.showMainMenu)();
        return;
    }
    const taskParsed = Number(task);
    if (taskParsed === 0) // Volver al menú principal
     {
        (0, ErrorMessages_1.setErrorMessage)("");
        (0, exports.showMainMenu)();
        return;
    }
    if (taskParsed < 1 || taskParsed > filtered.length) // Se ingresó una tarea que no existe
     {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.notFound);
        (0, exports.showMainMenu)();
        return;
    }
    (0, ErrorMessages_1.setErrorMessage)("");
    console.clear(); // Limpiar consola
    showTask((0, TaskService_1.getTaskIndexByTitle)((0, TaskService_1.getTasks)(), filtered[taskParsed - 1].title)); // Mostrar detalles de la tarea
};
const createNewTask = () => {
    console.clear(); // Limpiar consola
    console.log("Estás creando una nueva tarea.\n");
    const title = prompt("1. Ingresa el título: ");
    const description = prompt("2. Ingresa la descripción: ");
    const status = prompt("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    const difficulty = Number(prompt("4. Dificultad ([1] / [2] / [3]): "));
    const expiration = prompt("5. Vencimiento: ");
    /*
        Agregar datos de la nueva tarea al array
        "Omit" sirve para omitir esos datos requeridos "creation" y "lastEdition"
        "Castear" significa forzar a tratar la variable con su tipo correspondiente por ejemplo: string, number, etc.
    */
    const task = {
        title: title,
        description: description,
        status: status, // Castear valor de "status" con su respectivo tipo de variable
        difficulty: difficulty, // Castear valor de "difficulty" con su respectivo tipo de variable
        expiration: expiration
    };
    // Agregar la nueva tarea
    TaskService_1.taskService.addTask(task);
    console.log("\n¡Datos guardados!\n");
    prompt("Presiona ENTER para continuar...");
    (0, exports.showMainMenu)(); // Volver al menú principal
};
const showMainMenu = () => {
    console.clear(); // Limpiar consola
    (0, ErrorMessages_1.showErrorMessage)(); // Mostrar mensaje de error
    console.log("¡Hola Santiago!\n");
    console.log("¿Qué deseas hacer?\n");
    console.log(" [1] Ver mis tareas.");
    console.log(" [2] Buscar una tarea.");
    console.log(" [3] Agregar una tarea.");
    console.log(" [4] Salir.\n");
    const menu = prompt("> "); // Pedir opción al usuario
    if (!(0, Validators_1.isNumber)(menu)) {
        (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.invalidOption); // Setear mensaje de error que la opción no es válida
        (0, exports.showMainMenu)(); // Volver arriba al menú principal
        return;
    }
    const menuParsed = Number(menu); // La opción finalmente será un entero
    switch (menuParsed) {
        case 1:
            {
                (0, ErrorMessages_1.setErrorMessage)("");
                showTasks();
                break;
            }
        case 2:
            {
                (0, ErrorMessages_1.setErrorMessage)("");
                //searchTask();
                break;
            }
        case 3:
            {
                (0, ErrorMessages_1.setErrorMessage)("");
                createNewTask();
                break;
            }
        case 4:
            {
                break;
            }
        default:
            {
                (0, ErrorMessages_1.setErrorMessage)(ErrorMessages_1.ErrorMessages.invalidOption);
                (0, exports.showMainMenu)();
                break;
            }
    }
};
exports.showMainMenu = showMainMenu;
