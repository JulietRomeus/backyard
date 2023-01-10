const _ = require('lodash');

export default {}





export const genQuery = (path: string) => {
    const tempObject = {};
    let container = tempObject;
    const defaultValues = true
    path.split('.').map((k, i, values) => {
        container = (container[k] = (i == values.length - 1 ? defaultValues : {}))
    });
    return tempObject

}


export const genMultiFields = (paths: string) => {
    let pathList = paths ? paths.split(',') : []
    // let buffer = []
    const tempObject = {};
    console.log('pathList', pathList)
    let buffer = pathList.map(path => {
        let container = tempObject;
        const defaultValues = true
        tempObject[path] = true

    })


    return tempObject

}



export const genMultiRelations = (paths: string) => {
    let pathList = paths ? paths.split(',') : []
    // let buffer = []
    let buffer = pathList.map(path => {
        const tempObject = {};
        let container = tempObject;
        const defaultValues = true
        if (path.split('.').length > 0) {
            path.split('.').map((k, i, values) => {
                container = (container[k] = (i == values.length - 1 ? defaultValues : {}))
            });
            return tempObject
        }
        else {
            return undefined
        }
    })
    const allRules = Object.assign({}, ...buffer);

    return allRules

}



export const getSelectFromDirectusFields = (inputStr) =>{

// Split the input string into an array of strings
const inputArr = inputStr.split(",");

// Start with an empty JSON object
let result = {};
let currentObj = result;

// Iterate through the array of strings
for (let i = 0; i < inputArr.length; i++) {
    const keys = inputArr[i].split(".");
    for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        // Check if it is the last element in the array
        if (j === keys.length - 1) {
            currentObj[key] = true;
        } else {
            if (!currentObj[key]) {
                currentObj[key] = {};
            }
            currentObj = currentObj[key];
        }
    }
    // Reset the current object to the root object
    currentObj = result;
}
return result
}