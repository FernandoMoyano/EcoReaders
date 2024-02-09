declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number
    readonly DB_PORT: string
    readonly DB_HOST: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string
    readonly DB_DATABASE: string
  }
}
