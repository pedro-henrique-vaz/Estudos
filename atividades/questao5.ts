import {questionNumber, questionStr} from "./utils";

async function main() {
    let s: string = await questionStr('Qual o numero romano ')
    const numRoman = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    let soma;
    for (let i = 0; i < s.length; i++){
        if(s[0] === "X"){
            soma + 10
            soma = 0
        } 
    }
}
main()