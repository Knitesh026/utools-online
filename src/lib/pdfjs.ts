import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export { pdfjsLib };

export async function loadPdf(file: File) {
  const data = new Uint8Array(await file.arrayBuffer());
  return pdfjsLib.getDocument({ data }).promise;
}

/**
 * Extracts text from every page using pdf.js. Items are grouped into lines by
 * their y position and sorted left to right. Returns paragraphs separated by
 * blank lines. An empty string means the PDF has no extractable text layer.
 */
export async function extractPdfText(file: File): Promise<{ text: string; pages: number }> {
  const pdf = await loadPdf(file);
  const pageTexts: string[] = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const items = content.items.filter((i: any) => typeof i.str === "string" && i.str.trim() !== "") as any[];
    const lines: { y: number; h: number; parts: { x: number; w: number; s: string }[] }[] = [];
    for (const it of items) {
      const x = it.transform[4];
      const y = it.transform[5];
      const h = Math.abs(it.height || it.transform[3] || 10);
      let line = lines.find((l) => Math.abs(l.y - y) <= Math.max(2, h * 0.4));
      if (!line) {
        line = { y, h, parts: [] };
        lines.push(line);
      }
      line.parts.push({ x, w: it.width || 0, s: it.str });
    }
    lines.sort((a, b) => b.y - a.y);
    const out: string[] = [];
    let prev: (typeof lines)[number] | null = null;
    for (const l of lines) {
      l.parts.sort((a, b) => a.x - b.x);
      let s = "";
      let endX: number | null = null;
      for (const part of l.parts) {
        if (endX !== null && part.x - endX > l.h * 0.15 && !s.endsWith(" ") && !part.s.startsWith(" ")) s += " ";
        s += part.s;
        endX = part.x + part.w;
      }
      if (prev && prev.y - l.y > Math.max(prev.h, l.h) * 1.9) out.push("");
      out.push(s.trim());
      prev = l;
    }
    pageTexts.push(out.join("\n"));
  }
  const text = pageTexts.join("\n\n").trim();
  return { text, pages: pdf.numPages };
}
