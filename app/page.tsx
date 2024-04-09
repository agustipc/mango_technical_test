import styles from './ui/Home.module.scss'
import Link from 'next/link'

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      <h1>Technical Test</h1>
      <p>by Agustí Pou</p>
      <nav>
        <ul>
          <li>
            <Link href="/exercise1">Exercise 1</Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}
