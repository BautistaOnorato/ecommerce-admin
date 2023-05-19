import React from 'react'
import { StoreIcon } from './icons/icons'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} className="flex gap-2">
      <StoreIcon />
      <span>
        Ecommerce-admin
      </span>
    </Link>
  )
}

export default Logo