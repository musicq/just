import chalk from 'chalk'
import {composeListText} from '../utils'

const commands = [
  {cmd: 'generate', desc: 'Generate projects template', alias: 'g'},
  {cmd: 'version', desc: 'Show version info'},
  {cmd: 'help', desc: 'Print help message'},
]

export async function help() {
  const cmdsText = composeListText(commands)

  console.log(`
  Usage: just <command> <options>
  
  ${chalk.grey(`Or you can use ${chalk.yellow('j')} for shortcut`)}
  
  ${chalk.bold('Commands')}
  
${cmdsText}
  `)

  return 0
}
