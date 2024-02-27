declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: string
    readonly DB_PORT: string
    readonly DB_HOST: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string
    readonly DB_DATABASE: string
    readonly ACCESS_TOKEN_SECRET: string
    readonly REFRESH_TOKEN_SECRET: string
  }
}
