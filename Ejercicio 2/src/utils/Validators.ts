import dayjs from "dayjs";

export function isNumber(value: String)
{
    const num = Number(value); // Intenta convertir el valor a número
    return Number.isInteger(num); // Devuelve true si es un número entero, false si no lo es
}

export const today = (): string => dayjs().format("DD/MM/YYYY");