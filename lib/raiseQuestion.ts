import readline from 'readline'

export function raiseQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => {
    rl.question(question + '\n>>> ', (answer: string) => {
      rl.close()
      resolve(answer)
    })
  })
}

export async function keepAskingIfAnswerIsInValid<T extends string>(
  question: string,
  tip: string = 'Your answer is not valid.',
  isValid: (answer: string) => boolean = answer =>
    answer !== '' && answer !== undefined
): Promise<T> {
  let answer = ''

  while (!isValid(answer)) {
    answer = await raiseQuestion(question)

    if (!isValid(answer)) {
      console.log(tip)
    }
  }

  return answer as T
}
