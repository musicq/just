import chalk from 'chalk'

export async function help() {
  console.log(`
  Usage: just <command> <options>
  
  ${chalk.grey(`Or you can use ${chalk.yellow('j')} for shortcut`)}
  
  ${chalk.bold('generate')} g       Generate projects template
  ${chalk.bold('version')}          Show version info
  ${chalk.bold('help')}             Print help message
  `)

  return 0
}
