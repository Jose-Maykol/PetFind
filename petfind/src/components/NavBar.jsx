import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from '@nextui-org/react'
import GoogleIcon from './Icons/GoogleIcon'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import UserService from '../services/UserService'
import useAuthStore from '../store/useAuthStore'
import LogOutIcon from './Icons/LogOutIcon'
import { API_URL } from '../config/config'

export default function NavBar () {
  const [isLogged, setIsLogged] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTokens } = useAuthStore()

  const handleLoginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`
  }

  const handleLogout = () => {
    UserService.logOut().then((res) => {
      setIsLogged(false)
    })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      Cookies.set('accessToken', code, {
        expires: 1
        // secure: true
      })
    }
  }, [])

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      setIsLogged(true)
      setTokens({ accessToken })
    }
    console.log(isLogged)
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
          {isLogged && (
            <NavbarItem>
              <Link to='/my-reports'>
                <p className='text-base font-semibold hover:text-neutral-500'>Mis reportes</p>
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            {(isLogged)
              ? (
                <div className='flex flex-row items-center gap-2 justify-center'>
                  <User
                    name={userInfo?.name}
                    description={userInfo?.email}
                    avatarProps={{ src: userInfo?.profilePicture }}
                  />
                  <Button
                    isIconOnly
                    variant='light'
                    startContent={<LogOutIcon width={24} height={24} fill='fill-neutral-500' />}
                    onClick={handleLogout}
                  />
                </div>
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
          {isLogged && (
            <NavbarMenuItem>
              <Link to='/my-reports'>
                <p className='text-base font-semibold hover:text-neutral-500'>Mis reportes</p>
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </>
  )
}
