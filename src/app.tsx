import React, { FC, useState } from "react";
import Main from "./pages/main/main";
import { Fields, Inputs } from "./modal/type";
import { Init } from "./pages/init/init";

export const App: FC = () => {
  const [inited, setInited] = useState(false);
  const [fields, setFields] = useState<Fields>([]);
  const [inputs, setInputs] = useState<Inputs>([]);

  return inited ? (
    <Main fields={fields} inputs={inputs} />
  ) : (
    <Init setInited={setInited} setFields={setFields} setInputs={setInputs} />
  );
};
