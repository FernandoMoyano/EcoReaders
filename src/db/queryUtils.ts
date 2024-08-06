import { pool } from './connection'
import { IBookRow } from '../interfaces/Book.interface'

//Get
export const selectQuery = async <T>(queryString: string): Promise<Partial<T>[]> => {
  const [results] = await pool.execute(queryString)
  return results as T[]
}

//Crear - Actualizar
export const insertQuery = async <T>(queryString: string, values: unknown[]): Promise<T> => {
  const [result] = await pool.execute(queryString, values)
  return result as T
}

//Funcion que prepara las columnas a actualizar
// changes -> Cambios parciales objeto IBookRow.
// validColumns -> representa las columnas que pueden ser actualizadas

/* retorno{
  columnsToUpdate -> columnas a actualizar `column1=?`
  filteredChanges ->Un objeto parcial de tipo `IBookRow` que 
  contiene solo los valores que se deben actualizar 
} */

export function prepareUpdateQuery(
  changes: Partial<IBookRow>,
  validColumns: string[],
): { columnsToUpdate: string; filteredChanges: Partial<IBookRow> } {
  // Filtrar columnas y preparar la parte de la consulta a actualizar
  const columnsToUpdate = Object.keys(changes)
    .filter((column) => validColumns.includes(column))
    .map((column) => `${column} = ?`)
    .join(', ')

  if (columnsToUpdate.length === 0) {
    throw new Error('No valid columns to update')
  }

  // Convertir created_at a un formato adecuado para MySQL si está presente
  if (changes.created_at) {
    changes.created_at = new Date(changes.created_at).toISOString().slice(0, 19).replace('T', ' ')
  }

  // Filtrar los cambios para incluir solo los valores que queremos actualizar
  const filteredChanges = validColumns.reduce((acc, key) => {
    if (changes[key] !== undefined) {
      acc[key] = changes[key]
    }
    return acc
  }, {} as Partial<IBookRow>)

  return { columnsToUpdate, filteredChanges }
}
