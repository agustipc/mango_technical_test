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
