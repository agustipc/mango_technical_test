import Range from './ui/Range/Range'
import styles from './ui/Home.module.scss'

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      <Range min={0} max={1000} />
    </main>
  )
}
