import * as fs from "fs";
import * as path from "path";
import { projectDir } from "./constant";

const searchDirectory = (dir: string, searchTerm: string) => {
  const filesAndFolders = fs.readdirSync(dir);

  for (const element of filesAndFolders) {
    const fullPath = path.join(dir, element);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      searchDirectory(fullPath, searchTerm); // Recursive call for subdirectories
    } else if (stats.isFile()) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.includes(searchTerm)) {
        console.log(`Term found in: ${fullPath}`);
      }
    }
  }
};

// Usage
// const directoryToSearch = "/path/to/directory";
const termToSearch = "header";
searchDirectory(projectDir, termToSearch);
