//UsePriceFormat
import { useEffect, useState } from 'react'

const usePriceFormat = (initialPrice: string = '') => {
  const [formattedPrice, setFormattedPrice] = useState(initialPrice)

  useEffect(() => {
    if (initialPrice.trim() === '') {
      setFormattedPrice('0')
    } else {
      formatPrice(initialPrice)
    }
  }, [initialPrice])

  const formatPrice = (price: string) => {
    // Eliminar cualquier caracter que no sea un número
    price = price.replace(/[^0-9]/g, '')
    price = new Intl.NumberFormat('es-AR').format(parseInt(price, 10))
    setFormattedPrice(price)
  }

  return { formattedPrice, formatPrice }
}

export default usePriceFormat
