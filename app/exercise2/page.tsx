import FixedRange from '../ui/Ranges/FixedRange/FixedRange'
import styles from '../ui/Home.module.scss'
import { fetchRangeFixedValues } from '../lib/data'

export default async function Page() {
  const values = await fetchRangeFixedValues()

  return (
    <main className={styles.mainContainer}>
      <FixedRange allValues={values} />
    </main>
  )
}
