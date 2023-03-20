/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
// import { PropTypes } from 'prop-types';
import Truncate from './Truncate'
// import './ShowMoreText.css';

interface IShowMoreText {
  children: any
  lines: number
  more: React.ReactNode
  less: React.ReactNode
  anchorClass: string
  className?: string
  onClick?: (expanded: any, e: any) => any
  expanded?: boolean
  width?: number
  keepNewLines: boolean
  truncatedEndingComponent?: React.ReactNode
  expandByClick?: boolean
  onTruncate?: any
}

class ShowMoreText extends Component<IShowMoreText, any, any> {
  _isMounted = false

  constructor(props: IShowMoreText) {
    super(props)

    this.state = {
      expanded: false,
      truncated: false
    }
  }

  static defaultProps = {
    lines: 3,
    more: 'Show more',
    less: 'Show less',
    anchorClass: 'show-more-less-clickable',
    onClick: undefined,
    expanded: false,
    width: 0,
    keepNewLines: false,
    truncatedEndingComponent: '... ',
    expandByClick: true,
    onTruncate: undefined
  }

  componentDidMount() {
    this._isMounted = true

    const _self = this
    if (this._isMounted) {
      this.setState({
        expanded: _self.props.expanded as any
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleTruncate = (truncated: any) => {
    if (this._isMounted && truncated !== this.state.truncated) {
      this.setState({
        truncated
      })
      if (truncated) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(this as any).truncateRef.onResize()
      }
      this.props.onTruncate?.()
    }
  }

  toggleLines = (event: any) => {
    event.preventDefault()
    const _self = this

    if (!_self.props.expandByClick) {
      if (_self.props.onClick) {
        _self.props.onClick(_self.state.expanded, event)
      }

      return
    }

    if (this._isMounted) {
      this.setState(
        {
          expanded: !this.state.expanded
        },
        () => {
          if (_self.props.onClick) {
            _self.props.onClick(_self.state.expanded, event)
          }
        }
      )
    }
  }

  render() {
    const {
      children,
      more,
      less,
      lines,
      anchorClass,
      className,
      width,
      keepNewLines,
      truncatedEndingComponent,
      onTruncate
    } = this.props

    const { expanded, truncated } = this.state

    return (
      <div className={className}>
        <Truncate
          width={width}
          lines={!expanded && lines}
          ellipsis={
            <span>
              {truncatedEndingComponent}
              <span className={anchorClass} onClick={this.toggleLines}>
                {more}
              </span>
            </span>
          }
          onTruncate={this.handleTruncate}
          ref={ref => ((this as any).truncateRef = ref)}
        >
          {keepNewLines
            ? children?.split('\n').map((line: any, i: any, arr: any) => {
                line = <span key={i}>{line}</span>

                if (i === arr.length - 1) {
                  return line
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions

                  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  return [line, <br key={i + 'br'} />]
                }
              })
            : children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            {' '}
            <span className={anchorClass} onClick={this.toggleLines}>
              {less}
            </span>
          </span>
        )}
      </div>
    )
  }
}

export default ShowMoreText
