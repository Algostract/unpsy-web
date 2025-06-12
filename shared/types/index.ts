export type PurchaseStatus = 'pending' | 'success' | 'failed'

export interface Scale {
  name: ScaleName
  type: ScaleType
  count: number
  monthlyPrice: number
  subScales: string[]
  publishedAt: string
  updatedAt: string
}

export interface SubscribedScale extends Scale {
  options: { name: string; value: number }[]
}

/* MISC */
export interface JWTToken {
  id: string
  ita: number
  exp: number
}

export interface AuthResponse {
  isRegistered: boolean
  timeoutAt: string
  retryTimeoutAt: string
  token:
    | {
        auth: string
      }
    | {
        access: string
        refresh: string
      }
  user:
    | {
        name: string
        email: string
      }
    | {
        phone: string
      }
}

export interface User {
  name: string
  email: string | null
  phone: string | null
  subscriptions: Subscription[]
  reports: Report[]
  preference: Preference | null
  // feedbacks: Feedback[];
}

export interface Subscription {
  id: string
  name: 'Free' | 'Basic' | 'Pro'
  expiresAt: Date
}

export interface Report {
  id: string
  scale: ScaleName
  status: 'Draft' | 'Complete'
  data: object
  value: object
  patientId: string | null
  createdAt: Date | null
  modifiedAt: Date | null
}

export interface Preference {
  colorMode: 'light' | 'dark'
  payment: 'upi'
}

/* Server Only */
export const resourceTypes = ['user', 'feedback', 'subscription', 'transaction', 'report'] as const

export type ResourceType = (typeof resourceTypes)[number]

export type NotionDB = { [K in ResourceType]: string }
