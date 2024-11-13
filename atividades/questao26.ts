const array2 = [14, 25, 7, 32, 1 ,6, 2, 98 ]

function insertionSort(array2:number[]){
    let i;
    let j;
    let aux;

    for(i = 1; i < array2.length; i++){ // anda pra frente
        for(j = i - 1; j >= 0; j--){ // anda pra tras
            if(array2[j + 1] < array2[j]){
                aux = array2[j]
                array2[j] = array2[j + 1]
                array2[j + 1] = aux
                if(array2[j+1] == array2[j]){
                break;
                }           
            }
            console.log(array2)
        }
    }
    return array2
}
const sortt = insertionSort(array2)
console.log(sortt)