import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "@arco-design/web-react/dist/css/arco.css";
import "./base/base.scss";
import Main from "./pages/main/main";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Main
      fields={["a", "b", "c"]}
      inputs={[
        "123456erjhviulclfi dsuchiludbceruilbcveubcrfeub cver123456erjhviulclfi dsuchiludbcer uilbcveub crfeubcver123456erjhviulclfidsuchiludbceruilbcveubcrfeubcver123456erjhviulclfidsuchiludbceruilbcveubcrfeubcver",
      ]}
    /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
