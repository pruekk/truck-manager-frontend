export function calculateSum(array) {
    return array.reduce((accumulator, value) => accumulator + value, 0);
}

export function calculateSumY(priceListArr) {
    let tempYArr = [];
    priceListArr[0].value.map((obj, index) => {
        let tempArr = [];
        priceListArr.map((obj, xIndex) => {
            tempArr[xIndex] = obj.value[index];

            return tempArr;
        })

        tempYArr[index] = calculateSum(tempArr)

        return tempYArr;
    });

    return tempYArr;
}
