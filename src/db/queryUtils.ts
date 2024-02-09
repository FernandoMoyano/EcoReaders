import { pool } from './connection'

//Get
export const selectQuery = async <T>(queryString: string): Promise<Partial<T>[]> => {
  const [results] = await pool.execute(queryString)
  return results as T[]
}

//POST
/* export const modifyQuery = async (queryString: string, values?: CreateBook): Promise<ResultSetHeader> => {
  const [result] = await pool.execute(queryString, values)
  return result as ResultSetHeader
} */
