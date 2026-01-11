import { createPlaywrightRouter, Dataset, RequestQueue } from "crawlee";

// Create our Cheerio Router
export const router = createPlaywrightRouter();

// Get the dataset
const dataset = await Dataset.open("schools");

// School Types for debugging
let types: string[] = [];

// Add some routes to our router

// Initial base router
router.addDefaultHandler(async ({ request, enqueueLinks, log }) => {
  log.info(`Processing "${request.url}"`);

  await enqueueLinks({
    selector: "a[href*='/Our-Schools/']", // Links to individual schools
    label: "SCHOOL-LIST",
  });
});

// Overall School Router
router.addHandler("SCHOOL-LIST", async ({ page, request, log }) => {
  log.info(`🏫 Processing all schools: ${request.url}`);

  await page.waitForSelector("button.ant-btn", { timeout: 15000 });

  let schoolUrls: string[] = await page.$$eval(
    "button.ant-btn a[href*='/schoolInfo/']",
    (links: HTMLAnchorElement[]) => links.map((a) => a.href)
  );

  // Remove duplicates if applicable
  schoolUrls = [...new Set(schoolUrls)];

  log.info(`${schoolUrls.length} links found.`);

  // Open the default request queue
  const requestQueue = await RequestQueue.open();

  // Add each school URL with a unique key
  for (let i = 0; i < schoolUrls.length; i++) {
    await requestQueue.addRequest({
      url: schoolUrls[i], // actual URL
      label: "SCHOOL", // label for handler
      uniqueKey: `${schoolUrls[i]}-${i}`, // make each request unique
    });
  }
});

// Individual School Router
router.addHandler("SCHOOL", async ({ page, request, log }) => {
  log.info(`🏫 Processing school: ${request.url}`);

  await page.waitForSelector("#schoolManagerRoot", { timeout: 15000 });

  // Get all the data from the school

  // School Name
  const schoolName: string | null = await page
    .locator(".Fp7QP3LLZP1Ajf05uAoU")
    .textContent();

  // School Night
  const schoolType: string | null = await page
    .locator(".SsQ4ZTflh3c69f6dK3kl")
    .textContent();

  // The school numbers have the same classname, so get both numbers and extract separately
  const phone: string | null = await page
    .locator('#schoolManagerRoot a[href^="tel:"]')
    .first()
    .innerText();

  const fax: string | null = await page
    .locator(".uVWtnnx9XpZlJK02K3tY")
    .nth(1)
    .innerText();

  // Extract the school description
  const description: string | null = await page
    .locator(".YqquDoG8G4UpKELdb90C")
    .innerText();

  // Extract all the resources from the RESOURCES tab
  await page.click("#rc-tabs-0-tab-2");
  await page.waitForSelector(".ant-row");

  // Extract the SARC link
  const sarc: string | null = await page
    .locator("ul.UxIJbBcRUgViWBa0xBdD a[href]")
    .getAttribute("href");

  // Get the resource links
  const resourceLinks: { href: string; text: string }[] = await page.$$eval(
    "a.XfHgnsSmQXr5gpLtvYe7",
    (elements: Element[]) =>
      elements.map((el) => ({
        href: el instanceof HTMLAnchorElement ? el.href : "",
        text: el instanceof HTMLAnchorElement ? el.textContent?.trim() : "",
      }))
  );

  // Create the JSON that will be saved
  const resources: { [key: string]: string } = {};

  // Add link titles as keys and the links as values
  resourceLinks.map((resource) => {
    resources[resource.text.toUpperCase()] = resource.href;
  });

  // Extract the address and clean up the string
  let address: string = await page.locator(".ant-row-middle").innerText();

  address = address.replace("\n", " ");

  // Extract the school link
  const schoolLink = await page
    .locator("a.BLrMZzF6rlxOQFhRNu0j")
    .getAttribute("href");

  // Log the types of schools if they are new
  if (!types.includes(schoolType!)) {
    types.push(schoolType as string);
    types.map((type) => {
      log.info(type);
    });
  }

  // Add everything into a JSON
  const result = {
    url: request.url,
    schoolName,
    schoolType,
    phone,
    fax,
    description,
    sarc,
    resources,
    address,
    schoolLink,
  };

  // Save the JSON into local disc
  await dataset.pushData(result);
});
