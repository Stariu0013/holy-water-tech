export function getDaysMatrix(month: number = new Date().getMonth(), year: number = new Date().getFullYear()) {
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();

    let currentMonthCount = 0 - firstDayOfTheMonth;

    return new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;

            return new Date(year, month, currentMonthCount);
        });
    });
}