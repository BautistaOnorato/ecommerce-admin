import Nav from "@/components/Nav"
import { useSession, signIn } from "next-auth/react"
import { CrossIcon, MenuIcon } from "./icons/icons"
import { useState } from "react"
import Logo from "./Logo"

export default function Layout({ children }) {
  const { data: session } = useSession()
  const [toggleMenu, setToggleMenu] = useState(false)

  if(!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button className="bg-white p-2 px-4 rounded-lg" onClick={() => signIn('google')}>
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center justify-between p-4">
        <button onClick={() => setToggleMenu(!toggleMenu)}>
          {toggleMenu ? <CrossIcon /> : <MenuIcon />}
        </button>
        <Logo />
      </div>
      <div className="bg-bgGray min-h-screen flex">
        <Nav show={toggleMenu}/>
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
