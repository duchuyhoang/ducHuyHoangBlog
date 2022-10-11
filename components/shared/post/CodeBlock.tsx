import React, { useCallback, useMemo, useState } from 'react'
import SyntaxHighlighter, { LanguageIconMap } from '../SyntaxHighLighter'
import vs2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015'

import { HiClipboard } from 'react-icons/hi'
import { TiTick } from 'react-icons/ti'

const CodeTag = props => {
  //   console.log('code', props)
  //   const listElement = useMemo(() => {
  //     let filteredList = props.children ? props.children.filter(v => !!v)[0] : []
  //     let lineCount = 1
  //     let listNewLineIndex: number[] = [0]
  //     filteredList.forEach((element, index) => {
  //       let renderComponent =
  //         typeof element === 'string' ? <span>{element}</span> : element
  //       if (
  //         (Array.isArray(renderComponent.props.children)
  //           ? renderComponent.props.children[0]
  //           : renderComponent.props.children
  //         ).includes('\n')
  //         //   && nextLineIndex != index
  //       ) {
  //         listNewLineIndex.push(index + 1)
  //       }
  //     })
  // return <>{props.children}</>

  //     // return props.children ? (
  //     //   filteredList.map((Component, index) => {
  //     //     let renderComponent =
  //     //       typeof Component === 'string' ? <span>{Component}</span> : Component
  //     //     return (
  //     //       <>
  //     //         <span key={`index_${index}`}>
  //     //           {listNewLineIndex.indexOf(index) !== -1 && (
  //     //             <span className="mr-2">{lineCount++}</span>
  //     //           )}
  //     //           {renderComponent}
  //     //         </span>
  //     //       </>
  //     //     )
  //     //   })
  //     // ) : (
  //     //   <></>
  //     // )
  //   }, [props.children])
  return <>{props.children}</>
}

const PreTag = ({
  handleCopy,
  language,
  fileName
}: {
  handleCopy: (okCallback: () => void, failedCallback: (e: any) => void) => void
  language: string
  fileName: string
}) => {
  return preProps => {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const onCopySucceed = () => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }

    const onCopyFailed = e => {
      console.log(e)
    }

    const LanguageIcon = LanguageIconMap[language] || LanguageIconMap['js']
    return (
      <section>
        <div className="language-wrapper d-flex align-center">
          <LanguageIcon size={20} />
          <p className="ml-1">{fileName}</p>
        </div>
        <div className="code-wrapper">
          <div className="copy-wrappper">
            {!isCopied ? (
              <HiClipboard
                size={26}
                onClick={() => {
                  handleCopy(onCopySucceed, onCopyFailed)
                }}
              />
            ) : (
              <TiTick size={30} style={{ fill: '#28a745' }} />
            )}
          </div>
          <pre
            lang={`language-${language}`}
            style={{
              overflow: 'auto'
            }}
          >
            {preProps.children}
          </pre>
        </div>
      </section>
    )
  }
}

const CodeBlock = props => {
  const handleClickCopy = useCallback(
    (okCb, failedCb) => {
      const content = props.children.props.children
      navigator.clipboard
        .writeText(content)
        .then(() => {
          if (typeof okCb === 'function') {
            okCb()
          }
        })
        .catch(e => {
          if (typeof failedCb === 'function') {
            failedCb()
          }
        })
    },
    [props.children]
  )
  const language = useMemo(() => {
    const extracted = props?.children?.props?.className?.split('-')[1]
    return extracted ? extracted : 'javascript'
  }, [props?.children?.props?.className])

  const fileName = useMemo(() => {
    return props?.filename || 'example'
  }, [props?.filename])

  return (
    <>
      <SyntaxHighlighter
        showLineNumbers={!!props.showLine}
        CodeTag={CodeTag}
        PreTag={PreTag({
          handleCopy: handleClickCopy,
          language,
          fileName
        })}
        children={props.children.props.children?.trim()}
        language={language}
        style={{
          ...vs2015,
          'hljs-comment': {
            color: '#A6ACCD',
            fontStyle: 'initial'
          },
          'hljs-keyword': {
            color: '#C792EA'
          },
          'hljs-built_in': {
            color: '#89DDFF'
          },
          'hljs-name': {
            color: '#89DDFF'
          },
          'hljs-selector-tag': {
            color: '#89DDFF'
          },
          'hljs-tag': {
            color: '#89DDFF'
          },
          'hljs-string': {
            color: '#C3E88D'
          },
          'hljs-attr': {
            color: '#C792EA'
          },
          'hljs-addition': {
            color: '#F07178'
          },
          'hljs-literal': {
            color: '#F07178'
          },
          'hljs-section': {
            color: '#F07178'
          },
          'hljs-template-tag': {
            color: '#F07178'
          },
          'hljs-template-variable': {
            color: '#F07178'
          },
          'hljs-title': {
            color: '#F07178'
          },
          'hljs-type': {
            color: '#F07178'
          },
          'hljs-selector-class': {
            color: '#FFCB6B'
          },
          'hljs-number': {
            color: '#FFCB6B'
          }
        }}
      />
    </>
  )
}

// interface IStyle=Maybe<React.CSSProperties>

export default CodeBlock
