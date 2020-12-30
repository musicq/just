export function go<T>(promise: Promise<T>): Promise<[T, null] | [null, any]> {
  return promise
    .then<[T, null]>(r => [r, null])
    .catch(e => [null, e])
}

export function composeListText(
  list: Array<{cmd: string; desc: string; alias?: string}>
) {
  return list
    .map(
      data => `  ${data.cmd} ${data.alias ?? ''}`.padEnd(20, ' ') + data.desc
    )
    .join('\n')
}
