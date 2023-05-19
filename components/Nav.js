import Link from "next/link"
import { CategoriesIcon, HomeIcon, LogoutIcon, OrderIcon, ProductsIcon, SettingsIcon, StoreIcon } from "./icons/icons"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import Logo from "./Logo"

const Nav = ({ show }) => {
  const inactiveLink = 'flex gap-2 p-1'
  const activeLink = inactiveLink + ' bg-highlight text-black rounded-md'
  const inactiveIcon = 'w-6 h-6'
  const activeIcon = inactiveIcon + ' text-primary'
  const router = useRouter()
  const { pathname } = router
  const logout = async () => {
    await router.push('/')
    await signOut()
  }

  return (
    <aside className={(show ? 'left-0' : '-left-full') + "  text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
      <div className={(show && 'hidden') +" mb-4 mr-2"}>
        <Logo />
      </div>
      <nav className="flex flex-col gap-2">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <HomeIcon style={pathname === '/' ? activeIcon : inactiveIcon}/>
          Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <ProductsIcon style={pathname === '/products' ? activeIcon : inactiveIcon}/>
          Products
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <CategoriesIcon style={pathname === '/categories' ? activeIcon : inactiveIcon}/>
          Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <OrderIcon style={pathname === '/orders' ? activeIcon : inactiveIcon}/>
          Orders
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <SettingsIcon style={pathname === '/settings' ? activeIcon : inactiveIcon}/>
          Settings
        </Link>
        <button className={inactiveLink} onClick={logout}>
          <LogoutIcon style={inactiveIcon}/>
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default Nav