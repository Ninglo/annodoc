import { request } from './request'

interface Auth {
    auth?: string
    type?: 'normal' | 'root'
    name?: string
}

export const getAuth = (): Auth => {
    const auth = document.cookie.split(' ').find((item) => item.startsWith('auth=')) ?? ''
    const type: any = document.cookie.split(' ').find((item) => item.startsWith('type=')) ?? ''
    const name = document.cookie.split(' ').find((item) => item.startsWith('name=')) ?? ''

    return { auth, type, name }
}

export const setAuth = ({ auth, type, name }: Auth) => {
    document.cookie = `auth=${auth}`
    document.cookie = `type=${type}`
    document.cookie = `name=${name}`
}

export interface LoginData {
    name: string
    password: string
}
type CheckLogin = (data: LoginData) => Promise<void>
export const checkLogin: CheckLogin = async (loginData) => {
    const res = await request.post('login', loginData)
    const { auth, type, name } = res.data
    setAuth({ auth, type, name })
}
