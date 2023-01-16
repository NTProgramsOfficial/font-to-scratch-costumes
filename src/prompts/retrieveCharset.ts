
const prompts = require("prompts");

const defaultCharset = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890-=[]\\;',./~!@#$%^&*()_+{}|:\"<>?";

const askForCharset = async function(): Promise<boolean> {
    console.log(`\nThe default charset is:\n${defaultCharset}\n`);

    const input: string = (await prompts({
        type: "text",
        name: "input",
        message: "Would you like to enter a custom charset? (N/Y): "
    })).input;

    if (input === "") return false;

    if (!input) throw "stop";

    return input.charAt(0).toLowerCase() === 'y';
}

export const retrieveCharset =
async function(): Promise<string>
{
    if (await askForCharset()) {
        const charset = (await prompts({
            type: "text",
            name: "charset",
            message: "Enter a charset: "
        })).charset;

        if (!charset) throw "stop";
        
        return charset;
    } else {
        return defaultCharset;
    }
}