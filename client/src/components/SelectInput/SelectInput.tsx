//SELECT INPUT

import React from 'react'

interface ISelectInputProps {
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const SelectInput = (props: ISelectInputProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <select
        name={props.name}
        value={props.value}
        onChange={handleSelectChange}
        className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
