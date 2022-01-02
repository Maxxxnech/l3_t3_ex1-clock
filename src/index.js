import React, { Profiler } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function renderChecker(content, tgt) {
  var text = "Рендер " + content + " в " + new Date().toLocaleTimeString();
  console.log(text);
  var target = document.querySelector(tgt);
  if (target) {
    target.textContent = text;
    target.style.color = target.style.color == "green" ? "red" : "green";
  }
}

function ticker(targetId, number) {
  var headerString = "Текущее время, интервал " + number + "с";
  const timeElement = (
    <div className="dial">
      <Profiler
        id={"header_" + number}
        onRender={() =>
          renderChecker("заголовка ", ".logHeader_" + number)
        }
      >
        <h2>{headerString}</h2>
      </Profiler>

      <Profiler
        id={"time_" + number}
        onRender={() =>
          renderChecker("циферблата " + number, ".logTime_" + number)
        }
      >
        <div>{new Date().toLocaleTimeString()}</div>
      </Profiler>

      <p>
        <span className={"logHeader_" + number}></span>
      </p>
      <p>
        <span className={"logTime_" + number}></span>
      </p>
    </div>
  );
  ReactDOM.render(timeElement, document.getElementById(targetId));
}
//first render at load
let time1 = 30;
let time2 = 1;
ticker("root", time1);
ticker("root_1", time2);

var int = setInterval(() => ticker("root", time1), time1 * 1000);

var int2 = setInterval(
  () => ticker("root_1", time2),
  time2 * 1000
);
