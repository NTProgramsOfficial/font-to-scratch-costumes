
const fs = require("fs");
const jszip = require("jszip");

const removeIfExists = function(path: string): void {
    if (fs.existsSync(path))
        fs.rmSync(path, { recursive: true });
}

export const compressToSB3 = function(
    path: string,
    output: string
): void {
    const zip = new jszip();
    const files: string[] = fs.readdirSync(path);

    for (const file of files) {
        zip.file(
            file,
            fs.readFileSync(`${path}/${file}`)
        );
    }

    removeIfExists(`${path}.zip`);
    removeIfExists(`${output}.sprite3`);

    zip
    .generateNodeStream({type:'nodebuffer',streamFiles:true})
    .pipe(fs.createWriteStream(`${path}.zip`))
    .on('finish', function(): void {
        fs.renameSync(
            `${path}.zip`, 
            `${output}.sprite3`
        );

        removeIfExists(path);

        if (fs.existsSync(`${output}.sprite3`)) {
            console.log(
                `\n'${output}.sprite3' successfully created.\n`
            );
        }
    });
}