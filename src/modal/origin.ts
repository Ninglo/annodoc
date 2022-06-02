import { request } from './request'
import { Entity, Entitys, Fields, Inputs } from './type'

export const enum OriginType {
    begin = 1,
    doing,
    finish
}

export interface Origin {
    name: string
    status: OriginType
    fields: Fields
    inputs: Inputs
    result: Entitys
    _id: number
}

export interface GetOriginsProps {
    name?: string
    status?: OriginType
}
type GetOrigins = (data?: GetOriginsProps) => Promise<Origin[] | undefined>
export const getOrigins: GetOrigins = async (data) => {
    const res = await request.get('origins', { data })

    return res.data.origins
}

type CreateOrigin = (origin: Omit<Origin, '_id' | 'status'>) => Promise<void>
export const createOrigin: CreateOrigin = async (origin) => {
    const res = await request.post(`origin`, origin)

    return res.data
}

type RemoveOrigin = (id: number) => Promise<void>
export const removeOrigin: RemoveOrigin = async (_id) => {
    const res = await request.delete(`origin`, { data: { _id } })

    return res.data
}

type UpdateOrigin = (origin: Origin) => Promise<void>
export const updateOrigin: UpdateOrigin = async (origin) => {
    const res = await request.patch(`origin`, origin)

    return res.data
}
