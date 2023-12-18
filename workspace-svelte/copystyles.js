import { readFileSync, writeFileSync } from "fs";
let css = readFileSync("../workspace-css/css/styles.css", "utf8");
const svelte = readFileSync("./src/Button.svelte", "utf8");

// Take everything between the starting and closing style tags and replace it
const styleRegex = /<style>([\s\S]*?)<\/style>/;
let withSyncedStyles = svelte.replace(
  styleRegex,
  `<style module>\n${css}</style>`
);
writeFileSync("./src/Button.svelte", withSyncedStyles, "utf8");
