// This is a test script for the first schoool on the page that needs to be saved

import { readAllJsonFiles } from "../../lib/utils";
import { createSchool } from "../../lib/actions/db-actions/schools";

// Get the JSON for Allison Elementary (The first one on the list)
const schools = await readAllJsonFiles("storage/datasets/schools");
const Allison = schools[3];

await createSchool(Allison);
