import React from 'react'

const SelectInput: React.FC<{
  name: string
  value: string
  options: string[]
  onChange: (name: string, value: string) => void
}> = ({ name, value, options, onChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(name, event.target.value)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={name}>{name}:</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleSelectChange}
        className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
