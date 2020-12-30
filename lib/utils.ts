export function go<T>(promise: Promise<T>): Promise<[T, null] | [null, any]> {
  return promise.then<[T, null]>(r => [r, null]).catch(e => [null, e])
}
