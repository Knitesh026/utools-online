import { guidesData } from "./guides";
import { moreGuides } from "./guidesMore";
import type { Guide } from "./guides";

export type { Guide };

/** Every published guide, newest additions last. */
export const allGuides: Guide[] = [...guidesData, ...moreGuides];
