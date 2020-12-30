import {version} from './cmds/version'
import {help} from './cmds/help'
import {generate} from './cmds/generate'
import {go} from './utils'

type Command = 'version' | 'help' | 'generate' | 'g'

export async function main(...args: [Command?, ...string[]]) {
  const [command = 'help', ...options] = args

  let cmd: (options: string[]) => Promise<number>

  switch (command) {
    case 'generate':
    case 'g':
      cmd = generate
      break
    case 'version':
      cmd = version
      break
    case 'help':
      cmd = help
      break
    default:
      console.log(`Command ${command} not found.`)
      cmd = help
  }

  const [code, err] = await go(cmd(options))

  if (err !== null) {
    console.error(`Command failed: ${args.join(' ')}`)
    return 1
  }

  return code!
}
