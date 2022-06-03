import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ITagWorkspaceDataProps } from "../../pages/workspace/main";

export const workspaceContext = createContext<Workspace>([null, () => { }])

type Workspace = [workspace: ITagWorkspaceDataProps | null, setWorkspace: Dispatch<SetStateAction<ITagWorkspaceDataProps | null>>];

export const useWorkspace = (): Workspace => {
    return useContext(workspaceContext)
}

export const useWorkspaceContext = (): Workspace => {
    return useState<ITagWorkspaceDataProps | null>(null)
}
