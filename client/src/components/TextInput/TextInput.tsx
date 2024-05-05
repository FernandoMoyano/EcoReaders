import React, { forwardRef } from 'react'

interface IInputFormProps {
  name: string
  type: string
  placeholder: string
  className: string
  required?: boolean
  value: string | number
  onChange: (name: string, value: string) => void
}

const TextInput = forwardRef<HTMLTextAreaElement | HTMLInputElement, IInputFormProps>((props, ref) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onChange(props.name, event.target.value)
  }

  return (
    <div>
      {props.type === 'textarea' ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>} // Se ajusta el tipo de ref para textarea
          name={props.name}
          required={props.required}
          value={props.value}
          className={props.className}
          placeholder={props.placeholder}
          onChange={handleInputChange}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>} // Se ajusta el tipo de ref para input
          name={props.name}
          type={props.type}
          required={props.required}
          value={props.value}
          className={props.className}
          placeholder={props.placeholder}
          onChange={(e) => handleInputChange(e)}
        />
      )}
    </div>
  )
})

export default TextInput
