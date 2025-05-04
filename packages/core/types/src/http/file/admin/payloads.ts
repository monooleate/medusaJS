import { BaseUploadFile } from "../common"

export type AdminUploadFile = BaseUploadFile

export interface AdminUploadPreSignedUrlRequest {
  originalname: string
  mime_type: string
  size: number
  access?: "public" | "private"
}
