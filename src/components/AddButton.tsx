import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import type { ProductPanelType } from "../types/ProductPanelType"

type AddButtonProps = {
  product: ProductPanelType
}

function AddButton({product}: AddButtonProps) {
  const {addProductToCart} = useContext(CartContext)
  return (
    <button type="button" className="button" onClick={()=> addProductToCart(product)}>
      Add to cart
    </button>
  )
}

export default AddButton
