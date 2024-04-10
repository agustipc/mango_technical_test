import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FixedRange from './FixedRange'

describe('Range Component', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: 100,
      height: 20,
      top: 0,
      right: 100,
      bottom: 20,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const rangeValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  test('should render the range slider component with initial min and max values', () => {
    render(<FixedRange allValues={rangeValues} />)
    expect(screen.getByText(`${rangeValues[0]} €`)).toBeInTheDocument()
    expect(
      screen.getByText(`${rangeValues[rangeValues.length - 1]} €`)
    ).toBeInTheDocument()
  })

  test('should not allow dragging the thumbs outside of min and max values', () => {
    render(<FixedRange allValues={rangeValues} />)

    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: rangeValues[0] })
    fireEvent.mouseMove(minThumb, { clientX: 1100 })
    fireEvent.mouseUp(minThumb)
    expect(screen.getByText(`${rangeValues[0]} €`)).toBeInTheDocument()

    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, {
      clientX: rangeValues[rangeValues.length - 1]
    })
    fireEvent.mouseMove(maxThumb, { clientX: -100 })
    fireEvent.mouseUp(maxThumb)
    expect(
      screen.getByText(`${rangeValues[rangeValues.length - 1]} €`)
    ).toBeInTheDocument()
  })

  test('should not allow dragging the min thumb to be greater than the max thumb', () => {
    render(<FixedRange allValues={rangeValues} />)

    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, { clientX: rangeValues[0] })
    fireEvent.mouseMove(maxThumb, { clientX: 40 })
    fireEvent.mouseUp(maxThumb)
    expect(screen.getByText('30.99 €')).toBeInTheDocument()

    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: rangeValues[0] })
    fireEvent.mouseMove(document, { clientX: 10.99 })
    fireEvent.mouseUp(document)
    expect(screen.getByText('10.99 €')).toBeInTheDocument()

    fireEvent.mouseDown(minThumb, { clientX: 10.99 })
    fireEvent.mouseMove(minThumb, { clientX: 50 })
    fireEvent.mouseUp(minThumb)

    expect(screen.getByText('10.99 €')).toBeInTheDocument()
  })
})
