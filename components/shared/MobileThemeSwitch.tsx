import React from 'react'
import { useTheme } from './Theme'
import { BsMoon, BsSun } from 'react-icons/bs'
import { THEME } from '../../common/enum'
const MobileThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="d-flex d-md-none p-3 mobile-theme-container"
      //   onClick={handleScrollToTop}
    >
      {theme === THEME.DARK ? (
        <BsSun
          style={{
            cursor: 'pointer',
            fill: '#fff'
          }}
          size={21}
          onClick={() => {
            setTheme(THEME.LIGHT)
          }}
        />
      ) : (
        <BsMoon
          style={{
            cursor: 'pointer',
            fill: '#fff'
          }}
          size={19}
          onClick={() => {
            setTheme(THEME.DARK)
          }}
        />
      )}
    </div>
  )
}

export default MobileThemeSwitch
