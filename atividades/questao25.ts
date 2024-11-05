const arr1 = [5, 7, 3, 9, 11, 24, 8, 90, 88, 79, 120, 30, 2, 1, 0]
function bubbleSort (arr1: number[]){
    for (let i = 0; i < arr1.length; i++){
        for (let j = i + 1; j < arr1.length; j++){
            if (arr1[i] > arr1[j]){
                let aux = arr1[i]
                arr1[i] = arr1[j]
                arr1[j] = aux
            }
        }
    }
    return arr1
}
const sorted1 = bubbleSort(arr1)
console.log(sorted1)