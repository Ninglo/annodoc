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
      fields={[
        "字段0",
        "字123段1",
        "字段2",
        "字23段3",
        "字段4",
        "字段5",
        "字231段6",
        "123字段7",
        "字段1238",
        "字段9",
        "字123段0",
        "字段1",
        "字段2",
        "字123段3",
        "字段4",
        "字段5",
        "字段6",
        "字段2317",
        "字段8",
        "字段9",
      ]}
      inputs={[
        "水电费会计核算的看法和对双方很快就收到货付款时间的话是倒海翻江开始还看手机上的健康护肤开始发烧快好,是否收到后付款及时的反馈说 啥地方,是的发送到风口浪尖上",
      ]}
    /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
