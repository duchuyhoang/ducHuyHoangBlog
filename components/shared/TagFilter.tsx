import React from 'react'

interface ITagFilter {
  isActive: boolean
  label: string
  value: any
  handleToggle: (value: any, isActive: boolean) => void
}

const TagFilter = ({ label, handleToggle, value, isActive }: ITagFilter) => {
  return (
    <div
      className={`tag-filter ${isActive ? 'tag-filter-active' : ''}`}
      onClick={() => {
        handleToggle(value, !isActive)
      }}
    >
      {label}
    </div>
  )
}

export default TagFilter
