export function isToday(dateTimeString: string): boolean {
    // Parse o datetime de texto para um objeto Date
    const inputDate = new Date(dateTimeString);
    
    // Obtenha a data de hoje
    const today = new Date();

    // Compare se o ano, mês e dia são iguais
    return (
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate()
    );
}

