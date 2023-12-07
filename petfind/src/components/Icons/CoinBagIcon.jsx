import { PropTypes } from 'prop-types'

export default function CoinBagIcon ({ width, height, fill }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || 36}
      height={height || 36}
      viewBox='0 0 36 36'
    >
      <path fill='currentColor' d='M24.89 26h7.86c-.66-8.71-4.41-14.12-9.22-17.32l2.19-4.78a1 1 0 0 0-.91-1.4H11.1a1 1 0 0 0-.91 1.4l1.2 2.6h10.12l-.9 2h-1.85A24.9 24.9 0 0 1 20 13.19a24.49 24.49 0 0 1 .32 3l-1.58 1.11a22.54 22.54 0 0 0-.32-3.86A21.74 21.74 0 0 0 17 8.5h-1a28.22 28.22 0 0 0-2.48 3.7a23.91 23.91 0 0 0-1.49 3.46l-1.37-.91a22.78 22.78 0 0 1 1.47-3.34a30.81 30.81 0 0 1 1.92-2.91H12.3l.08.17c-5.3 3.53-9.33 9.73-9.33 20.08a1.65 1.65 0 0 0 1.56 1.75h8a2.67 2.67 0 0 1 1.6-4.5a2.67 2.67 0 0 1-.37-1.34a2.7 2.7 0 0 1 2.7-2.7h6a2.7 2.7 0 0 1 2.7 2.7a2.63 2.63 0 0 1-.35 1.34Z' class='clr-i-solid clr-i-solid-path-1' />
      <path fill='currentColor' d='M21.6 28.5a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1Z' class='clr-i-solid clr-i-solid-path-2' />
      <path fill='currentColor' d='M22.54 23.5h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z' class='clr-i-solid clr-i-solid-path-3' /><path fill='currentColor' d='M22 31.5h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z' class='clr-i-solid clr-i-solid-path-4' />
      <path fill='currentColor' d='M32.7 31.5h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z' class='clr-i-solid clr-i-solid-path-5' /><path fill='currentColor' d='M33.7 27.5h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z' class='clr-i-solid clr-i-solid-path-6' />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  )
}

CoinBagIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}
