
const fs = require("fs");

export const injectKerning = function(
    font: opentype.Font,
    charset: string,
    spriteObject: any
): Object {    
    for (let i of charset) {
        for (let j of charset) {
            const leftGlyph = font.charToGlyph(i);
            const rightGlyph = font.charToGlyph(j);
    
            spriteObject["lists"]["td!7STL6{O^MZI1mv:?w"][1]
                .push(
                    font.getAdvanceWidth(i, 1) + font.getKerningValue(
                        leftGlyph, rightGlyph
                    ) / font.unitsPerEm
                );
        }
    }

    return spriteObject;
}