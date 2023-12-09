import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from '@nextui-org/react'
import GoogleIcon from './Icons/GoogleIcon'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import UserService from '../services/UserService'
import useAuthStore from '../store/useAuthStore'

export default function NavBar () {
  const [isLogged, setIsLogged] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTokens } = useAuthStore()

  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:8000/auth/google'
    console.log('Login with Google')
  }

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const jwtToken = Cookies.get('jwtToken')
    if (accessToken && jwtToken) {
      setIsLogged(true)
      setTokens({ accessToken, jwtToken })
    }
  }, [])

  const userQuery = useQuery('user', UserService.getInfoUser, {
    enabled: isLogged,
    retry: 2,
    staleTime: Infinity
  })

  const userInfo = userQuery.data?.data.userInfo

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <h1 className='text-2xl font-bold hover:text-neutral-600'>Petfind</h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex gap-4'>
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
            {(isLogged)
              ? (
                <User
                  name={userInfo?.name}
                  description={userInfo?.email}
                  avatarProps={{ src: userInfo?.profilePicture }}
                />
                )
              : (
                <Button
                  startContent={<GoogleIcon width={24} height={24} />}
                  variant='bordered'
                  onClick={handleLoginWithGoogle}
                >
                  <p className='font-semibold'>Iniciar sesión con Google</p>
                </Button>
                )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link to='/'>
              <p className='text-base font-semibold hover:text-neutral-500'>Inicio</p>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link to='/report'>
              <p className='text-base font-semibold hover:text-neutral-500'>Reportar</p>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </>
  )
}
