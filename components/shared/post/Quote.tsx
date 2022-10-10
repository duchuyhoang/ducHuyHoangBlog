import React from 'react'

enum QUOTE_TYPE {
  INFO = 'INFO',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}

const QuoteClassMap = {
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
}

export interface IQuote {
  title: string
  type: QUOTE_TYPE
  children: React.ReactChildren
}

const Quote = ({ title, type, children }: IQuote) => {
  return (
    <div
      className={`quote mt-5 mb-5 ${
        QuoteClassMap[type] || QuoteClassMap[QUOTE_TYPE.INFO]
      }`}
    >
      <h3 className="quote_title">{title}</h3>
      {children}
    </div>
  )
}

export default Quote
