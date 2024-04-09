'use client'

import { useState } from 'react'
import styles from './Range.module.scss'

export default function Range({ min, max }: { min: number; max: number }) {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const thumbWidth = 20
  const relativeMinPosition = ((minValue - min) / (max - min)) * 100
  const relativeMaxPosition = ((maxValue - min) / (max - min)) * 100
  const minThumbLeftOffset = `calc(${relativeMinPosition}% - ${
    thumbWidth / 2
  }px)`
  const maxThumbLeftOffset = `calc(${relativeMaxPosition}% - ${
    thumbWidth / 2
  }px)`

  const updateValues = (newValue: number, isMinValue: boolean) => {
    if (isMinValue) {
      if (newValue >= min && newValue <= maxValue) {
        setMinValue(newValue)
      }
    } else {
      if (newValue >= minValue && newValue <= max) {
        setMaxValue(newValue)
      }
    }
  }

  const handleDraggingBehavior = (
    e: React.MouseEvent<HTMLElement>,
    isMinValueThumb: boolean
  ) => {
    const thumb = e.currentTarget
    thumb.style.cursor = 'grabbing'
    if (!thumb.parentElement) return

    const { left, width } = thumb.parentElement.getBoundingClientRect()

    const onDragging = (movementEvent: MouseEvent) => {
      const newValue =
        min + ((movementEvent.clientX - left) / width) * (max - min)
      if (isMinValueThumb) {
        if (Math.round(newValue) < maxValue) {
          updateValues(Math.round(newValue), true)
        }
      } else {
        if (Math.round(newValue) > minValue) {
          updateValues(Math.round(newValue), false)
        }
      }
    }

    const onStopDragging = () => {
      thumb.style.cursor = 'pointer'
      document.removeEventListener('mousemove', onDragging)
      document.removeEventListener('mouseup', onStopDragging)
    }

    document.addEventListener('mousemove', onDragging)
    document.addEventListener('mouseup', onStopDragging)
  }

  return (
    <section className={styles.rangeContainer}>
      <label className={styles.valueLabel}>{minValue} &euro;</label>
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
      <label className={`${styles.valueLabel} ${styles.valueLabelRight}`}>
        {maxValue} &euro;
      </label>
    </section>
  )
}
