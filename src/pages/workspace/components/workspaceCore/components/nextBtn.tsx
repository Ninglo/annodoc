import { FC } from "react"
import { Button } from "@arco-design/web-react"
import { IconRight } from "@arco-design/web-react/icon"

interface INextBtn {
  onClick: () => void
}

const NextBtn: FC<INextBtn> = ({ onClick }) => (
  <Button className="next-btn" onClick={onClick}>
    Next
    <div className="icon">
      <IconRight />
    </div>
  </Button>
)

export default NextBtn
