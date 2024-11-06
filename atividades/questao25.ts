const array = [19, 31, 31, 11, 2, 4]

function bubbleSort(array: number[]){
    let i;
    let j;
    let aux;
    let swap;

    for(i = 0; i < array.length - 1; i++) {
        swap = false
        for(j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]){
                aux = array[j]
                array[j] = array[j + 1]
                array[j + 1] = aux
                swap = true
            }
        }
        if (!swap) {
            break;
        }
    }

    return array
}

const sort = bubbleSort(array)
console.log(sort)