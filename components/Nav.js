import Link from "next/link"
import { HomeIcon, OrderIcon, ProductsIcon, SettingsIcon, StoreIcon } from "./icons/icons"
import { useRouter } from "next/router"

const Nav = () => {
  const inactiveLink = 'flex gap-2 p-1'
  const activeLink = inactiveLink + ' bg-white text-blue-900 rounded-l-lg'
  const pathname = useRouter().pathname

  return (
    <aside className="text-white p-4 pr-0">
      <Link href={'/'} className="flex gap-2 mb-4 mr-2">
        <StoreIcon />
        <span>
          Ecommerce-admin
        </span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <HomeIcon />
          Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <ProductsIcon />
          Products
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <OrderIcon />
          Orders
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <SettingsIcon />
          Settings
        </Link>
      </nav>
    </aside>
  )
}

export default Nav