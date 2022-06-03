import { FC } from "react";
import { useResultContext, resultContext } from "./hooks/data/useResult";
import { useWorkspaceContext, workspaceContext } from "./hooks/data/useWorkspace";
import { BaseLayout } from "./Layout";

export const Provider: FC = () => {
    const result = useResultContext()
    const workspace = useWorkspaceContext()

    return (
        <resultContext.Provider value={result}>
            <workspaceContext.Provider value={workspace}>
                <BaseLayout></BaseLayout>
            </workspaceContext.Provider>
        </resultContext.Provider >
    )
}