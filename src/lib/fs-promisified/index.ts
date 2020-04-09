import * as fs from "fs"

function promisifiedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, result) => { 
      if (error) { return reject(error) }
      return resolve(result)
    })
  })
}

export { promisifiedReadFile }
