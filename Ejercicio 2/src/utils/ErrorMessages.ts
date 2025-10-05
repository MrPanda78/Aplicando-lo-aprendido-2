let ErrorMessage: string = "";

export const ErrorMessages = {
    invalidOption: "ERROR: ¡Por favor, ingrese un número válido entre 1 y 4!",
    noTasks: "ERROR: No hay tareas disponibles para mostrar.",
    notFound: "ERROR: La tarea que intentas ver no existe.",
    noStatus: "ERROR: No existe ninguna tarea con ese estado.",
    noTitle: "ERROR: No se encontró ninguna tarea que contenga ese título."
};

export const setErrorMessage = (error: string): void => {
    ErrorMessage = error;
}

export const showErrorMessage = (): void => {
    if (ErrorMessage !== "")
    {
        console.log("--------------------------------------------------\n" + ErrorMessage + "\n--------------------------------------------------");
    }
}