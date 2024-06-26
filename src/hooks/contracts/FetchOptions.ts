export interface FetchOptions {
  url: string
  method: string
  headers?: Record<string, string>
  includeAuth?: Boolean
}
