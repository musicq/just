import execa from 'execa'

export async function execCommand(
  cmd: string,
  args: string[] = [],
  context: execa.CommonOptions<any> = {}
): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = execa(cmd, args, {stdio: 'inherit', ...context})

    child.stdout?.on('data', (buffer: any) => {
      process.stdout.write(buffer)
    })

    child.on('close', (code: number) => {
      if (code !== 0) return reject(code)

      resolve(0)
    })
  })
}
