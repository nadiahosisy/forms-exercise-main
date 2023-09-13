import { useState } from 'react'

import InputField from '../components/InputField'

function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))

    setErrors((prevState) => ({ ...prevState, [name]: null }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let isValid = true
    const newErrors = {}

    // username validation:
    if (formData.username.length < 3) {
      newErrors.username = 'username must be at least 3 characters'
      isValid = false
    }

    // Email validation:
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    // Password validation:
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'password contains uppercase and lowercase letters, numbers and special characters'
      isValid = false
    }

    setErrors(newErrors)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          error={errors.username}
          onChange={handleInputChange}
        />

        <InputField
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          error={errors.email}
          onChange={handleInputChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          error={errors.password}
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default UserForm
