'use client'

import { useRange } from '../../hooks/useRange'

import styles from './Range.module.scss'

export default function Range({ min, max }: { min: number; max: number }) {
  const {
    minValue,
    maxValue,
    isEditingMinValue,
    isEditingMaxValue,
    setIsEditingMinValue,
    setIsEditingMaxValue,
    handleValueSubmit,
    handleDraggingBehavior
  } = useRange(min, max)

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
      {isEditingMinValue ? (
        <input
          type="number"
          data-testid="min-value-input"
          className={styles.editInput}
          defaultValue={minValue}
          onBlur={(e) => handleValueSubmit(e.target.value, true)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
          }}
          onFocus={(e) => e.target.select()}
          autoFocus
        />
      ) : (
        <label
          data-testid="min-value-label"
          className={styles.valueLabel}
          onClick={() => setIsEditingMinValue(true)}
        >
          {minValue} &euro;
        </label>
      )}
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

      {isEditingMaxValue ? (
        <input
          type="number"
          data-testid="max-value-input"
          className={styles.editInput}
          defaultValue={maxValue}
          onBlur={(e) => handleValueSubmit(e.target.value, false)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
          }}
          onFocus={(e) => e.target.select()}
          autoFocus
        />
      ) : (
        <label
          data-testid="max-value-label"
          className={`${styles.valueLabel} ${styles.valueLabelRight}`}
          onClick={() => setIsEditingMaxValue(true)}
        >
          {maxValue} &euro;
        </label>
      )}
    </section>
  )
}
