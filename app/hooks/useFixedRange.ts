import { useState } from 'react'

export function useFixedRange(
  initialMin: number,
  initialMax: number,
  allValues: number[]
) {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)

  function findNearestValue(value: number) {
    return allValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
  }

  const updateValues = (newValue: number, isMinValue: boolean) => {
    if (isMinValue) {
      if (newValue >= initialMin && newValue <= maxValue) {
        setMinValue(newValue)
      }
    } else {
      if (newValue >= minValue && newValue <= initialMax) {
        setMaxValue(newValue)
      }
    }
  }

  const handleDraggingBehavior = (
    e: React.MouseEvent<HTMLElement>,
    isMinValueThumb: boolean
  ) => {
    e.preventDefault()
    const thumb = e.currentTarget
    thumb.style.cursor = 'grabbing'
    if (!thumb.parentElement) return

    const { left, width } = thumb.parentElement.getBoundingClientRect()

    const onDragging = (movementEvent: MouseEvent) => {
      movementEvent.preventDefault()
      const position = (movementEvent.clientX - left) / width
      const newValue = initialMin + position * (initialMax - initialMin)
      const nearestValue = findNearestValue(newValue)

      if (isMinValueThumb) {
        if (nearestValue < maxValue) {
          updateValues(nearestValue, true)
        }
      } else {
        if (nearestValue > minValue) {
          updateValues(nearestValue, false)
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

  return {
    minValue,
    maxValue,
    handleDraggingBehavior
  }
}
