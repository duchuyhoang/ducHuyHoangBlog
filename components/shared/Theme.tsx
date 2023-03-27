import React, { useContext, useEffect, useState } from 'react'
import { THEME } from '../../common/enum'

const ThemeContext = React.createContext<any>({
  theme: THEME.LIGHT,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (theme: THEME) => {}
})

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useTheme = () => useContext(ThemeContext)

const Theme = ({ children }: any) => {
  const [theme, setTheme] = useState(THEME.LIGHT)

  useEffect(() => {
    window.document.body.style.backgroundColor = 'var(--bg-primary)!important'
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Theme
