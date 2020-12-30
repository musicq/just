import path from 'path'
import copy from 'recursive-copy'
import chalk from 'chalk'
import {keepAskingIfAnswerIsInValid} from '../raiseQuestion'
import {go} from '../utils'
import {execCommand} from '../execCommand'

const replaceInFiles = require('replace-in-files')

const Categories = ['react']
const Types = ['library']
const SupportedPackageManager = ['yarn', 'npm']

type Category = 'react'
type Type = 'library'
type PackageManager = 'yarn' | 'npm'

const useTemplateDir = (...paths: string[]) =>
  path.resolve(__dirname, '../../templates', ...paths)

export async function generate(options: string[]) {
  const projectInfo = options[0] ?? ''
  const [category, type] = projectInfo.split(':') as [Category, Type]

  if (
    !projectInfo.includes(':') ||
    !Categories.includes(category) ||
    !Types.includes(type)
  ) {
    console.log(
      `\n${chalk.bold(chalk.red(projectInfo))} is not a valid project type.`
    )
    return 0
  }

  const libraryName = await askForLibraryName()
  const pm = await askForPackageManager()
  const isInitGitRepo = await askForIfInitGitRepo()
  const libraryPath = path.resolve(process.cwd(), libraryName)

  await copyTemplatesToPath(category, type, libraryPath)
  await replacePlaceholdersInTemplate(libraryPath, libraryName)

  if (isInitGitRepo) {
    let [, e1] = await go(initGitRepo(libraryPath))
    if (e1 !== null) return 1
  }

  let [, e2] = await go(installDependencies(libraryPath, pm))
  if (e2 !== null) return 1

  printDoneMessage(libraryName, pm)

  return 0
}

async function askForLibraryName() {
  return keepAskingIfAnswerIsInValid(
    'What is your library name?',
    'You need to specify a library name.'
  )
}

async function askForPackageManager() {
  return keepAskingIfAnswerIsInValid<PackageManager>(
    'Which package manager do you like (npm/yarn)?',
    'Your choice is not supported.',
    answer => SupportedPackageManager.includes(answer)
  )
}

async function askForIfInitGitRepo() {
  return keepAskingIfAnswerIsInValid(
    'Would you like to init the git repo (y/n)',
    'Please specify y or n',
    answer => answer === 'y' || answer === 'n'
  ).then(answer => answer === 'y')
}

async function copyTemplatesToPath(
  category: string,
  type: string,
  dest: string
) {
  const src = useTemplateDir(category, type)
  return copy(src, dest, {
    dot: true,
    junk: false,
  })
}

async function replacePlaceholdersInTemplate(
  libraryPath: string,
  libraryName: string
) {
  return replaceInFiles({
    files: libraryPath + '/**/*',
    from: /{{libraryName}}/g,
    to: libraryName,
  })
}

async function installDependencies(
  libraryPath: string,
  pm: PackageManager
): Promise<number> {
  console.log(`\n${chalk.green('Installing dependencies...')}\n`)

  const args = pm === 'npm' ? ['install'] : ['']
  return execCommand(pm, args, {cwd: libraryPath})
}

async function initGitRepo(libraryPath: string) {
  console.log(`\n${chalk.green('Initializing git repository...')}\n`)

  let [, e1] = await go(execCommand('git', ['init'], {cwd: libraryPath}))
  if (e1 !== null) return 1

  let [, e2] = await go(execCommand('git', ['add', '.'], {cwd: libraryPath}))
  if (e2 !== null) return 1

  let [, e3] = await go(
    execCommand('git', ['commit', '-m', 'initial commit'], {cwd: libraryPath})
  )
  if (e3 !== null) return 1

  return 0
}

function printDoneMessage(libraryName: string, pm: PackageManager) {
  console.log(`
  
  ${chalk.green('🎉 All things are done.')}
  
  You can play with it now.
  
  cd ${libraryName}
  ${pm} start
  
  ${chalk.grey('# use build command to build your library')}
  ${pm} build
  `)
}
