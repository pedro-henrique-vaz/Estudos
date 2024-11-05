const arr = [5, 7, 3, 9, 11, 24, 8, 90, 88, 79]

function selectionSort (arr: number[]) {
    let i;
    let j;
    let numIndex;
    let aux;

    for (i = 0; i < arr.length; i++) {
        numIndex = i 
        for (j = i + 1; j < arr.length; j++){ 
            if (arr[j] < arr[numIndex]){ 
                numIndex = j
            }
        }
        if (numIndex !== i){ 
            aux = arr[i] 
            arr[i] = arr[numIndex] 
            arr[numIndex] = aux 
        } 
    }
    return arr
}

const sorted = selectionSort(arr)
console.log(sorted)