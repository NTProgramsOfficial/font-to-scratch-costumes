
const fs = require("fs");
import { injectKerning } from "./spriteCreation/injectKerning";
import { createCostumes } from "./spriteCreation/createCostumes";
import { compressToSB3 } from "./spriteCreation/compressToSB3";

const removeIfExists = function(path: string): void {
    if (fs.existsSync(path))
        fs.rmSync(path, { recursive: true });
}

export const createSprite = function(
    fonts: opentype.Font[],
    charset: string,
    output: string
): void {
    const path = "temp_teg0mcdybwyddneq89s7";
    removeIfExists(path);
    fs.mkdirSync(path);

    let spriteObject;

    let fontNumber = 1;
    for (const font of fonts) {
        spriteObject = createCostumes(
            font, charset, path, fontNumber
        );
        spriteObject = injectKerning(
            font, charset, spriteObject
        );
        ++fontNumber;
    }

    fs.writeFileSync(
        `${path}/sprite.json`,
        JSON.stringify(spriteObject)
    );

    compressToSB3(path, output);
}