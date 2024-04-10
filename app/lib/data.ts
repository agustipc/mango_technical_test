interface RangeValues {
  min: number
  max: number
}

export async function fetchRangeValues(): Promise<RangeValues> {
  // here we simulate an API call to fetch the range values
  const data = { min: 0, max: 200 }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export async function fetchRangeFixedValues(): Promise<number[]> {
  const data: number[] = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
