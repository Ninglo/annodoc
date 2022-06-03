import { FC } from "react"
import { Button } from "@arco-design/web-react"
import { IconRight } from "@arco-design/web-react/icon"

interface IPrevBtn {
    onClick: () => void
}

const PrevBtn: FC<IPrevBtn> = ({ onClick }) => (
    <Button className="next-btn" onClick={onClick}>
        Prev
        <div className="icon">
            <IconRight />
        </div>
    </Button>
)

export default PrevBtn
