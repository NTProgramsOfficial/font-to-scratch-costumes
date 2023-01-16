
const fs = require("fs");
const crypto = require("crypto");
import * as spriteObject from "../spriteTemplate.json"

export const createCostumes = function(
    font: opentype.Font,
    charset: string,
    filePath: string,
    fontNumber: number
): Object {
    const svgBoilerplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="480" height="360" viewBox="-240 -180 480 360"><g transform="translate(-240, -180)"><rect fill-opacity="0" width="200" height="200" x="140" y="80" />`;

    let i = 0;
    for (let char of charset) {
        const path: opentype.Path = 
            font.getPath(char, 240, 180, 100);

        path.fill = 'red';
        fs.writeFileSync(
            `${filePath}/${fontNumber}_${i}.svg`, 
            `${svgBoilerplate}${path.toSVG(2)}</g></svg>`
        );

        const file = fs.readFileSync(
            `${filePath}/${fontNumber}_${i}.svg`
        );
        const md5HashSum = crypto.createHash('md5');
        md5HashSum.update(file);
        const md5Hash = md5HashSum.digest('hex');

        fs.renameSync(
            `${filePath}/${fontNumber}_${i}.svg`,
            `${filePath}/${md5Hash}.svg`
        );

        const costumeInfo = {
            "name": `${fontNumber - 1}${char}`,
            "bitmapResolution": 1,
            "dataFormat": "svg",
            "assetId": `${md5Hash}`,
            "md5ext": `${md5Hash}.svg`,
            "rotationCenterX": 0,
            "rotationCenterY": 0
        };

        spriteObject["costumes"].push(costumeInfo);

        i++;
    }

    if (fontNumber === 1)
        spriteObject["costumes"].shift();
    
    return spriteObject;
}
