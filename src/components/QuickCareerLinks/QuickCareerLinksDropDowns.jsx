import React from 'react'

const QuickCareerLinksDropDowns = ({ filteredRecords, onDropdownSelect }) => {
    return (
        <div className='absolute top-18 bg-gray-200 max-h-36 overflow-y-scroll 
                                        w-full rounded-xl z-10'>
            {filteredRecords.map((role) => {
                return <div onClick={() => onDropdownSelect(role)}
                    className='p-2 hover:cursor-pointer hover:bg-gray-800 
                                                    hover:text-white w-full'
                    key={role.id}>
                    {role.displayName}
                </div>
            })}
        </div>
    )
}

export default QuickCareerLinksDropDowns