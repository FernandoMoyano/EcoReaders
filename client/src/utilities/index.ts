// Definición de la función formatearNumero
export function formatearNumero(numero: number) {
  // Convertir el número a una cadena y dividirlo en partes entera y decimal
  const partes = String(numero).split('.')
  // Obtener la parte entera del número
  let parteEntera = partes[0]
  // Formatear la parte entera agregando separadores de miles
  parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  // Obtener la parte decimal del número (si existe)
  const parteDecimal = partes.length > 1 ? ',' + partes[1] : ',00'
  // Combinar la parte entera y la parte decimal
  const numeroFormateado = parteEntera + parteDecimal

  return numeroFormateado
}
