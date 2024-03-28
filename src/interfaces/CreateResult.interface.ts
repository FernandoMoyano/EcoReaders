import { ResultSetHeader, RowDataPacket } from 'mysql2'

export interface CreateResult {
  resultingBook: ResultSetHeader
  // Suponiendo que los resultados de la consulta de usuario sean un array de RowDataPacket
  publishedBy: RowDataPacket[]
}
