export function isToday(dateTimeString: string): boolean {
    const inputDate = new Date(dateTimeString);
    const today = new Date();

    return (
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate()
    );
}

