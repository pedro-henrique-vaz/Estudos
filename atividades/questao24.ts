const arr = [5, 7, 3, 9, 11, 24, 8, 90, 88, 79, 120, 30, 2, 1, 0]
let n = arr.length

function selectionSort (arr: number[]) {
    for (let i = 0; i < n; i++) { // Iterando sobre o array
        let numIndex = i // Armazenando o primeiro elemento
        for (let j = 0; j < n; j++){ // Segunda iteração 
            if (arr[j] < arr[numIndex]){ // A cada iteração e verificado se o elemento do array J e menor que o elemento do numindex
                numIndex = j // Caso seja menor, atualizamos o numIndex e ele passará a ser o elemento de menor valor                    
            }
        }
        if (numIndex !== i){ // se for verdadeiro, encontramos um valor diferente de I
            let aux = arr[i] // guarda o valor do arr I em auxiliar
            arr[i] = arr[numIndex] // arr I recebe um novo valor (arr NumIndex = menor valor)
            arr[numIndex] = aux // arr de NumIndex recebe o valor de aux (valor antigo)
        }
    } 
    return arr // retorna o arr ordenado
}
const sorted = selectionSort(arr)
console.log(sorted)

// depois de ordenado, nao precisa se preocupar com oque tive para tras