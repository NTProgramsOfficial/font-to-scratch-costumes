
const opentype = require("opentype.js");
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");

const isFontFile = function(filePath: string): boolean {
    return (
        fs.existsSync(filePath) && 
        (path.extname(filePath) === ".ttf" ||
        path.extname(filePath) === ".otf")
    );
}

const isFontAdded = function(
    filePaths: string[],
    file: string
): boolean {
    return (filePaths.map(
        (file: string) => 
        path.basename(file))
    ).includes(path.basename(file))
}

const getNumberOfFonts = async function(): Promise<number> {
    const number = (await prompts({
        type: "number",
        name: "number",
        message: "How many fonts would you like to import? (1 as default): "
    })).number;

    if (number === "") return 1;

    if (!number) throw "stop";

    return number;
}

const getFileName = async function(
    filePaths: string[],
    num: number
): Promise<string> {
    const applicableFiles: string[] = fs
        .readdirSync("./")
        .filter((file: string) => (
            isFontFile(file) && 
            !isFontAdded(filePaths, file)
        )
    );
    
    const defaultFile: string | boolean = 
        applicableFiles ? applicableFiles[0] : false;

    const input = (await prompts({
        type: "text",
        name: "input",
        message: `Enter the path of font file #${num + 1}${
            defaultFile ? ` ('${defaultFile}' as default)` : ""
        }: `,
        validate: (file: string) => {
            if (file === "") {
                if (defaultFile) return true;
                else return "Please enter a font file path.";
            }

            return !isFontAdded(filePaths, file) ? (
                isFontFile(file) ? 
                true :
                `'${path.basename(file)}' does not end in .ttf or .otf or it does not exist.`
            ) : `'${path.basename(file)}' is already selected as one of the fonts.`
        }
    })).input;

    if (input === "" && defaultFile) return defaultFile;

    if (!input) throw "stop";

    return input;
}

export const retrieveFonts = async function(): 
    Promise<opentype.Font[]> 
{
    let fonts: opentype.Font[] = [];

    const numberOfFonts = await getNumberOfFonts();
    
    let filePaths: string[] = [];
    for (let i = 0; i < numberOfFonts; i++)
        filePaths.push(await getFileName(filePaths, i));

    for (let i = 0; i < numberOfFonts; i++)
        fonts.push(opentype.loadSync(filePaths[i]))

    return fonts;
}
