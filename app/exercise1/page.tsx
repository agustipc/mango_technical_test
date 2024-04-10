import Range from '../ui/Range/Range'
import styles from '../ui/Home.module.scss'
import { fetchRangeValues } from '../lib/data'

export default async function Page() {
  const rangeMinAndMax = await fetchRangeValues()

  return (
    <main className={styles.mainContainer}>
      <Range min={rangeMinAndMax.min} max={rangeMinAndMax.max} />
    </main>
  )
}
