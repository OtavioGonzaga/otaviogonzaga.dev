import { absoluteUrl, siteConfig } from "@/shared/config/site";
import { profile } from "@/modules/profile/content/profile";

export function websiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  };
}

export function personStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    alumniOf: { "@type": "CollegeOrUniversity", name: "UTFPR" },
    sameAs: [profile.githubUrl, profile.linkedinUrl],
  };
}
