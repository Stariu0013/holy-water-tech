export const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString();

    return newDate.split(".").reverse().join("-");
};