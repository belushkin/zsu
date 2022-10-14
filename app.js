const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const sharp = require("sharp");
var fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// read JSON asset file
let rawdata = fs.readFileSync("asset.json");
let asset = JSON.parse(rawdata);

const colors = [
  "#800000",
  "#8B0000",
  "#A52A2A",
  "#B22222",
  "#DC143C",
  "#FF0000",
  "#FF6347",
  "#FF7F50",
  "#CD5C5C",
  "#F08080",
  "#E9967A",
  "#FA8072",
  "#FFA07A",
  "#FF4500",
  "#FF8C00",
  "#FFA500",
  "#FFD700",
  "#B8860B",
  "#DAA520",
  "#EEE8AA",
  "#BDB76B",
  "#F0E68C",
  "#808000",
  "#FFFF00",
  "#9ACD32",
  "#556B2F",
  "#6B8E23",
  "#7CFC00",
  "#7FFF00",
  "#ADFF2F",
  "#006400",
  "#008000",
  "#228B22",
  "#00FF00",
  "#32CD32",
  "#90EE90",
  "#98FB98",
  "#8FBC8F",
  "#00FA9A",
  "#00FF7F",
  "#2E8B57",
  "#66CDAA",
  "#3CB371",
  "#20B2AA",
  "#2F4F4F",
  "#008080",
  "#008B8B",
  "#00FFFF",
  "#00FFFF",
  "#E0FFFF",
  "#00CED1",
  "#40E0D0",
  "#48D1CC",
  "#AFEEEE",
  "#7FFFD4",
  "#B0E0E6",
  "#5F9EA0",
  "#4682B4",
  "#6495ED",
  "#00BFFF",
  "#1E90FF",
  "#ADD8E6",
  "#87CEEB",
  "#87CEFA",
  "#191970",
  "#000080",
  "#00008B",
  "#0000CD",
  "#0000FF",
  "#4169E1",
  "#8A2BE2",
  "#4B0082",
  "#483D8B",
  "#6A5ACD",
  "#7B68EE",
  "#9370DB",
  "#8B008B",
  "#9400D3",
  "#9932CC",
  "#BA55D3",
  "#800080",
  "#D8BFD8",
  "#DDA0DD",
  "#EE82EE",
  "#FF00FF",
  "#DA70D6",
  "#C71585",
  "#DB7093",
  "#FF1493",
  "#FF69B4",
  "#FFB6C1",
  "#FFC0CB",
  "#FAEBD7",
  "#F5F5DC",
  "#FFE4C4",
  "#FFEBCD",
  "#F5DEB3",
  "#FFF8DC",
  "#FFFACD",
  "#FAFAD2",
  "#FFFFE0",
  "#8B4513",
  "#A0522D",
  "#D2691E",
  "#CD853F",
  "#F4A460",
  "#DEB887",
  "#D2B48C",
  "#BC8F8F",
  "#FFE4B5",
  "#FFDEAD",
  "#FFDAB9",
  "#FFE4E1",
  "#FFF0F5",
  "#FAF0E6",
  "#FDF5E6",
  "#FFEFD5",
  "#FFF5EE",
  "#F5FFFA",
  "#708090",
  "#778899",
  "#B0C4DE",
  "#E6E6FA",
  "#FFFAF0",
  "#F0F8FF",
  "#F8F8FF",
  "#F0FFF0",
  "#FFFFF0",
  "#F0FFFF",
  "#FFFAFA",
  "#000000",
  "#696969",
  "#808080",
  "#A9A9A9",
  "#C0C0C0",
  "#D3D3D3",
  "#DCDCDC",
  "#F5F5F5",
  "#FFFFFF",
];

const svg = `<svg width="2048" height="2048" xmlns="http://www.w3.org/2000/svg">
<style>.base { font-family: Lato,sans-serif; margin:100px;}</style>
<g>
  <rect x="0" y="0" width="2048" height="2048" fill="{2}" stroke-width="3px"/>
  <text x="15%" y="50%" style="fill: {1}; stroke: #000000; font-size: 260px;">
    Вірю в ЗСУ!
</text>
</g>
</svg>
`;

let cards = [];
for (i = 0; i < 139; i++) {
  // generate svg
  let s = svg.replace("{1}", colors[139 - i]);
  s = s.replace("{2}", colors[i]);
  cards.push("data:image/svg+xml;base64," + Buffer.from(s).toString("base64"));

  if (false) {
    // convert svg to png
    sharp(new Buffer.from(s))
      .toFile("assets/" + i + ".png")
      .catch((err) => {
        console.error(err);
      });

    // update asset
    asset.image = i + ".png";
    asset.properties.files.uri = i + ".png";
    asset.attributes.value = i;

    // write json file
    fs.writeFile(
      "assets/" + i + ".json",
      JSON.stringify(asset),
      function (err) {
        if (err) throw err;
      }
    );
  }
}

app.get("/", (req, res) => {
  res.render("index", {
    // index refers to index.ejs
    cards: cards,
  });
});

app.listen(process.env.port || 3000);

console.log("Running at Port 3000");
