export function IsNullOrWhiteSpace(str: String) {
    return str === null || str.match(/^ *$/) !== null; 
}