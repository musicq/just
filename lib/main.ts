import {version} from './cmds/version'
import {help} from './cmds/help'
import {debug} from './debug'
import {generate} from './cmds/generate'

type Command = 'version' | 'help' | 'generate' | 'g'

export function main(...args: [Command?, ...string[]]) {
  const [command = 'help', ...options] = args
  debug(command)
  debug(options)
  console.log()

  switch (command) {
    case 'generate':
    case 'g':
      generate()
      break
    case 'version':
      version()
      break
    case 'help':
      help()
      break
    default:
      console.log(`Command ${command} not found.`)
  }
}
