import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import GoogleIcon from './Icons/GoogleIcon'
import { Link, Outlet } from 'react-router-dom'

export default function NavBar () {
  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:8000/auth/google'
    console.log('Login with Google')
  }

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <h1 className='text-2xl font-bold hover:text-neutral-600'>Petfind</h1>
        </NavbarBrand>
        <NavbarContent justify='center'>
          <NavbarItem>
            <Link to='/'>
              <p className='text-base font-semibold hover:text-neutral-500'>Inicio</p>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to='/report'>
              <p className='text-base font-semibold hover:text-neutral-500'>Reportar</p>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Button
              startContent={<GoogleIcon width={24} height={24} />}
              variant='bordered'
              onClick={handleLoginWithGoogle}
            >
              <p className='font-semibold'>Iniciar sesión con Google</p>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  )
}
