export type Alert = {
  id?: string
  severity: string
  createdAt: number | string
  name: string
  description: string
  message?: string
  uuid?: string
  code?: string | number
  [key: string]: unknown
}
