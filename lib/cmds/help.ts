export function help() {
  console.log(`
  Usage: just <command> <options>
  
  generate      generate a template
  version       show just version
  help          print help messages
  `)

  process.exit(0)
}
