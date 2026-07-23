(function (global) {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var CX = 100, CY = 100;
  var FACE_R = 94;
  var BAND_OUTER = 92, BAND_INNER = 50;

  function pointOnCircle(cx, cy, r, clockDeg) {
    var rad = (clockDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.sin(rad),
      y: cy - r * Math.cos(rad)
    };
  }

  function timeToDeg(hhmm) {
    var parts = hhmm.split(":");
    var hh = parseInt(parts[0], 10);
    var mm = parseInt(parts[1], 10);
    return (hh * 60 + mm) * 0.25;
  }

  function describeArcBand(cx, cy, startDeg, endDeg, outerR, innerR) {
    var diff = endDeg - startDeg;
    var largeArc = diff > 180 ? 1 : 0;
    var outerStart = pointOnCircle(cx, cy, outerR, startDeg);
    var outerEnd = pointOnCircle(cx, cy, outerR, endDeg);
    var innerStart = pointOnCircle(cx, cy, innerR, startDeg);
    var innerEnd = pointOnCircle(cx, cy, innerR, endDeg);

    return [
      "M", outerStart.x, outerStart.y,
      "A", outerR, outerR, 0, largeArc, 1, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerR, innerR, 0, largeArc, 0, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }

  function renderDemoClock(svg, events) {
    svg.setAttribute("viewBox", "0 0 200 200");
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    svg.appendChild(svgEl("circle", {
      cx: CX, cy: CY, r: FACE_R,
      class: "demo-face"
    }));

    for (var h = 0; h < 24; h += 3) {
      var deg = h * 15;
      var outer = pointOnCircle(CX, CY, FACE_R, deg);
      var inner = pointOnCircle(CX, CY, FACE_R - 8, deg);
      svg.appendChild(svgEl("line", {
        x1: outer.x, y1: outer.y, x2: inner.x, y2: inner.y,
        class: "demo-tick"
      }));
      if (h % 6 === 0) {
        var labelPos = pointOnCircle(CX, CY, FACE_R - 19, deg);
        var text = svgEl("text", {
          x: labelPos.x, y: labelPos.y,
          class: "demo-tick-label"
        });
        text.textContent = String(h);
        svg.appendChild(text);
      }
    }

    events.forEach(function (evt) {
      var startDeg = timeToDeg(evt.start);
      var endDeg = timeToDeg(evt.end);
      var d = describeArcBand(CX, CY, startDeg, endDeg, BAND_OUTER, BAND_INNER);
      var path = svgEl("path", {
        d: d,
        fill: evt.color,
        "fill-opacity": "0.9",
        stroke: "rgba(0,0,0,0.15)",
        "stroke-width": "1"
      });
      var title = document.createElementNS(SVG_NS, "title");
      title.textContent = evt.title + " (" + evt.start + " - " + evt.end + ")";
      path.appendChild(title);
      svg.appendChild(path);
    });
  }

  global.renderDemoClock = renderDemoClock;
})(window);
