import type { ToolContent } from "./types";
import { imageContent } from "./image";
import { documentsContent } from "./documents";
import { calculatorsContent } from "./calculators";
import { utilitiesContent } from "./utilities";

export type { ToolContent };

const all: Record<string, ToolContent> = {
  ...imageContent,
  ...documentsContent,
  ...calculatorsContent,
  ...utilitiesContent,
};

/** Alias routes that render the same tool. */
const aliases: Record<string, string> = {
  "/qr-code-generator": "/qr-code",
};

export const getToolContent = (path: string): ToolContent | undefined => {
  const clean = path.replace(/\/+$/, "") || "/";
  return all[aliases[clean] ?? clean];
};

export const allToolContent = all;
