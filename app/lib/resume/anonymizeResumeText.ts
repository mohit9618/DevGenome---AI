export function anonymizeResumeText(
  text: string
): string {

  let anonymizedText = text;

  // Email
  anonymizedText = anonymizedText.replace(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
    "[EMAIL]"
  );

  // Phone numbers
  anonymizedText = anonymizedText.replace(
    /(?:\+91[\s-]?)?[6-9]\d{9}/g,
    "[PHONE]"
  );

  // LinkedIn URLs
  anonymizedText = anonymizedText.replace(
    /https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/gi,
    "[LINKEDIN]"
  );

  // GitHub URLs
  anonymizedText = anonymizedText.replace(
    /https?:\/\/(?:www\.)?github\.com\/[^\s]+/gi,
    "[GITHUB]"
  );

  return anonymizedText;
}