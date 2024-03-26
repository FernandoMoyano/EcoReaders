//UsePriceFormat
import { useEffect, useState } from 'react'

const usePriceFormat = (initialPrice: string = '') => {
  const [formattedPrice, setFormattedPrice] = useState(initialPrice)

  useEffect(() => {
    formatPrice(initialPrice)
  }, [initialPrice])

  const formatPrice = (price: string) => {
    // Eliminar cualquier caracter que no sea un número
    price = price.replace(/[^0-9]/g, '')
    // Si el precio es vacío o solo contiene el punto decimal, establecerlo como "0"
    if (price.trim() === '' || price === '.') {
      setFormattedPrice('0')
    } else {
      // Formatear el precio-Agregar punto decimal
      const numberPrice = parseFloat(price)
      const formatted = new Intl.NumberFormat('es-AR').format(numberPrice)
      setFormattedPrice(formatted)
    }
  }
  console.log(formattedPrice)

  return { formattedPrice, formatPrice }
}

export default usePriceFormat
