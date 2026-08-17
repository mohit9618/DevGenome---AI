export function cleanResumeText(text: string):string{
    return text
    .replace(/\r\n/g,"\n")
    .replace(/\r/g,"\n")

    .split("\n")
    .map((line) => line.trim())

    .filter((line) => line.length > 0)

    .map((line) => line.replace(/\s+/g," "))

    .join("\n");
}