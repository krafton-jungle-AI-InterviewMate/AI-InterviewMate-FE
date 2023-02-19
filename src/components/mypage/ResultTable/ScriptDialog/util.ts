import { openingTagRegex, closingTagRegex } from "./regex";

type ReplaceKeywordTagsParams = {
  script: string;
  /** 숫자 태그를 교체할 HTML 태그. (예: em, strong, span) */
  tag: string;
}
export const replaceKeywordTags = ({ script, tag }: ReplaceKeywordTagsParams) => {
  const openingTag = `<${tag}>`;
  const closingTag = `</${tag}>`;
  const newScript = script
    .replace(openingTagRegex, openingTag)
    .replace(closingTagRegex, closingTag);

  return `<p>${newScript}</p>`;
};
