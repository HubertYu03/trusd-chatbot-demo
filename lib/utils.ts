import { customAlphabet } from "nanoid";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// Util function for generating a custom ID
export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

// Function that parses JSON data in a folder
export const readAllJsonFiles = async <T = any>(
  folderPath: string
): Promise<T[]> => {
  const files = await readdir(folderPath);
  const results: T[] = [];

  for (const file of files) {
    // Only process .json files
    if (!file.endsWith(".json")) continue;

    const fullPath = path.join(folderPath, file);
    const content = await readFile(fullPath, "utf-8");

    try {
      const data: T = JSON.parse(content);
      results.push(data);
    } catch (err) {
      console.error(`Error parsing JSON in file ${file}:`, err);
    }
  }

  return results;
};

// Function to parse school data
export const parseSchoolData = (school: any): SchoolResource => {
  // Using all the school data, we will create a text context that will be embedded for the AI to read
  if (school.phone.includes("|")) {
    console.log(school);
  }

  return { schoolName: school.schoolName, content: school.description };
};
