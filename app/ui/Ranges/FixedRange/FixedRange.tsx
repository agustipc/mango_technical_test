'use client'

import { useFixedRange } from '../../../hooks/useFixedRange'
import styles from '../Range.module.scss'

export default function FixedRange({ allValues }: { allValues: number[] }) {
  const min = allValues[0]
  const max = allValues[allValues.length - 1]

  const { minValue, maxValue, handleDraggingBehavior } = useFixedRange(
    min,
    max,
    allValues
  )

  const thumbWidth = 20
  const relativeMinPosition = ((minValue - min) / (max - min)) * 100
  const relativeMaxPosition = ((maxValue - min) / (max - min)) * 100
  const minThumbLeftOffset = `calc(${relativeMinPosition}% - ${
    thumbWidth / 2
  }px)`
  const maxThumbLeftOffset = `calc(${relativeMaxPosition}% - ${
    thumbWidth / 2
  }px)`

  return (
    <section className={styles.rangeContainer}>
      <label data-testid="min-value-label" className={styles.valueLabel}>
        {minValue} &euro;
      </label>
      <div className={styles.rangeSlider}>
        <div className={styles.track} />
        <div
          data-testid="min-thumb"
          className={styles.thumb}
          style={{ left: minThumbLeftOffset }}
          onMouseDown={(e) => handleDraggingBehavior(e, true)}
        ></div>
        <div
          role="slider"
          data-testid="max-thumb"
          className={styles.thumb}
          style={{ left: maxThumbLeftOffset }}
          onMouseDown={(e) => handleDraggingBehavior(e, false)}
        ></div>
      </div>
      <label
        data-testid="max-value-label"
        className={`${styles.valueLabel} ${styles.valueLabelRight}`}
      >
        {maxValue} &euro;
      </label>
    </section>
  )
}
