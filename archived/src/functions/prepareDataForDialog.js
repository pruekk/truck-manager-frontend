export function addKeyValuePairToObjectArray(array, searchKey, searchValue, newKeyValue) {
    // Check if the array is indeed an array
    if (Array.isArray(array)) {
        // Find the index of the object in the array based on the search key-value pair
        const index = array.findIndex(obj => obj[searchKey] === searchValue);

        // If the object is found, add the new key-value pair to the object
        if (index > -1) {
            Object.assign(array[index], newKeyValue);
        } else {
            throw new Error(`No object with the specified ${searchKey}='${searchValue}' found in the array.`);
        }
    } else {
        throw new Error(`This is not an array`);
    }

    // Return the updated JSON object
    return array;
}
