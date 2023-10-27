import { PropTypes } from 'prop-types'

export default function CalendarIcon ({ width, height, fill }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || 24}
      height={height || 24}
      className={fill || 'fill-neutral-500'}
      viewBox='0 0 24 24'
    >
      <path d='M6 4V1.5h2V4h8V1.5h2V4h4v18H2V4h4ZM4 6v3h16V6H4Zm16 5H4v9h16v-9Z' />
    </svg>
  )
}

CalendarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}
