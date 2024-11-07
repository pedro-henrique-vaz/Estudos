const array2 = [14, 25, 7, 32, 1 ,6, 2, 98 ]

function insertionSort(array2:number[]){
    let i;
    let j;
    let aux;

    for(i = 1; i < array2.length; i++){
        for(j = i - 1; j < array2.length; j++){
            if(array2[i] < array2[j]){
                aux = array2[j]
                array2[j] = array2[i]
                array2[i] = array2[j]
            }
            console.log(array2)
        }
    }
    return array2
}
const sortt = insertionSort(array2)
console.log(sortt)