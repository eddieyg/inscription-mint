export function toNonExponential(value: string) {
  if (Number.isNaN(value) || !/e/i.test(String(value).toLocaleLowerCase()))
    return value
  const num = Number(value).toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  const n2 = num![2] as unknown as number
  return Number(value).toFixed(Math.max(0, (num![1] || '').length - n2))
}