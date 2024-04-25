interface IInputFormProps {
  name: string
  type: string
  placeholder: string
  className: string
  required?: boolean
  ref?: React.RefObject<HTMLInputElement>
  onChange: (value: string) => void
}

const TextInput = (props: IInputFormProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <div>
      {props.type === 'textarea' ? (
        <textarea
          name={props.name}
          required={props.required}
          className={props.className}
          placeholder={props.placeholder}
          onChange={handleInputChange}
        />
      ) : (
        <input
          name={props.name}
          type={props.type}
          required={props.required}
          className={props.className}
          placeholder={props.placeholder}
          onChange={handleInputChange}
        />
      )}
    </div>
  )
}

export default TextInput
