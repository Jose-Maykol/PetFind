import { PropTypes } from 'prop-types'

export default function SearchIcon ({ width, height, fill }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || 24}
      height={height || 24}
      className={fill || 'fill-neutral-500'}
      viewBox='0 0 512 512'
    >
      <path d='M464 428L339.92 303.9a160.48 160.48 0 0 0 30.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0 0 94.58-30.72L428 464ZM209.32 319.69a110.38 110.38 0 1 1 110.37-110.37a110.5 110.5 0 0 1-110.37 110.37Z' />
    </svg>
  )
}

SearchIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}
