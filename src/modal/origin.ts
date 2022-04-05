import { request } from './request';
import { Fields, Inputs } from './type';

export const enum OriginType {
    begin = 1,
    doing,
    finish
}

export interface Origin {
    name: string;
    status: OriginType;
    fields: Fields;
    inputs: Inputs;
    id: number;
}

export interface GetOriginsProps {
    name?: string;
    status?: OriginType;
}
type GetOrigins = (data: GetOriginsProps) => Promise<Origin[]>;
export const getOrigins: GetOrigins = async (data) => {
    return [{ id: 1, fields: ['1', '2'], inputs: ['hhhhhh', 'a'], name: 'ah', status: 1 }];
    const res = await request.get('origins', { data });

    return res.data;
};

type CreateOrigin = (origin: Omit<Origin, 'id' | 'status'>) => Promise<void>;
export const createOrigin: CreateOrigin = async (origin) => {
    return;
    const res = await request.post(`origin`, origin);

    return res.data;
};

type RemoveOrigin = (id: number) => Promise<void>;
export const removeOrigin: RemoveOrigin = async (id) => {
    return;
    const res = await request.delete(`origin/${id}`);

    return res.data;
};
