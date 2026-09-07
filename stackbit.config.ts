import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  devCommand: "npm run dev -- --port {PORT}",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "HomePage",
          type: "page",
          urlPath: "/",
          filePath: "content/pages/home.json",
          fields: [
            { name: "heroEyebrow", type: "string" },
            { name: "heroTitle", type: "string" },
            { name: "heroHighlight", type: "string" },
            { name: "heroDescription", type: "string", controlType: "textarea" },
            { name: "packagesHeading", type: "string" },
            { name: "packagesDescription", type: "string", controlType: "textarea" },
            { name: "experienceEyebrow", type: "string" },
            { name: "experienceTitle", type: "string" },
            { name: "experienceDescription", type: "string", controlType: "textarea" },
            { name: "destinationsHeading", type: "string" },
            { name: "destinationsDescription", type: "string", controlType: "textarea" },
            { name: "whyHeading", type: "string" },
            { name: "ctaTitle", type: "string" },
            { name: "ctaDescription", type: "string", controlType: "textarea" },
            { name: "enquiryHeading", type: "string" },
            { name: "enquiryDescription", type: "string", controlType: "textarea" }
          ]
        },
        {
          name: "Package",
          type: "data",
          filePath: "content/packages/{slug}.json",
          fields: [
            { name: "slug", type: "string" },
            { name: "location", type: "string" },
            { name: "tag", type: "string" },
            { name: "title", type: "string" },
            { name: "description", type: "string", controlType: "textarea" },
            { name: "duration", type: "string" },
            { name: "priceLabel", type: "string" }
          ]
        },
        {
          name: "Destination",
          type: "data",
          filePath: "content/destinations/{slug}.json",
          fields: [
            { name: "slug", type: "string" },
            { name: "name", type: "string" },
            { name: "tagline", type: "string" }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "relative",
        assetsDir: "assets",
        uploadDir: "images"
      }
    })
  ]
});
