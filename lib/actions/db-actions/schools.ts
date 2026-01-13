// Database action that creates the tuples for all relevant tables for a particular school

// Importing Parameters for data insertion
import {
  insertSchoolSchema,
  NewSchoolParams,
  schools,
} from "../../db/schema/schools";
import {
  insertSchoolResourcesSchema,
  NewSchoolResourceListParams,
  NewSchoolResourceParams,
  schoolResources,
} from "../../db/schema/schoolResources";

// Importing Database object
import { db } from "../../db";
import { NewSchoolPhoneParams } from "../../db/schema/schoolPhones";

export const createSchool = async (school: any) => {
  console.log(`Processing ${school.schoolName}`);

  try {
    // Fetch the data for inserting into Schools table
    // const schoolData = insertSchoolSchema.parse(getSchoolParams(school));

    // Add the school to the database and return the ID
    // const schoolId = await addSchool(schoolData);

    // Get the resources data for insering into schoolResources table
    // const resourceData: NewSchoolResourceParams[] = getSchoolResourcesParams(
    //   school.resources,
    //   schoolId
    // );

    // Map over the resources and insert them into the database and return each tuple
    // const schoolResources = await addSchoolResource(resourceData);

    console.log(getSchoolPhoneParams(school.phone, "test"));

    return "School successfully created";
  } catch (e) {
    return "Error in adding School.";
  } finally {
    await db.$client.end(); // Close the connection
  }
};

// Function that adds school to database and returns the school ID
const addSchool = async (input: NewSchoolParams): Promise<string> => {
  console.log("Adding school data into schools table 💾.");

  try {
    const content: NewSchoolParams = insertSchoolSchema.parse(input);

    const [school] = await db.insert(schools).values(content).returning();

    // Success message and return School ID
    console.log("Successfully added school data ✅");
    return school.schoolId;
  } catch (e) {
    return "Error in adding School to Schools Table.";
  }
};

// Function that adds school to resources table and returns the resource Id
const addSchoolResource = async (
  input: NewSchoolResourceParams[]
): Promise<NewSchoolResourceParams[] | string> => {
  console.log("Adding school data into schoolResources table 💾.");

  try {
    const content: NewSchoolResourceListParams =
      insertSchoolResourcesSchema.parse(input);

    const resources = await db
      .insert(schoolResources)
      .values(content)
      .returning();

    // Success message and return Resource ID
    console.log("Successfully added school resources ✅");
    return resources;
  } catch (e) {
    return "Error in adding School to Schools Table.";
  }
};

// Utililty function that parses the school JSON for data to insert into schools table
const getSchoolParams = (school: any): NewSchoolParams => {
  return {
    schoolName: school.schoolName,
    schoolType: school.schoolType,
    address: school.address,
    schoolLink: school.schoolLink,
    sarc: school.sarc,
  };
};

// Utililty function that parses the school JSON for resources to insert into schoolResources table
const getSchoolResourcesParams = (
  resources: any,
  schoolId: string
): NewSchoolResourceParams[] => {
  // Initialize an array of resources to add to
  const result: NewSchoolResourceParams[] = [];

  // Processing a Fact Sheet if it exists
  if (resources["FACT SHEET"]) {
    // Create a resource tuple and add it to the result
    const resource: NewSchoolResourceParams = {
      resourceType: "fact_sheet",
      resourceName: "FACT SHEET",
      url: resources["FACT SHEET"],
      schoolId: schoolId,
    };

    result.push(resource);
  }

  // Processing a Feedback form if it exists
  // First check if a feedback form exists
  const feedbackKey: string | undefined = Object.keys(resources).find((k) =>
    k.includes("DOING")
  );

  // If the feedback form exists, add it to the database
  if (feedbackKey !== undefined) {
    // Create a resource tuple and add it to the result
    const resource: NewSchoolResourceParams = {
      resourceType: "feedback",
      resourceName: feedbackKey,
      url: resources[feedbackKey],
      schoolId: schoolId,
    };

    result.push(resource);
  }

  // Processing Anonymous Feedback Form
  // First check if a anonymous reporting key exists
  const anonReportingKey: string | undefined = Object.keys(resources).find(
    (k) => k.includes("ANONYMOUS")
  );

  // If the anonymous reporting form exists, add it to the database
  if (anonReportingKey !== undefined) {
    // Create a resource tuple and add it to the result
    const resource: NewSchoolResourceParams = {
      resourceType: "anon_reporting",
      resourceName: anonReportingKey,
      url: resources[anonReportingKey],
      schoolId: schoolId,
    };

    result.push(resource);
  }

  // Processing Aeries Portal Form
  // First check if a aeries portal key exists
  const aerisPortalKey: string | undefined = Object.keys(resources).find((k) =>
    k.includes("AERIES")
  );

  // If the anonymous reporting form exists, add it to the database
  if (aerisPortalKey !== undefined) {
    // Create a resource tuple and add it to the result
    const resource: NewSchoolResourceParams = {
      resourceType: "aeries_portal",
      resourceName: aerisPortalKey,
      url: resources[aerisPortalKey],
      schoolId: schoolId,
    };

    result.push(resource);
  }

  // Processing Apps Link
  // First check if a apps link key exists
  const appLinkKey: string | undefined = Object.keys(resources).find((k) =>
    k.includes("APPS")
  );

  // If the apps link exists, add it to the database
  if (appLinkKey !== undefined) {
    // Create a resource tuple and add it to the result
    const resource: NewSchoolResourceParams = {
      resourceType: "trusd_apps",
      resourceName: appLinkKey,
      url: resources[appLinkKey],
      schoolId: schoolId,
    };

    result.push(resource);
  }

  return result;
};

// Utilitiy function that parsts the school phone number to inser into schoolPhones table
const getSchoolPhoneParams = (
  phone: any,
  schoolId: string
): NewSchoolPhoneParams[] => {
  const phones: NewSchoolPhoneParams[] = [];

  if (phone.includes("|")) {
    phone.split("|").map((num: string) => {
      console.log(num.trim());
    });
  } else {
    console.log(phone);
  }

  return phones;
};
