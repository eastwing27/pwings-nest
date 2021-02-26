export function IsNullOrWhiteSpace(str: String) {
    return str == undefined || str === null || str.match(/^ *$/) !== null; 
}