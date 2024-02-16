import { exec } from "child_process";
import { FunctionName } from "./functions.type";
import { getTextContentOfBlockFromId } from "../notion/getTextContentOfBlock";
import { notion } from "./clients";
import { projectDir } from "./constant";

export const executeFunction = async (
  functionName: FunctionName,
  parameters: unknown
): Promise<string> => {
  switch (functionName) {
    case "lsFunction":
      const path = getPathFromParameters(parameters);
      const output = execCommand(
        `tree --gitignore --filesfirst -I dist/ -I build/ -I node_modules/ -L 2 ${path}`
      );
      return output;

    case "catFunction":
      const filePath = getPathFromParameters(parameters);
      const fileContent = execCommand(`cat ${filePath}`);
      return fileContent;
    case "readNotionPageFunction":
      const readPageId = getPageIdFromParameters(parameters);
      const pageContent = getTextContentOfBlockFromId(readPageId, notion);
      return pageContent;
    case "writeNotionPageFunction":
      const content = getNotionPageContentFromParameters(parameters);
      const writePageId = getPageIdFromParameters(parameters);

      console.log("Writing to Notion page", writePageId);
      console.log("Content", content);

      return "";
    default:
      throw new Error("Function not found");
  }
};

const getPathFromParameters = (parameters: unknown): string => {
  if (
    typeof parameters !== "object" ||
    parameters === null ||
    !("path" in parameters) ||
    typeof parameters.path !== "string"
  )
    throw new Error("Invalid parameters");
  return parameters.path;
};

const getPageIdFromParameters = (parameters: unknown): string => {
  if (
    typeof parameters !== "object" ||
    parameters === null ||
    !("pageId" in parameters) ||
    typeof parameters.pageId !== "string"
  )
    throw new Error("Invalid parameters");
  return parameters.pageId;
};

const getNotionPageContentFromParameters = (parameters: unknown): string => {
  if (
    typeof parameters !== "object" ||
    parameters === null ||
    !("content" in parameters) ||
    typeof parameters.content !== "string"
  )
    throw new Error("Invalid parameters");
  return parameters.content;
};

const execCommand = (command: string): Promise<string> => {
  return new Promise((resolve) => {
    exec(command, { cwd: projectDir }, (error, stdout, stderr) => {
      if (error) {
        console.error("Error", error);
        if (stderr) {
          resolve(stderr);
        }
        resolve(error.message);
      }
      resolve(stdout);
    });
  });
};
