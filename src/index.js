import React, { Profiler } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 *
 * @param {String} type - React element
 * @param {String} tgt - onscreen log target
 */
function renderChecker(type, tgt, actualDuration, startTime) {
  var text =
    "Рендер " + type + ": " + actualDuration.toFixed(6) + " мс, timestamp начала рендеринга: " + startTime.toFixed(4) + "";
  console.log(text);
  var target = document.querySelector(tgt);
  if (target) {
    target.textContent = text;
    target.style.color = target.style.color == "green" ? "red" : "green";
  }
}

/**
 * Renders clock
 * @param {String} targetId - DOM element to render into
 * @param {Number} number - some unique  id, for ex.- clock update interval
 */
function ticker(targetId, number) {
  var headerString = "Текущее время, интервал " + number + "с";
  const timeElement = (
    <div className="dial">
      <Profiler
        id={"header_" + number}
        onRender={(id, phase, actualDuration, baseDuration, startTime) =>
          renderChecker(
            "заголовка ",
            ".logHeader_" + number,
            actualDuration,
            startTime
          )
        }
      >
        <h2>{headerString}</h2>
      </Profiler>

      <Profiler
        id={"time_" + number}
        onRender={(id, phase, actualDuration, baseDuration, startTime) =>
          renderChecker(
            "циферблата ",
            ".logTime_" + number,
            actualDuration,
            startTime
          )
        }
      >
        <div>{new Date().toLocaleTimeString()}</div>
      </Profiler>

      <ul className="log_output">
        <li>
          <span className={"logHeader_" + number}></span>
        </li>
        <li>
          <span className={"logTime_" + number}></span>
        </li>
      </ul>
    </div>
  );
  ReactDOM.render(timeElement, document.getElementById(targetId));
}

let time1 = 30;
let time2 = 1;

//first render at load
ticker("root", time1);
ticker("root_1", time2);

var int = setInterval(() => ticker("root", time1), time1 * 1000);
var int2 = setInterval(() => ticker("root_1", time2), time2 * 1000);
