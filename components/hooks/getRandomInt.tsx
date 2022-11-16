export const getRandomInt = (max: number, min?: number) => {
  min = min ?? 1
  return Math.floor(Math.random() * (max - min)) + min
}
