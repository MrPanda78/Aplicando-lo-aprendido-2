import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // Para parsear formato de fecha

export function isNumber(value: string)
{
    const num = Number(value); // Intenta convertir el valor a número
    return Number.isInteger(num); // Devuelve true si es un número entero, false si no lo es
}

export const today = (): string => dayjs().format("DD/MM/YYYY");

export function isValidDate(value: string): boolean
{
    const date = dayjs(value, "DD/MM/YYYY", true);
    return date.isValid();
}