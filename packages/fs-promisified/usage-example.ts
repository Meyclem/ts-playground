import { promisifiedReadFile } from "./"

promisifiedReadFile('./data/user.json')
  .then(result => console.log(result))
  .catch(error => console.error(error))
