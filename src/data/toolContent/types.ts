/**
 * Original, tool-specific written content shown beneath each tool.
 * Every field must be written for that one tool: no text may be shared between tools.
 */
export interface ToolContent {
  /** Route path exactly as registered in App.tsx, e.g. "/compress-pdf" */
  route: string;
  /** Human tool name, e.g. "Compress PDF" */
  name: string;
  /** 2 paragraphs (~60-90 words each): what the tool does, who uses it and why. */
  intro: string[];
  /** 2 paragraphs (~70-110 words each): the method, math or format rules behind the result, and where processing happens. */
  howItWorks: string[];
  /** 4-6 steps that match the real controls on the page. Each 15-35 words. */
  steps: string[];
  /** A concrete worked example with real input and output values. */
  example: { title: string; text: string };
  /** 3-4 realistic scenarios. */
  useCases: { title: string; text: string }[];
  /** 4-5 practical tips or common mistakes. Each 20-40 words. */
  tips: string[];
  /** Honest limits of the tool (file size, formats, accuracy, what it does not do). 40-80 words. */
  limitations: string;
  /** 5-6 questions. Answers 35-80 words, specific to this tool. */
  faqs: { question: string; answer: string }[];
}
