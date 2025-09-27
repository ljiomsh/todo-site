import React from 'react'
import { TagFilterProps } from '../types'

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onSelectTag, filter, onFilterChange }) => {
    return (
        <div className="filters">
            <div className="filter-group">
                <button
                    onClick={() => onSelectTag(null)}
                    className={`filter-button ${selectedTag === null ? 'active' : ''}`}
                >
                    전체
                </button>
                {tags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => onSelectTag(tag)}
                        className={`filter-button ${selectedTag === tag ? 'active' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="filter-group">
                <button
                    onClick={() => onFilterChange('all')}
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                >
                    전체 보기
                </button>
                <button
                    onClick={() => onFilterChange('active')}
                    className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                >
                    미완료
                </button>
                <button
                    onClick={() => onFilterChange('completed')}
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                >
                    완료
                </button>
            </div>
        </div>
    )
}

export default TagFilter 