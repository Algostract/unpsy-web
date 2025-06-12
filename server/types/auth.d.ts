declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    avatar: string
    email: string
    createdAt: string
    updatedAt: string
  }

  /*  interface UserSession {
     // Add your own fields
   }
 
   interface SecureSessionData {
     // Add your own fields
   } */
}

export {}
