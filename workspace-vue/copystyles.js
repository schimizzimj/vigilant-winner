import { readFileSync, writeFileSync } from "fs";
let css = readFileSync("../workspace-css/css/styles.css", "utf8");
const vue = readFileSync("./src/components/Button.vue", "utf8");

// Take everything between the starting and closing style tags and replace it
const styleRegex = /<style module>([\s\S]*?)<\/style>/;
let withSyncedStyles = vue.replace(
  styleRegex,
  `<style module>\n${css}</style>`
);
writeFileSync("./src/components/Button.vue", withSyncedStyles, "utf8");
