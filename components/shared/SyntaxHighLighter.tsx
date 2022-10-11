import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import powershell from 'react-syntax-highlighter/dist/esm/languages/hljs/powershell'
import jsx from 'react-syntax-highlighter/dist/esm/languages/hljs/vbscript-html'

import { IoLogoNodejs } from 'react-icons/io'
import { DiPython, DiSass, DiReact } from 'react-icons/di'
import { FaPhp } from 'react-icons/fa'
import { SiCss3, SiTypescript, SiGnubash, SiPowershell } from 'react-icons/si'

export const LanguageIconMap = {
  javascript: IoLogoNodejs,
  jsx: DiReact,
  tsx: DiReact,
  js: IoLogoNodejs,
  typescript: SiTypescript,
  ts: SiTypescript,
  python: DiPython,
  php: FaPhp,
  sass: DiSass,
  css: SiCss3,
  bash: SiGnubash,
  powershell: SiPowershell
}

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('typescript', ts)
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('tsx', ts)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('php', php)
SyntaxHighlighter.registerLanguage('powershell', powershell)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', jsx)

export default SyntaxHighlighter
