import React from 'react'
import Button from '../components/generals/Button'
import Input from '../components/generals/Input'
import { Eye, Mail } from 'lucide-react'

const LadingPage = () => {
  return (
    <>
      <Button variant="primary" label="Iniciar Sesion" />
      <Input label="Email" placeholder="Email" iconLeft={<Mail />} />
    </>
  )
}

export default LadingPage