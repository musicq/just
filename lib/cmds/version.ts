import packageJSON from '../../package.json'

export async function version() {
  console.log(` just version ${packageJSON.version}`)

  return 0
}
