import { exec } from "child_process";
import { FunctionName } from "./functions.type";
import { getTextContentOfBlockFromId } from "../notion/getTextContentOfBlock";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const executeFunction = async (
  functionName: FunctionName,
  parameters: unknown
): Promise<string> => {
  switch (functionName) {
    case "lsFunction":
      const path = getPathFromParameters(parameters);
      const output = execCommand(`ls ${path}`);
      return output;

    case "catFunction":
      const filePath = getPathFromParameters(parameters);
      const fileContent = execCommand(`cat ${filePath}`);
      return fileContent;
    case "readNotionPageFunction":
      const pageId = getPageIdFromParameters(parameters);
      const pageContent = getTextContentOfBlockFromId(pageId, notion);
      return pageContent;
    case "writeNotionPageFunction":
      return "writeNotionPageFunction";
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

const execCommand = (command: string): Promise<string> => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (stderr) {
          resolve(stderr);
        }
        resolve(error.message);
      }
      resolve(stdout);
    });
  });
};
