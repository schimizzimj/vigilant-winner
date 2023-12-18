import { readFileSync, writeFileSync } from "fs";
let css = readFileSync("../workspace-css/css/styles.css", "utf8");
writeFileSync("./src/styles.css", css, "utf8");
