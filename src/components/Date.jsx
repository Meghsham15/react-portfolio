// Date ------
function getDate() {
    var options = {
        day: "numeric"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
function getDay() {
    var options = {
        weekday: "long"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
function getMonth() {
    var options = {
        month: "long"
    };
    const today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    return date;
}
export default getDay() + ", " + getDate() + " " + getMonth();