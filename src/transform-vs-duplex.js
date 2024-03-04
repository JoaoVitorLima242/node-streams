import { Duplex } from "stream";

let count = 0
const server = new Duplex({
  objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is joao ${count}\n`)
        return;
      }
      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(function() { everySecond(this) })
  },
  // é como se fosse um objeto completamente diferente
  write(chunk, enconding, callback) {
    console.log('Write', chunk)
    callback()
  }
})

// provar que sao canais de comunicao diferentes
// write aciona o writable do Duplex
server.write('Epa\n')

// on data => loga o que rolou no .push do readable
// server.on('data', msg => console.log('redable', msg))

server.push('We can add more data')

server.pipe(process.stdout)
