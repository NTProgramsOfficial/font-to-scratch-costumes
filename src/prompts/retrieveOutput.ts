
const prompts = require("prompts");
const fs = require("fs");

export const retrieveOutput = async function() {    
    const output = (await prompts({
        type: "text",
        name: "output",
        message: "Enter the name of the output sprite ('TextEngine' as default): ",
        validate: (output: string) => {
            output = output === "" ? 'TextEngine' : output;
            return !fs.existsSync(
                `${output}.sprite3`
            ) ? true: `${output}.sprite3 already exists.`
        }
    })).output;

    if (output === "") return "TextEngine";

    if (!output) throw "stop";
    
    return output;
}