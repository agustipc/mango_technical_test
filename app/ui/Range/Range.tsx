type RangeProps = {
  min: number
  max: number
}

const Range: React.FC<RangeProps> = ({ min, max }) => {
  return (
    <section>
      <p>
        Slider from {min} to {max}
      </p>
    </section>
  )
}

export default Range
