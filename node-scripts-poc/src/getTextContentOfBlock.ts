import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getTextContentOfBlockFromId = async (
  blockId: string,
  notion: Client
): Promise<string> => {
  const blocks = await notion.blocks.children.list({
    block_id: blockId,
  });

  const content = await Promise.all(
    blocks.results.map(async (block) => {
      if (!("type" in block)) return;
      const text = getTextContentOfBlockWithoutChildren(block);
      if (!block.has_children) return text;

      const childrenText = await getTextContentOfBlockFromId(block.id, notion);
      return text + "\n  " + childrenText.split("\n").join("\n  ");
    })
  );

  return content.join("\n");
};

const getTextContentOfBlockWithoutChildren = (
  block: BlockObjectResponse
): string => {
  switch (block.type) {
    case "paragraph":
      return block.paragraph.rich_text.map((text) => text.plain_text).join("");
    case "heading_1":
      return (
        "# " + block.heading_1.rich_text.map((text) => text.plain_text).join("")
      );
    case "heading_2":
      return (
        "## " +
        block.heading_2.rich_text.map((text) => text.plain_text).join("")
      );
    case "heading_3":
      return (
        "### " +
        block.heading_3.rich_text.map((text) => text.plain_text).join("")
      );
    case "bulleted_list_item":
      return block.bulleted_list_item.rich_text
        .map((text) => "- " + text.plain_text)
        .join("");
    case "numbered_list_item":
      return block.numbered_list_item.rich_text
        .map((text, i) => `${i + 1}. ${text.plain_text}`)
        .join("");
    case "to_do":
      return block.to_do.rich_text
        .map((text) => "- [ ] " + text.plain_text)
        .join("");
    case "toggle":
      return block.toggle.rich_text
        .map((text) => "- " + text.plain_text)
        .join("");
    case "child_page":
      return `[${block.child_page.title}]()`;
    case "code":
      return (
        "```\n" +
        block.code.rich_text.map((text) => text.plain_text).join("") +
        "\n```"
      );
    default:
      console.error("Unknown block type: ", block.type);
      return "";
  }
};
