// Criando um server
import app from './src/app.js'
//import conexao from './app/database/conexao.js'

const port = 3000

// Estabelecendo a conexão 
//conexao.connect((error) => {
    //if (error) {
        //console.error('Falha de conexão: ', error);
        //return;
    //}
    //console.log('Conectado ao banco de dados.');
//})

// Listening (escuta a porta)
// o arrow function é como se fosse um this, chama uma função com um retorno implicito
app.listen(port, () => {
    console.log(`Servidor rodando liso em http://localhost:${port}`)
})
