import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Range from './Range'

describe('Range Component', () => {
  test('should render with min and max values', () => {
    const min = 0
    const max = 1000

    render(<Range min={min} max={max} />)

    expect(screen.getByText(`Slider from ${min} to ${max}`)).toBeInTheDocument()
  })
})
