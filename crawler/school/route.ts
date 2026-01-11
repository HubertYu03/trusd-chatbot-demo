import { PlaywrightCrawler } from "crawlee";
import { router } from "./router/router";

const testLink: string = "https://www.trusd.net/";

const crawler = new PlaywrightCrawler({
  //   maxRequestsPerCrawl: 10,
  requestHandler: router,
});

await crawler.run([testLink]);
