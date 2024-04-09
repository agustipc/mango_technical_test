import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Range from './Range'

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

  test('should render the range slider component with initial min and max values', () => {
    render(<Range min={0} max={100} />)
    expect(screen.getByText('0 €')).toBeInTheDocument()
    expect(screen.getByText('100 €')).toBeInTheDocument()
  })

  test('should not allow dragging the thumbs outside of min and max values', () => {
    render(<Range min={0} max={100} />)

    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: 0 })
    fireEvent.mouseMove(minThumb, { clientX: 1100 })
    fireEvent.mouseUp(minThumb)
    expect(screen.getByText('100 €')).toBeInTheDocument()

    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, { clientX: 100 })
    fireEvent.mouseMove(maxThumb, { clientX: -100 })
    fireEvent.mouseUp(maxThumb)
    expect(screen.getByText('0 €')).toBeInTheDocument()
  })

  test('should not allow dragging the min thumb to be greater than the max thumb', () => {
    render(<Range min={0} max={100} />)

    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, { clientX: 100 })
    fireEvent.mouseMove(maxThumb, { clientX: 50 })
    fireEvent.mouseUp(maxThumb)

    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: 0 })
    fireEvent.mouseMove(document, { clientX: 49 })
    fireEvent.mouseUp(document)
    expect(screen.getByText('49 €')).toBeInTheDocument()

    fireEvent.mouseDown(minThumb, { clientX: 49 })
    fireEvent.mouseMove(minThumb, { clientX: 51 })
    fireEvent.mouseUp(minThumb)

    expect(screen.getByText('49 €')).toBeInTheDocument()
  })

  test('should not allow dragging the max thumb to be less than the min thumb', () => {
    render(<Range min={0} max={100} />)

    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: 0 })
    fireEvent.mouseMove(minThumb, { clientX: 50 })
    fireEvent.mouseUp(minThumb)

    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, { clientX: 100 })
    fireEvent.mouseMove(document, { clientX: 51 })
    fireEvent.mouseUp(document)
    expect(screen.getByText('51 €')).toBeInTheDocument()

    fireEvent.mouseDown(maxThumb, { clientX: 51 })
    fireEvent.mouseMove(maxThumb, { clientX: 49 })
    fireEvent.mouseUp(maxThumb)

    expect(screen.getByText('51 €')).toBeInTheDocument()
  })
})
