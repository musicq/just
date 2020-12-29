import readline from 'readline'
import path from 'path'
import copy from 'recursive-copy'
import execa from 'execa'

const replaceInFiles = require('replace-in-files')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export async function generate(options: string[]) {
  const [category, type] = (options[0] ?? '').split(':')

  if (!category || !type) {
    console.log('You need to specify a project type.')
    process.exit(0)
  }

  const cwd = process.cwd()
  const libraryName = await getLibraryNameFromReadline()
  const libraryPath = path.resolve(cwd, libraryName)

  await copyFilesToPath(libraryPath)
  await replacePlaceholdersInTemplate(libraryPath, libraryName)
  await installDependencies(libraryPath)

  console.log(`
  All things are done.
  
  You can now play with it.
  
  cd ${libraryName}
  yarn start
  
  # use build command to build your library
  yarn build
  `)
}

function getLibraryNameFromReadline(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('What is your library name? ', (libraryName: string) => {
      if (libraryName) {
        rl.close()
        return resolve(libraryName)
      }

      console.log('You need to specify a library name.')
      resolve(getLibraryNameFromReadline())
    })
  })
}

async function copyFilesToPath(libraryPath: string) {
  const src = path.resolve(__dirname, '../../templates/react/library')
  return copy(src, libraryPath)
}

async function replacePlaceholdersInTemplate(libraryPath: string, libraryName: string) {
  return replaceInFiles({
    files: libraryPath + '/**/*',
    from: /{{libraryName}}/g,
    to: libraryName,
  })
}

async function installDependencies(libraryPath: string) {
  return new Promise((resolve, reject) => {
    const child = execa('yarn', {
      cwd: libraryPath,
      stdio: ['inherit', 'inherit', 'inherit'],
    })

    child.stdout?.on('data', (buffer: any) => {
      process.stdout.write(buffer)
    })

    child.on('close', (code: number) => {
      if (code !== 0) {
        console.log(`installation failed.`)
        return reject()
      }

      resolve(true)
    })
  })
}