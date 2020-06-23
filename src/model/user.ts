/** @format */

class User {
  id: number
  username: string
  email: string
  image?: string
  constructor(data: User.RawData) {
    this.id = data.id
    this.username = data.username
    this.email = data.email
    this.image = data.image
  }
}

namespace User {
  export class RawData {
    id: number
    username: string
    email: string
    image?: string
  }
  export interface UserVo {
    email: string
    password: string
  }
}

export default User
