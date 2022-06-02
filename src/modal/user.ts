import { request } from './request'

export interface User {
    name: string
    type: 'normal' | 'root'
}

type GetUsers = () => Promise<User[]>
export const getUsers: GetUsers = async () => {
    const res = await request.get(`userList`)

    return res.data
}

type CreateUser = (user: User) => Promise<void>
export const createUser: CreateUser = async ({ name, type }) => {
    const res = await request.post(`user/${name}`, { type })

    return res.data
}

type RemoveUser = (name: string) => Promise<void>
export const removeUser: RemoveUser = async (name) => {
    const res = await request.delete(`user/${name}`)

    return res.data
}
