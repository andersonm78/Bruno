import app from "./src/app.js";

// import conexao from './infra/conexao.js';

const port = 3000;

// Estabelecer a conexão
// conexao.connect((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Conexão estabelecida com sucesso!");

//         // Listening (Escuta a porta)
//         app.listen(port, () => {
//             console.log(`Servidor rodando em http://localhost:${port}`);
//         });
//     }
// })

// Listening (Escuta a porta)
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

