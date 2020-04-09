import { promisifiedReadFile } from "./"

promisifiedReadFile('./src/lib/fs-promisified/user.json')
  .then(result => console.log(result))
  .catch(error => console.error(error))

