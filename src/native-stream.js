// process.stdin.pipe(process.stdout)
//   .on('data', msg => console.log('data', msg.toString()))
//   .on('error', msg => console.log('error', msg.toString()))
//   .on('end', msg => console.log('end', msg))
//   .on('close', msg => console.log('close', msg))
//

// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"
//
// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"

import { createReadStream, readFileSync } from "fs"
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from "http"

http.createServer((req, res) => {
  // ma pratica - Quebra o app, pois o a gente esta lendo uma string muito grande. Pegamos e transformamos
  // o Buffer inteiro em string
  // const file = readFileSync('big.file').toString()
  // res.write(file)
  // res.end()

  // createReadStream separa os arquivos em mais pedacos(chunks) e com o pipe
  // temos o controlle desses chunks
  createReadStream('big.file').pipe(res)
}).listen(3000, () => console.log('running 3000'))

// curl localhost:3000 -o output.txt
