const INITIAL_CANVAS_WIDTH = 1014;
const INITIAL_CANVAS_HEIGHT = 570.38;
const INITIAL_CANVAS_DATA = {
    "version": "3.3.0",
    "objects": [
      {
        "type": "i-text",
        "version": "3.3.0",
        "originX": "left",
        "originY": "top",
        "left": 345,
        "top": 223.97,
        "width": 129.98,
        "height": 45.2,
        "fill": "rgb(0,0,0)",
        "stroke": null,
        "strokeWidth": 1,
        "strokeDashArray": null,
        "strokeLineCap": "butt",
        "strokeDashOffset": 0,
        "strokeLineJoin": "miter",
        "strokeMiterLimit": 4,
        "scaleX": 2.14,
        "scaleY": 2.14,
        "angle": 0,
        "flipX": false,
        "flipY": false,
        "opacity": 1,
        "shadow": null,
        "visible": true,
        "clipTo": null,
        "backgroundColor": "",
        "fillRule": "nonzero",
        "paintFirst": "fill",
        "globalCompositeOperation": "source-over",
        "transformMatrix": null,
        "skewX": 0,
        "skewY": 0,
        "text": "Edit Me",
        "fontSize": 40,
        "fontWeight": "normal",
        "fontFamily": "Times New Roman",
        "fontStyle": "normal",
        "lineHeight": 1.16,
        "underline": false,
        "overline": false,
        "linethrough": false,
        "textAlign": "left",
        "textBackgroundColor": "",
        "charSpacing": 0,
        "styles": {}
      }
    ]
  }

exports.INITIAL_SLIDE = {
  data: JSON.stringify(INITIAL_CANVAS_DATA),
  canvasDimensions: {
      height: INITIAL_CANVAS_HEIGHT,
      width: INITIAL_CANVAS_WIDTH
  }
}