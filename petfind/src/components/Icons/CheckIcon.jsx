import { PropTypes } from 'prop-types'

export default function CheckIcon ({ width, height, fill }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      className={fill || 'fill-neutral-500'}
      viewBox='0 0 24 24'
    >
      <path fill='currentColor' d='m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z' />
    </svg>
  )
}

CheckIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}
