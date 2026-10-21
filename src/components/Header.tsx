import CartPreview from './CartPreview'
import Page from './Page'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
function Header() {
  const {countProductsCart} = useContext(CartContext)
  return (
    <>
      <header className="navbar">
        <p className="navbar__brand">Shop</p>
        <div className="navbar__actions">
          <p className="navbar__count">Items: {countProductsCart}</p>
          <CartPreview />
        </div>
      </header>
      <Page />
    </>
  )
}

export default Header
