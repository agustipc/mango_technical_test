import { useState } from 'react'

export function useRange(initialMin: number, initialMax: number) {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)
  const [isEditingMinValue, setIsEditingMinValue] = useState(false)
  const [isEditingMaxValue, setIsEditingMaxValue] = useState(false)

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

  const handleValueSubmit = (newValue: string, isMin: boolean) => {
    const value = Math.round(Number(newValue))
    if (isMin) {
      if (value >= initialMin && value < maxValue) {
        setMinValue(value)
      }
      setIsEditingMinValue(false)
    } else {
      if (value > minValue && value <= initialMax) {
        setMaxValue(value)
      }
      setIsEditingMaxValue(false)
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
        initialMin +
        ((movementEvent.clientX - left) / width) * (initialMax - initialMin)
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

  return {
    minValue,
    maxValue,
    isEditingMinValue,
    isEditingMaxValue,
    setIsEditingMinValue,
    setIsEditingMaxValue,
    handleValueSubmit,
    handleDraggingBehavior
  }
}
