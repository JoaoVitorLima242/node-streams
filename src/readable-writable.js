// Readable é a nossa fonte de dados e 
// Writable é a nossa saida
import { Readable, Writable } from 'stream'

// fonte de dados
const readable = Readable({
  read() {
    this.push('HELLO WORLD 1')
    this.push('HELLO WORLD 2')
    this.push('HELLO WORLD 3')

    // informa que os dados acabaram - NULL
    this.push(null);
  }
})

// saida de dados
const writable = Writable({
  write(chunk, enconding, callback) {
    console.log('msg', chunk.toString())

    callback()
  }
})

readable
  // writable é a nossa saida -> imprimir, salvar, ignorar 
  .pipe(writable)
