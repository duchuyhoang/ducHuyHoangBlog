import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php'

import { IoLogoNodejs } from 'react-icons/io'
import { DiPython, DiSass } from 'react-icons/di'
import { FaPhp } from 'react-icons/fa'
import { SiCss3, SiTypescript } from 'react-icons/si'

export const LanguageIconMap = {
  javascript: IoLogoNodejs,
  js: IoLogoNodejs,
  typescript: SiTypescript,
  ts: SiTypescript,
  python: DiPython,
  php: FaPhp,
  sass: DiSass,
  css: SiCss3,
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

export default SyntaxHighlighter;


