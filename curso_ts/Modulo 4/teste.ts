import mysql, {RowDataPacket} from "mysql2/promise"

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'my-secret-pw',
        database: 'aula',
    });

    const [r, fields] = await connection.query('SELECT * FROM `gafanhotos`');
    const results = r as RowDataPacket[]

    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available

    let contadorF = 0
    let contadorM = 0

    for (let i = 0; i < results.length; i++) {
        if (results[i].sexo === 'M') {
            contadorM++
        } else {
            contadorF++
        }
    }

    console.log(`M: ${contadorM} F: ${contadorF}`)
    console.log("fim")
}

main()
