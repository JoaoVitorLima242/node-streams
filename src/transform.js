import { Readable, Transform, Writable } from 'stream'
import { createWriteStream } from 'fs'

const readable = Readable({
  read() {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now() + index, name: `Joao-${index}` }
      const data = JSON.stringify(person)

      this.push(data)
    }

    this.push(null);
  }
})

// Transform tem o trabalho de processar os dados
const mapFields = Transform({
  transform(chunk, enconding, callback) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    callback(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, enconding, callback) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return callback(null, chunk)
    }

    this.counter += 1

    callback(null, "id,name\n".concat(chunk))
  }
})

const writable = Writable({
  write(chunk, enconding, callback) {
    console.log('msg', chunk.toString())

    callback()
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable)
  .pipe(createWriteStream('my.csv'))


pipeline.on('end', () => console.log('finish'))
