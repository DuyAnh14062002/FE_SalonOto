import { useState } from "react";

export default function Input({
  register,
  className = "form-outline w-75",
  name,
  classNameError = "invalid-feedback d-block",
  classNameInput = "form-control",
  errorMessage,
  labelName,
  ...rest
}) {
  const registerResult = name && register(name);
  const [openEye, setOpenEye] = useState(false);
  const handleOpenEye = () => {
    if (rest.type === "password") {
      if (openEye) {
        return "text";
      }
      return "password";
    }
  };
  const toggleEye = () => {
    setOpenEye((prev) => !prev);
  };
  return (
    <div class={className}>
      <label class="form-label" for={name}>
        {labelName}
      </label>
      <div className="position-relative">
        <input
          id={name}
          name={name}
          class={classNameInput}
          {...registerResult}
          {...rest}
          type={handleOpenEye()}
        />
        {rest.type === "password" && openEye && (
          <i
            class="fa-regular fa-eye position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
            onClick={toggleEye}
          ></i>
        )}
        {rest.type === "password" && !openEye && (
          <i
            class="fa-regular fa-eye-slash position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
            onClick={toggleEye}
          ></i>
        )}
      </div>
      <div class={classNameError} style={{ minHeight: "22px" }}>
        {errorMessage}
      </div>
    </div>
  );
}
