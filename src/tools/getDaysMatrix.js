export function getDaysMatrix(month = new Date().getMonth(), year = new Date().getFullYear()) {
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();

    let currentMonthCount = 0 - firstDayOfTheMonth;

    return new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;

            return new Date(year, month, currentMonthCount);
        });
    });
}