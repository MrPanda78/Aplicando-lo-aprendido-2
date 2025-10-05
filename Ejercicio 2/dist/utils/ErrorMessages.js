"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showErrorMessage = exports.setErrorMessage = exports.ErrorMessages = void 0;
let ErrorMessage = "";
exports.ErrorMessages = {
    invalidOption: "ERROR: ¡Por favor, ingrese un número válido entre 1 y 4!",
    noTasks: "ERROR: No hay tareas disponibles para mostrar.",
    notFound: "ERROR: La tarea que intentas ver no existe.",
    noStatus: "ERROR: No existe ninguna tarea con ese estado.",
    noTitle: "ERROR: No se encontró ninguna tarea que contenga ese título."
};
const setErrorMessage = (error) => {
    ErrorMessage = error;
};
exports.setErrorMessage = setErrorMessage;
const showErrorMessage = () => {
    if (ErrorMessage !== "") {
        console.log("--------------------------------------------------\n" + ErrorMessage + "\n--------------------------------------------------");
    }
};
exports.showErrorMessage = showErrorMessage;
