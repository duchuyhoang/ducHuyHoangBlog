import { useEffect } from 'react'

interface IDocumentTitle {
  title: string
}

const useDocumentTitle = ({ title }: IDocumentTitle) => {
  useEffect(() => {
    window.document.title = title
  }, [title])
}

export default useDocumentTitle
