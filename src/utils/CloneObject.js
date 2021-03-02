/**
 * Clone object instance for new reference
 * @param {*} obj 
 */
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}