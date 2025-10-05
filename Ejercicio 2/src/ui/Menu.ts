import promptSync from 'prompt-sync';
import { Task, TaskStatus, TaskDifficulty } from '../models/Task';
import { getDifficulty, getFilteredTasks, getStatus, getTasks, getTaskIndexByTitle, taskService } from '../services/TaskService';
import { ErrorMessages, showErrorMessage, setErrorMessage } from '../utils/ErrorMessages';
import { isNumber } from "../utils/Validators";

const prompt = promptSync();

const showTask = (index: number): void => {
    const task: Task = getTasks()[index];
    const difficulty: string = getDifficulty(Number(task.difficulty));
    const status: string = getStatus(task.status);

    console.log("Esta es la tarea que elegiste:\n");
    console.log(`  ${task.title}\n`);
    console.log(`  ${task.description}\n`);
    console.log(`  Estado: ${status}`);
    console.log(`  Dificultad: ${difficulty}`);
    console.log(`  Vencimiento: ${task.expiration}`);
    console.log(`  Creación: ${task.creation}\n`);
    
    console.log("Si deseas editarla, presiona E, o presiona 0 (cero) para volver.");
    const menu = prompt("> ");

    if (!isNumber(menu))
    {
        if (menu.toUpperCase() === 'E')
        {
            console.clear(); // Limpiar consola
            console.log(`Estás editando la tarea ${task.title}.\n`);
            console.log("- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.");
            console.log("- Si deseas dejar en blanco un atributo, escribe un espacio.\n\n");

            const description = prompt("1. Ingresa la descripción: ");
            const status = prompt("2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
            const difficulty = Number(prompt("3. Dificultad ([1] / [2] / [3]):"));
            const expiration = prompt("4. Vencimiento: ");

            task.description = description
            task.status = status as TaskStatus
            task.difficulty = difficulty as TaskDifficulty
            task.expiration = expiration

            console.log("\n¡Datos guardados!\n");
            prompt("Presiona ENTER para continuar...");

            setErrorMessage("");
            showMainMenu();
        }
        else
        {
            setErrorMessage(ErrorMessages.invalidOption);
            showMainMenu();
        }
        return;
    }
    const menuParsed = Number(menu); // Número de opción del menú parseado a entero

    if (menuParsed === 0) // Volver al menú principal
    {
        setErrorMessage("");
        showMainMenu();
    }
}

const showTasks = (): void => {
    if (getTasks().length === 0)
    {
        setErrorMessage(ErrorMessages.noTasks);
        showMainMenu();
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

    if (!isNumber(menu))
    {
        setErrorMessage(ErrorMessages.invalidOption)
        showMainMenu();
        return;
    }
    const menuParsed = Number(menu); // Número de opción del menú parseado a entero
    
    console.clear(); // Limpiar consola
    console.log(`Estas son todas tus tareas ${menuParsed === 2 ? "pendientes" : menuParsed === 3 ? "en curso" : menuParsed === 4 ? "terminadas" : ""}:\n`);
    
    let filtered: Task[] = []; // Tareas filtradas
    switch(menuParsed)
    {
        case 1: filtered = getTasks(); break;
        case 2: filtered = getFilteredTasks("P", getTasks()); break;
        case 3: filtered = getFilteredTasks("E", getTasks()); break;
        case 4: filtered = getFilteredTasks("T", getTasks()); break;
        case 5: filtered = getFilteredTasks("C", getTasks()); break;
        case 0: break;
    }

    // Volver al menú principal en caso de que no se haya encontrado una tarea filtrada
    if (menuParsed === 0) // Volver al menú principal
    {
        setErrorMessage("");
        showMainMenu();
        return;
    }
    else if (filtered.length === 0 && menuParsed !== 1)
    {
        setErrorMessage(ErrorMessages.noStatus);
        showMainMenu();
        return;
    }

    // Mostrar las tareas filtradas
    for(let i = 0; i < filtered.length; i++)
    {
        console.log(` [${i + 1}] ${filtered[i].title}`);
    }
    console.log("\n¿Deseas ver los detalles de alguna?");
    console.log("Introduce el número para verla o 0 (cero) para volver.");
    const task = prompt("> ");

    if (!isNumber(task))
    {
        setErrorMessage(ErrorMessages.notFound);
        showMainMenu();
        return;
    }
    const taskParsed = Number(task);

    if (taskParsed === 0) // Volver al menú principal
    {
        setErrorMessage("");
        showMainMenu();
        return;
    }
    if (taskParsed < 1 || taskParsed > filtered.length) // Se ingresó una tarea que no existe
    {
        setErrorMessage(ErrorMessages.notFound);
        showMainMenu();
        return;
    }
    setErrorMessage("");
    console.clear(); // Limpiar consola
    showTask(getTaskIndexByTitle(getTasks(), filtered[taskParsed - 1].title)); // Mostrar detalles de la tarea
}

const createNewTask = (): void => {
    console.clear(); // Limpiar consola

    console.log("Estás creando una nueva tarea.\n");
    
    const title: string = prompt("1. Ingresa el título: ");
    const description: string = prompt("2. Ingresa la descripción: ");
    const status: string = prompt("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
    const difficulty: number = Number(prompt("4. Dificultad ([1] / [2] / [3]): ")) as TaskDifficulty;
    const expiration: string = prompt("5. Vencimiento: ");

    /*
        Agregar datos de la nueva tarea al array
        "Omit" sirve para omitir esos datos requeridos "creation" y "lastEdition"
        "Castear" significa forzar a tratar la variable con su tipo correspondiente por ejemplo: string, number, etc.
    */
    const task: Omit<Task, "creation" | "lastEdition"> = {
        title: title,
        description: description,
        status: status as TaskStatus, // Castear valor de "status" con su respectivo tipo de variable
        difficulty: difficulty as TaskDifficulty, // Castear valor de "difficulty" con su respectivo tipo de variable
        expiration: expiration
    };

    // Agregar la nueva tarea
    taskService.addTask(task);

    console.log("\n¡Datos guardados!\n");
    prompt("Presiona ENTER para continuar...");

    showMainMenu(); // Volver al menú principal
}

export const showMainMenu = (): void => {
    console.clear(); // Limpiar consola
    showErrorMessage(); // Mostrar mensaje de error

    console.log("¡Hola Santiago!\n");
    console.log("¿Qué deseas hacer?\n");
    console.log(" [1] Ver mis tareas.");
    console.log(" [2] Buscar una tarea.");
    console.log(" [3] Agregar una tarea.");
    console.log(" [4] Salir.\n");
    const menu = prompt("> "); // Pedir opción al usuario

    if (!isNumber(menu))
    {
        setErrorMessage(ErrorMessages.invalidOption); // Setear mensaje de error que la opción no es válida
        showMainMenu(); // Volver arriba al menú principal
        return;
    }
    const menuParsed: number = Number(menu); // La opción finalmente será un entero
    switch(menuParsed)
    {
        case 1:
        {
            setErrorMessage("");
            showTasks();
            break;
        }
        case 2:
        {
            setErrorMessage("");
            //searchTask();
            break;
        }
        case 3:
        {
            setErrorMessage("");
            createNewTask();
            break;
        }
        case 4:
        {
            break;
        }
        default:
        {
            setErrorMessage(ErrorMessages.invalidOption);
            showMainMenu();
            break;
        }
    }
}