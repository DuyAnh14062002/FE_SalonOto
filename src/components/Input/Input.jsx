export default function Input({
  register,
  className,
  name,
  classNameInput,
  classNameError,
  errorMessage,
  labelName,
  ...rest
}) {
  const registerResult = name && register(name);
  return (
    <div class={className}>
      <label class="form-label" for={name}>
        {labelName}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        class={classNameInput}
        {...registerResult}
        {...rest}
      />
      <div class={classNameError} style={{ minHeight: "22px" }}>
        {errorMessage}
      </div>
    </div>
  );
}
