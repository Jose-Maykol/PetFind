import { PropTypes } from 'prop-types'

export default function PhoneIcon ({ width, height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={fill}
      width={width}
      height={height}
      viewBox="0 0 24 24" >
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    </svg>
  )
}

PhoneIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}
