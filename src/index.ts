
import { retrieveFonts } from "./prompts/retrieveFonts"
import { retrieveCharset } from "./prompts/retrieveCharset"
import { retrieveOutput } from "./prompts/retrieveOutput"
import { createSprite } from "./createSprite"


(async function(): Promise<void> {
try {
    console.clear();
    console.log("Welcome to NTPrograms' Font to Costume Extractor!");
    const fonts: opentype.Font[] = await retrieveFonts();
    const charset: string = await retrieveCharset();
    const output: string = await retrieveOutput();
    createSprite(fonts, charset, output);
}
catch (err) {
    if (err !== "stop") {
        console.log("\n\n");
        console.log(err);
        console.log("\n\nSomething went wrong. Please try again.");
    }
}
})();

