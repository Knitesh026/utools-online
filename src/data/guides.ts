export interface Guide {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  relatedTool: {
    name: string;
    path: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string[];
      codeOrFormula?: string;
      callout?: string;
    }[];
    summary: string;
    faq: {
      q: string;
      a: string;
    }[];
  };
}

export const guidesData: Guide[] = [
  {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentage: Complete Guide & Formulas",
    category: "Calculators",
    excerpt: "Learn how to calculate basic percentages, percentage increase, decrease, discounts and reverse percentages with step-by-step examples, and avoid the common mistakes that give wrong answers.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "GST & Percentage Calculators",
      path: "/gst-calculator",
    },
    content: {
      introduction: "Percentages appear in discounts, tax, interest, exam scores, nutrition labels and salary offers, yet many people rely on a calculator without being sure which number to divide by which. Almost every percentage problem is a variation of one idea: comparing a part with a whole, scaled to 100. This guide covers the main formulas, shows worked examples you can check by hand, and points out the mistakes that most often produce wrong answers.",
      sections: [
        {
          heading: "1. The Basic Percentage Formula",
          body: [
            "A percentage is a number expressed as a fraction of 100. The word comes from the Latin for 'by the hundred', so 25 percent means 25 out of every 100, or 0.25 as a decimal. To find what percentage one number (the part) is of another (the whole), divide the part by the whole and multiply by 100.",
            "For example, if you answered 42 questions correctly out of 50, the calculation is (42 / 50) × 100 = 84%. The order matters: the whole always goes underneath. Swapping them gives 50 / 42, or 119 percent, which would mean you scored more than the total.",
            "Percentages are most useful for comparing things of different sizes. Scoring 42 of 50 and 80 of 100 are hard to compare as raw counts, but 84 percent against 80 percent makes the comparison immediate.",
          ],
          codeOrFormula: "Percentage (%) = (Part / Whole) × 100",
        },
        {
          heading: "2. Finding a Percentage of a Number",
          body: [
            "The reverse task is common too: you know the percentage and the whole, and want the part. Convert the percentage to a decimal by dividing by 100, then multiply. To find 15 percent of 240, calculate 240 × 0.15 = 36. This is how tips, commissions and tax amounts are worked out.",
            "A mental shortcut is to find 10 percent by moving the decimal point one place, then build up from there. For 15 percent of 240, ten percent is 24 and five percent is half of that, 12, so the total is 36. The same trick works for 20 percent (double the 10 percent figure) or 25 percent (a quarter of the number).",
            "When a rate is given per year, remember that the result is per year as well. Eighteen percent of 1,250 is 225, and that figure only means something if you know what it is 18 percent of and over what period.",
          ],
          codeOrFormula: "Part = Whole × (Percentage / 100)",
        },
        {
          heading: "3. Percentage Increase and Decrease",
          body: [
            "Percentage change measures how much a value has moved relative to where it started. Subtract the old value from the new value, divide by the old value, and multiply by 100. If a price goes from 50 to 65, the change is 15, and 15 / 50 × 100 gives a 30 percent increase.",
            "For a decrease the method is identical, and the result is negative or described as a reduction. A jacket that falls from 120 to 90 has dropped by 30, and 30 / 120 × 100 is a 25 percent discount. The denominator is always the starting value, not the final one.",
            "That choice of denominator explains a surprising asymmetry. A rise from 100 to 110 is 10 percent, but the fall from 110 back to 100 is only about 9.09 percent, because it is measured against the larger starting value.",
          ],
          codeOrFormula: "Percentage Change (%) = ((New Value − Old Value) / Old Value) × 100",
          callout: "Always divide by the starting value. Percentage change is measured relative to where you began, not where you ended.",
        },
        {
          heading: "4. Working Backwards: Reverse Percentages",
          body: [
            "Sometimes you know the final price and the percentage that was applied, and need the original. The common error is to take the percentage off the final figure. If a sale price is 80 after a 20 percent discount, the original was not 80 plus 20 percent of 80 (which is 96). The sale price is 80 percent of the original, so the original is 80 / 0.80 = 100.",
            "The same logic works for increases. If a price including a 25 percent markup is 200, then 200 is 125 percent of the starting amount, and the starting amount is 200 / 1.25 = 160. Always ask what fraction of the original the final number represents, and divide by that.",
            "This is exactly the situation with tax-inclusive prices. To remove a tax added as a percentage, divide the total by 1 plus the rate, rather than subtracting the rate from the total.",
          ],
          codeOrFormula: "Original = Final value / (1 ± Percentage / 100)\n(use − for a discount, + for an increase)",
        },
        {
          heading: "5. Percentage Points and Successive Changes",
          body: [
            "A percentage point is the plain arithmetic difference between two percentages, while a percentage change is relative. If an interest rate moves from 5% to 6%, it has risen by one percentage point, which is a 20 percent relative increase (1 / 5). News reports often blur the two, so check which one is meant.",
            "Successive changes do not simply add or cancel. A price that rises 20 percent and then falls 20 percent does not return to where it started: 100 becomes 120, then 120 × 0.80 = 96. The second change applies to a different base. When you chain percentages, multiply the factors (1.20 × 0.80 = 0.96) instead of adding the percentages.",
            "This matters for discounts stacked on top of each other. A 10 percent discount followed by another 10 percent is a 19 percent discount in total, since 0.90 × 0.90 = 0.81, not 20 percent.",
          ],
        },
        {
          heading: "6. Common Mistakes and How to Check Your Work",
          body: [
            "The most frequent errors are using the wrong base, treating percentage points as percentages, and subtracting instead of dividing when going backwards. A quick sanity check catches most of them: a 20 percent discount should leave a result a little below the original, and a result above the original means something went wrong.",
            "Another good habit is to test with 100. Percentages are defined per hundred, so if a method works on a value of 100 it will work on any other. Apply your steps to 100 first and see whether the answer makes sense.",
            "Finally, keep full precision until the last step and round only the final answer. Rounding intermediate results, especially in multi-step problems like compound discounts, lets small errors build up. A calculator is a convenience, but understanding which number is the whole and which is the part is what keeps the answer right.",
          ],
        },
      ],
      summary: "Every percentage problem comes down to comparing a part with a whole, scaled to 100. Divide by the correct base, use the starting value for increases and decreases, divide rather than subtract when working backwards, and multiply factors for successive changes. A quick check with the number 100 catches most mistakes.",
      faq: [
        {
          q: "What is the difference between percentage and percentage points?",
          a: "Percentage points are the direct difference between two percentages, while a percentage change is relative to the starting value. A rate rising from 5% to 6% is one percentage point, which is a 20% relative increase.",
        },
        {
          q: "How do I calculate a discount?",
          a: "Multiply the original price by the discount percentage divided by 100 to get the amount off, then subtract it. A 15% discount on 240 saves 36, leaving 204. Equivalently, multiply by 0.85 in a single step.",
        },
        {
          q: "Can a percentage increase exceed 100%?",
          a: "Yes. Any value that more than doubles has increased by over 100%. A rise from 10 to 30 is an increase of 20, and 20 / 10 × 100 is 200%. A decrease, however, can never exceed 100%.",
        },
        {
          q: "How do I find the original price after a discount?",
          a: "Divide the sale price by the fraction that remains after the discount. If 20% was taken off, the sale price is 80% of the original, so divide by 0.80. Do not add 20% of the sale price back.",
        },
        {
          q: "Why does a 20% rise followed by a 20% fall not return to the start?",
          a: "Because each percentage applies to a different base. A rise of 20% takes 100 to 120, and a fall of 20% from 120 removes 24, leaving 96. The two changes multiply as 1.20 × 0.80 = 0.96 and do not cancel.",
        },
      ],
    },
  },
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works: Formula, Frequencies & Rules",
    category: "Finance",
    excerpt: "Understand how interest earning interest accelerates growth over time, with the formula, a worked example, the effect of compounding frequency, the Rule of 72 and why inflation matters.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "SIP & Investment Calculator",
      path: "/sip-calculator",
    },
    content: {
      introduction: "Compound interest means earning interest on your interest as well as on your original deposit. Over a short period the difference from simple interest is small, but over decades it becomes large, which is why it features in every conversation about long-term saving and about the cost of debt. This guide gives the formula, works through a verified example, compares compounding frequencies, explains the Rule of 72 and notes where the maths stops matching real life.",
      sections: [
        {
          heading: "1. Simple vs Compound Interest",
          body: [
            "Simple interest is calculated only on the original principal. If you deposit 100,000 at 8 percent simple interest for 10 years, you earn 8,000 every year, a total of 80,000, and end with 180,000. The yearly amount never changes because the base never changes.",
            "Compound interest adds each period's interest to the balance, so the next period's interest is calculated on a larger amount. The same 100,000 at 8 percent compounded annually for 10 years grows to about 215,892.50, which is roughly 35,900 more than simple interest produces.",
            "The gap is small in the early years and widens steadily. This accelerating curve is what people mean when they say that compounding rewards patience, and it applies in the other direction to loans and credit card balances where unpaid interest is added to the debt.",
          ],
        },
        {
          heading: "2. The Compound Interest Formula",
          body: [
            "The standard formula gives the final balance A from the principal P, the annual rate r written as a decimal, the number of compounding periods per year n, and the time t in years. Each period the balance is multiplied by (1 + r/n), and there are n × t periods in total.",
            "For the example above, P = 100,000, r = 0.08, n = 1 and t = 10, so A = 100,000 × 1.08^10 = 215,892.50. The interest earned is the final amount minus the principal: 115,892.50. All the figures in this guide were checked by running the formula in code.",
            "The formula assumes a fixed rate, no withdrawals and no extra deposits. Real accounts may change their rate, charge fees or be taxed, and regular contributions need a different formula, which is what a SIP calculator uses.",
          ],
          codeOrFormula: "A = P × (1 + r/n)^(n×t)",
        },
        {
          heading: "3. The Impact of Compounding Frequency",
          body: [
            "The more often interest is added, the more the balance grows, because interest starts earning interest sooner. Take 100,000 at 8 percent for 10 years. Compounded annually it reaches 215,892.50, quarterly 220,803.97, monthly 221,964.02 and daily 222,534.58.",
            "The differences shrink as frequency rises. Moving from annual to monthly adds about 6,000, while moving from monthly to daily adds only about 570. There is a ceiling, called continuous compounding, and real products sit well below the point where more frequency changes much.",
            "Because of this, quoted rates can be confusing. The effective annual rate shows what you actually earn in a year. An 8 percent nominal rate compounded monthly is an effective rate of about 8.30 percent, and compounded quarterly about 8.24 percent. When comparing products, compare the effective rate, not the headline one.",
          ],
          callout: "Compare accounts and loans by their effective annual rate. The same nominal rate yields different real returns depending on how often it compounds.",
        },
        {
          heading: "4. Why Starting Early Matters",
          body: [
            "Time is the strongest lever in the formula because it sits in the exponent. Invest 10,000 at 8 percent compounded annually. After 20 years it becomes about 46,610, and after 30 years about 100,627. The extra ten years more than double the result, even though the money and rate are identical.",
            "Most of the growth arrives at the end. In the 30 year case, more than half of the final balance is earned in the last decade, because the base on which interest is calculated has grown large by then. Interrupting the investment early gives up exactly the years that matter most.",
            "This also explains why debt can feel unmanageable. A balance on which interest compounds at a high rate and is not paid down grows in the same accelerating way, only now it works against the borrower.",
          ],
        },
        {
          heading: "5. The Rule of 72 Shortcut",
          body: [
            "The Rule of 72 estimates how many years it takes for money to double at a given annual compounded rate: divide 72 by the rate as a whole number. At 8 percent the answer is 72 / 8 = 9 years. The exact figure from the formula is 9.006 years, so the shortcut is very close.",
            "It is less exact at the extremes. At 2 percent the rule gives 36 years against an exact 35.0, and at 24 percent it gives 3 years against an exact 3.22. In the common range of about 4 to 15 percent it is reliable enough for quick mental estimates.",
            "The rule can also be used in reverse. If you want to double your money in 12 years, you need roughly 72 / 12 = 6 percent a year. Use it as a rough guide and rely on the formula or a calculator when exact numbers matter.",
          ],
          codeOrFormula: "Years to double ≈ 72 / Annual rate (%)\nExact: ln(2) / ln(1 + r)",
        },
        {
          heading: "6. Inflation, Taxes and Realistic Expectations",
          body: [
            "A nominal return does not tell you how much your buying power grows. If your money earns 8 percent while prices rise 5 percent, the real return is about 2.86 percent, calculated as 1.08 / 1.05 − 1. A simple subtraction (8 − 5 = 3) is a close approximation at low rates but drifts as rates climb.",
            "Taxes and fees also reduce the effective rate. A product charging a yearly fee compounds that cost against you in the same way that interest compounds for you, so a small percentage difference matters over a long period.",
            "Finally, the formula uses a fixed rate, while market-linked investments vary from year to year. Treat compound interest calculations as illustrations of how the mechanism works, not as forecasts, and try several rates to see how sensitive the result is.",
          ],
        },
      ],
      summary: "Compound interest grows a balance by adding each period's interest to the base, so growth accelerates with time. Frequency has a modest effect, duration a very large one, and the Rule of 72 gives a quick doubling estimate. Remember inflation, fees and taxes when judging what a result is really worth.",
      faq: [
        {
          q: "What is the primary difference between simple and compound interest?",
          a: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all interest already added, so the amount earned each period grows and the balance rises along an accelerating curve.",
        },
        {
          q: "How does inflation affect compound interest?",
          a: "Inflation reduces what money can buy. Your real return is roughly your nominal rate adjusted for inflation: with 8% interest and 5% inflation it is about 2.86% in real terms, not the full 8%.",
        },
        {
          q: "Is daily compounding much better than monthly?",
          a: "Only slightly. At 8% on 100,000 over 10 years, monthly compounding gives about 221,964 and daily gives about 222,535. The difference is small next to the effect of the rate and the number of years.",
        },
        {
          q: "How accurate is the Rule of 72?",
          a: "It is accurate for typical rates of about 4 to 15 percent. At 8% it gives 9 years against an exact 9.006. It drifts at very low or very high rates, where the exact logarithm formula is better.",
        },
        {
          q: "Does the formula work for regular monthly deposits?",
          a: "Not directly. The basic formula covers a single lump sum. Regular contributions need a future value formula for a series of payments, which is what a SIP calculator applies.",
        },
      ],
    },
  },
  {
    slug: "how-to-compress-pdf-images",
    title: "How to Reduce PDF and Image File Size Without Ruining Quality",
    category: "Document & Image",
    excerpt: "Learn what makes PDFs and images large, how lossless and lossy compression differ, what our Compress PDF tool does and does not do, and which steps actually shrink image-heavy files.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "Compress PDF Tool",
      path: "/compress-pdf",
    },
    content: {
      introduction: "Large PDFs and heavy images get rejected by upload portals, bounce from email and slow down web pages. Before trying to shrink a file it helps to know what is making it large, because different tools fix different problems. This guide explains how PDFs store content, the difference between lossless and lossy compression, what the Compress PDF tool on this site does (and what it does not), and the methods that really reduce image weight.",
      sections: [
        {
          heading: "1. What Makes a PDF Large",
          body: [
            "A PDF is a container holding text, fonts, vector drawings, metadata and often embedded images. Pages of typed text are small, usually tens or hundreds of kilobytes. The big files almost always come from images: scanned pages, photographs and screenshots, each stored as pixel data.",
            "Fonts can add weight when many are embedded in full, and some files carry leftovers from editing, such as unused objects, thumbnails or document history. Metadata such as author, software and revision details is small but can matter for privacy.",
            "To find the cause, look at what the document is. If it is a scan of 20 pages, the images are the file. If it is exported from a word processor with no pictures, the file is already compact and there is little to gain from any tool.",
          ],
        },
        {
          heading: "2. Lossless vs Lossy Compression",
          body: [
            "Lossless compression rewrites data more efficiently while preserving every value exactly. PDF streams commonly use a lossless method for text and graphics, and PNG images use it too. Decompressing gives back exactly what went in, so there is no quality cost, but the saving on photographic content is limited.",
            "Lossy compression discards detail the eye is unlikely to miss. JPEG is the standard example. At a moderate quality setting a photograph can shrink dramatically with little visible change, but the discarded data cannot be recovered, and repeated lossy saves compound the damage.",
            "The practical rule is to apply lossy compression once, from the best source, and keep an original. Text and line art look worst under heavy lossy compression, so be gentler on scanned documents full of small print than on holiday photographs.",
          ],
        },
        {
          heading: "3. What the Compress PDF Tool Here Does",
          body: [
            "To be clear about its scope: the Compress PDF tool on this site re-saves the PDF and strips document metadata. It does not recompress or downsample the images embedded in the file. That means the saving depends on how much overhead the original contained.",
            "A file with a lot of leftover structure or metadata may shrink noticeably, while a scan made of large photographs will usually change very little. If the output is about the same size as the input, that is the expected result for an image-heavy file, not a fault.",
            "The processing happens in your browser, so the document is not sent to a server. That is useful for contracts, IDs and similar files, but it does not turn the tool into an image optimiser. For image-heavy PDFs you need to reduce the images themselves, as described below.",
          ],
          callout: "If a PDF is large because of scanned pages or photos, re-saving will not help much. Shrink the images before the PDF is built.",
        },
        {
          heading: "4. How Image Recompression Works",
          body: [
            "Tools that do shrink image-heavy PDFs generally do two things: downsample and recompress. Downsampling reduces the pixel dimensions, for example from 600 to 150 or 200 pixels per inch, which cuts the pixel count sharply because it falls with the square of the change. Halving resolution leaves one quarter of the pixels.",
            "Recompression then re-encodes the images, often as JPEG at a lower quality setting. Combined, the two steps can reduce a scan-based file a great deal, with the trade-off that very small text may lose crispness. For on-screen reading, 150 pixels per inch is often enough, while printing wants more.",
            "Neither step is available in the Compress PDF tool here, so treat this as background to help you evaluate other software and to prepare your files correctly in the first place.",
          ],
          codeOrFormula: "Pixels after resize = Original pixels × (new PPI / old PPI)²\nExample: 600 → 150 PPI keeps (150/600)² = 1/16 of the pixels",
        },
        {
          heading: "5. What Actually Reduces Image Size Here",
          body: [
            "The reliable route is to reduce images before they go into the PDF. Resize photos to the pixel dimensions you really need with the Image Resizer, and compress them with the Image Compressor, then build the PDF from the smaller files. This works because the PDF simply embeds what you give it.",
            "When you scan, choose a moderate resolution for text documents rather than the maximum the scanner offers, and prefer black and white or greyscale for plain text pages. Colour scans at high resolution are the most common reason a short document turns into tens of megabytes.",
            "Format choice matters too. Photographs suit JPEG, while screenshots and flat graphics suit PNG. Putting a photo in as PNG makes it far larger than it needs to be. If you then merge several PDFs, check the combined size, since the total is roughly the sum of the parts.",
          ],
        },
        {
          heading: "6. Checking the Result",
          body: [
            "After shrinking a file, open it and look at it at normal reading size and again zoomed in. Confirm that small print, signatures, stamps and numbers are still legible, and that nothing important has become blurry or blocky. A smaller file is no use if the content cannot be read.",
            "Compare the sizes before and after, and keep the original until you have confirmed the new version works with the destination portal. Many forms specify a limit such as a number of kilobytes, so check against that rather than guessing.",
            "If the file is still too large, reduce further in steps rather than all at once, and consider splitting a long document into two files if the destination allows it. Avoid claims of fixed percentage savings: results depend entirely on what the file contains.",
          ],
        },
      ],
      summary: "PDF size is mostly decided by embedded images, so real savings come from fewer pixels and stronger image compression, not from re-saving. Our Compress PDF tool re-saves the file and strips metadata only. For image-heavy files, resize and compress the images first, then build the PDF and check legibility.",
      faq: [
        {
          q: "Will compressing a PDF make text blurry?",
          a: "Text stored as real fonts stays sharp at any zoom. Blur appears when pages are images, such as scans, and those images are downsampled or compressed heavily. Always check small print after shrinking a scanned document.",
        },
        {
          q: "Why did my PDF barely get smaller?",
          a: "The Compress PDF tool re-saves the file and removes metadata, but does not recompress embedded images. If most of the file is photographs or scans, there is little for it to remove. Shrink the images themselves instead.",
        },
        {
          q: "What is the best format for web images?",
          a: "WebP often gives smaller files than JPEG or PNG at similar quality and supports transparency, but compatibility with older software varies. JPEG suits photos and PNG suits sharp graphics, so test your own images.",
        },
        {
          q: "Is my PDF uploaded when I compress it here?",
          a: "No. The tool runs in your browser, so the file is processed on your device. As with any file you handle, keep an original copy in case you need the unmodified version.",
        },
      ],
    },
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Editable Word Documents (.docx)",
    category: "Document",
    excerpt: "Learn how PDF text extraction works, why layout is hard to preserve, how scanned PDFs differ from text PDFs, and how to get the cleanest editable Word result from the text in your document.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "PDF to Word Converter",
      path: "/pdf-to-word",
    },
    content: {
      introduction: "PDFs are built to look the same everywhere, which makes them excellent for sharing and awkward for editing. When you need to reuse the words in a PDF, converting it to a Word document (.docx) is the usual route. The quality of the result depends heavily on how the PDF was made and what you expect from the conversion. This guide explains how PDF text is stored, what the PDF to Word tool on this site does, what it does not do, and how to clean up the output.",
      sections: [
        {
          heading: "1. Why PDFs Are Hard to Edit",
          body: [
            "A word processor stores a document as flowing content: paragraphs, headings, tables and styles that reflow when you change the page size. A PDF stores something quite different. It records where each piece of text sits on a fixed page, often as individual runs of characters with exact coordinates.",
            "There is usually no stored notion of a paragraph, a column or a heading. Two lines that look like one paragraph to a reader may be unrelated drawing instructions in the file. Software that converts a PDF has to guess the structure from positions, which is why results vary.",
            "This is not a defect of any single tool. It is a consequence of the format, which was designed to preserve appearance rather than editability. The more complex the page, with columns, tables, sidebars and images, the more guessing is involved.",
          ],
        },
        {
          heading: "2. What the Tool on This Site Does",
          body: [
            "The PDF to Word tool reads the text layer of your PDF using pdf.js, a widely used open source PDF reader, and writes that text into a standard .docx file. It runs in your browser, so the document is not uploaded to a server for processing.",
            "It extracts text only. It does not try to reproduce the original layout, so columns, tables, headers, footers, fonts, colours and embedded pictures are not carried over as they appear in the PDF. You get the words in a Word file you can edit, not a visual copy of the page.",
            "That scope suits tasks such as reusing a paragraph, editing a letter or pulling quotations out of a report. If you need a pixel-faithful Word version of a designed brochure or a form with complicated tables, expect to rebuild the formatting by hand.",
          ],
          callout: "This converter extracts the text. It does not preserve layout, tables, fonts or images, so plan to reformat the result in Word.",
        },
        {
          heading: "3. Text PDFs vs Scanned PDFs",
          body: [
            "A text PDF, such as one exported from Word, Google Docs or a website, contains real characters. Extraction can read them directly, so the wording comes through accurately even though the layout does not.",
            "A scanned PDF is a set of page photographs. There are no characters inside, only pixels, so there is no text layer to extract. When you try to convert such a file here, the tool reports an error because it has no text to work with, and it does not perform optical character recognition (OCR).",
            "You can tell which kind you have by trying to select a word with your cursor in a PDF viewer, or by using the search function. If you can highlight and find words, there is a text layer. If the whole page selects as one image, it is a scan, and you need OCR software to turn it into text first.",
          ],
        },
        {
          heading: "4. Getting a Cleaner Result",
          body: [
            "Start with the best version of the PDF available. A PDF exported directly from the original document converts better than one that was printed, scanned and re-saved. If you wrote the document yourself, going back to the source file is always preferable to converting its PDF.",
            "After conversion, expect to do a short clean-up pass. Check line breaks in the middle of sentences, which can appear where the original text wrapped. Check for hyphenated words split across lines, bullet points that became ordinary characters, and the order of text in multi-column pages, which may be read in an unexpected sequence.",
            "Apply your own styles after cleaning. Select the text, set the font and paragraph spacing, then apply heading styles so the document has a structure. Doing this once, on clean text, is usually faster than fixing a conversion that tried to copy the layout badly.",
          ],
        },
        {
          heading: "5. Privacy and Handling Sensitive Documents",
          body: [
            "Documents people convert often contain personal or confidential material: contracts, CVs, payslips, reports. Many online converters upload files to remote servers, where you have little control over storage and retention. Check any service's policy before sending sensitive material.",
            "Because this tool processes the file in your browser, the document stays on your device during conversion. That reduces exposure, though you should still treat the output as sensitive. Save it somewhere appropriate and delete copies you no longer need.",
            "Also remember that the output may contain text you did not realise was in the PDF, such as hidden or off-page text. Skim the document before sharing the Word version, especially if the PDF was made from something that had comments or tracked changes.",
          ],
        },
        {
          heading: "6. Alternatives When Layout Matters",
          body: [
            "If the layout is the point, a text-only converter is the wrong tool. Desktop software and some word processors can open a PDF and attempt to rebuild it, with mixed success on complex pages. Test on one page before committing to a long document.",
            "For small edits, a PDF editor may be more efficient than converting at all. Changing a date or correcting a name can be done in place without disturbing the rest of the page.",
            "For scanned documents, run OCR first and check the result carefully, especially numbers, names and dates, since recognition errors are common on poor scans. Whatever route you choose, compare the final document against the original PDF before relying on it.",
          ],
        },
      ],
      summary: "PDFs store fixed positions rather than flowing paragraphs, so conversion is always partly guesswork. The PDF to Word tool here extracts the text layer in your browser and does not preserve layout, and scanned PDFs without text produce an error. Use it to reuse text, then reformat in Word.",
      faq: [
        {
          q: "Can I edit the converted file in Microsoft Word and Google Docs?",
          a: "Yes. The output is a standard .docx file, which opens in Microsoft Word, Google Docs, LibreOffice and similar software. Expect to reapply formatting, since the converter focuses on the text rather than the original design.",
        },
        {
          q: "Why does my scanned PDF give an error?",
          a: "A scan is a picture of a page with no characters inside, so there is no text layer to extract. The tool does not perform OCR. Run the file through OCR software first, then convert the searchable result.",
        },
        {
          q: "Will tables, columns and images be kept?",
          a: "No. The tool extracts text only, so layout elements such as tables, columns, fonts and images are not reproduced. You will need to rebuild that formatting in Word if you need it.",
        },
        {
          q: "Are my confidential documents uploaded anywhere?",
          a: "No. The text is extracted inside your browser and the Word file is created there, so the document is not sent to a server by this tool. Handle the downloaded file with the same care as the original.",
        },
      ],
    },
  },
  {
    slug: "what-is-a-uuid-and-how-to-use",
    title: "What is a UUID (v4) and How is it Used in Software?",
    category: "Developer",
    excerpt: "A practical guide to UUIDs: their structure, how version 4 differs from other versions, the real maths of collision probability, secure generation, and trade-offs when using them as database keys.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "UUID Generator",
      path: "/uuid-generator",
    },
    content: {
      introduction: "Software often needs identifiers that two systems can create independently without clashing: order numbers, file names, session tokens, event IDs. A universally unique identifier (UUID) is a 128-bit value designed for exactly this. Version 4, the most widely used type, is made from random bits. This guide explains the structure, the arithmetic behind the claim that collisions are practically impossible, how to generate UUIDs correctly, and when a UUID is not the best choice.",
      sections: [
        {
          heading: "1. Anatomy of a UUID",
          body: [
            "A UUID is 128 bits, normally written as 32 hexadecimal digits in five groups separated by hyphens, in the pattern 8-4-4-4-12, which makes 36 characters including the hyphens. An example of a version 4 UUID is 3f2b8c1e-5a47-4d9e-9b1c-7e6a2d4f8a10.",
            "Not every bit is free. In the third group, the first digit states the version, so a 4 means a random UUID. In the fourth group, the first digit encodes the variant and for standard UUIDs is one of 8, 9, a or b. You can check the example: the third group starts with 4 and the fourth with 9.",
            "These fixed bits use 6 of the 128, leaving 122 random bits in a version 4 UUID. The formatting with hyphens and lowercase hex is a convention. Many systems accept uppercase, braces or no hyphens, but storing one consistent form avoids comparison problems.",
          ],
        },
        {
          heading: "2. How Likely Is a Collision?",
          body: [
            "With 122 random bits there are 2^122 possible version 4 UUIDs, about 5.3 × 10^36. That is far more than can ever be generated in practice, but two random values can still match by chance, so the honest answer is that a collision is extremely unlikely, not literally impossible.",
            "The birthday problem gives the estimate. After generating n UUIDs, the chance of any duplicate is approximately n² / (2 × 2^122). A 50 percent chance needs about 2.7 × 10^18 UUIDs, roughly 2.7 quintillion. If you generated one billion UUIDs every second for a full year, about 3.15 × 10^16 in total, the chance of any duplicate would still be around 0.009 percent.",
            "These figures assume a good random source. The mathematics only holds if the bits are truly unpredictable, which is why the choice of generator matters more than the size of the number.",
          ],
          codeOrFormula: "Possible values = 2^122 ≈ 5.3 × 10^36\nP(collision) ≈ n² / (2 × 2^122)\n50% chance at n ≈ 1.18 × √(2^122) ≈ 2.7 × 10^18",
        },
        {
          heading: "3. Generating UUIDs Securely",
          body: [
            "Use a cryptographically secure random source. In browsers and in Node.js, crypto.randomUUID() returns a version 4 UUID built from such a source. The UUID Generator on this site uses crypto.randomUUID(), and generation happens in your browser.",
            "Avoid building UUIDs from Math.random(). That function is not designed for security and its output can be predictable or have weaker randomness, which raises both collision risk and the risk that someone can guess identifiers.",
            "Even a good UUID should not be treated as a secret. A random identifier is hard to guess, but it appears in URLs, logs and referrer headers. Do not use it as the only protection for private data. Access control belongs on the server, with proper authorisation checks.",
          ],
          callout: "Use crypto.randomUUID() or an equivalent secure generator. Never rely on Math.random() for identifiers, and never treat a UUID as a password.",
        },
        {
          heading: "4. UUID Versions Compared",
          body: [
            "Version 1 combines a timestamp with a node identifier, traditionally derived from the machine's network address. It sorts roughly by time but can reveal when and where it was generated, which is a privacy concern.",
            "Version 4 is random and reveals nothing, which is why it is the common default. Version 5 and version 3 are name-based: they hash a namespace and a name, so the same inputs always give the same UUID, useful for stable identifiers derived from existing data.",
            "Newer designs add time-ordered versions, such as version 7 in the updated UUID specification, which put a timestamp in the leading bits and random data after it. They aim to keep uniqueness while sorting in creation order, which helps databases. Check that your libraries and database support the version before adopting it.",
          ],
        },
        {
          heading: "5. UUIDs as Database Keys",
          body: [
            "UUIDs are popular as primary keys because services can create them without asking a central database, which suits distributed systems, offline clients and merging data from several sources. They also avoid exposing record counts, as sequential numbers do.",
            "The costs are real. A UUID takes 16 bytes in binary form, or 36 characters as text, against 4 or 8 bytes for an integer. Random values scatter inserts across a database index instead of appending at the end, which can slow writes and enlarge indexes on very large tables.",
            "Store UUIDs in a native UUID or 16-byte binary column where your database offers one, not as text, to save space. Consider a time-ordered version for write-heavy tables. For a small application with a single database, an auto-incrementing integer is often simpler and perfectly adequate.",
          ],
        },
        {
          heading: "6. Practical Tips",
          body: [
            "Generate identifiers at the point of creation, ideally on the server for anything that matters, and let the database enforce uniqueness with a constraint. A unique constraint costs little and turns the vanishingly unlikely duplicate into a clean error rather than corrupt data.",
            "Do not shorten or truncate UUIDs to make them look tidier. Cutting a version 4 UUID to eight characters leaves 32 bits, where collisions become likely after tens of thousands of values. If you need short codes, use a design made for it and check for duplicates.",
            "Treat UUIDs as opaque strings. Do not parse meaning from them, except to check the format when validating input. Compare them in a consistent case, and log them in full so that records can be traced when something goes wrong.",
          ],
        },
      ],
      summary: "A version 4 UUID is a 128-bit identifier with 122 random bits, so duplicates are astronomically unlikely though not impossible. Generate them with crypto.randomUUID(), never treat them as secrets, store them in native columns, and consider time-ordered versions when index performance matters.",
      faq: [
        {
          q: "What is the difference between UUID v1 and UUID v4?",
          a: "Version 1 is built from a timestamp and a node identifier, so it can leak when and where it was created. Version 4 is made from random bits and carries no such information, which is why it is the common default.",
        },
        {
          q: "Can UUIDs be used as database primary keys?",
          a: "Yes. Most major databases support a UUID type or 16-byte storage. The trade-offs are larger keys and scattered index inserts compared with sequential integers, so weigh them against the benefit of generating IDs anywhere.",
        },
        {
          q: "Can two UUIDs ever be the same?",
          a: "In theory yes, in practice almost never. A 50% chance of one duplicate needs about 2.7 quintillion version 4 UUIDs. A unique constraint in the database protects you in the rare case it happens.",
        },
        {
          q: "Is a UUID safe to use as a secret token?",
          a: "Not by itself. A random UUID is hard to guess, but it is often logged and shared in URLs. For authentication tokens use a purpose-built secure token mechanism and enforce authorisation on the server.",
        },
      ],
    },
  },
  {
    slug: "how-to-use-qr-codes-safely",
    title: "How to Use QR Codes Safely: Types, Errors & Best Practices",
    category: "Utility",
    excerpt: "Learn how QR codes store data, what the four error correction levels mean, the difference between static and dynamic codes, and how to create and scan them without falling for malicious links.",
    readTime: "7 min read",
    publishedAt: "September 2026",
    relatedTool: {
      name: "QR Code Generator",
      path: "/qr-code",
    },
    content: {
      introduction: "QR codes link printed material to digital content: menus, Wi-Fi details, payment pages, event tickets, business cards. They are convenient because a phone camera reads them instantly, and that same speed is the risk, since you cannot see where a code leads before you scan it. This guide explains how QR codes store data, what error correction does, how static and dynamic codes differ, and practical habits for making and scanning codes safely.",
      sections: [
        {
          heading: "1. How QR Codes Work",
          body: [
            "A QR code is a square grid of dark and light modules that encodes data as a pattern. The three large squares in the corners are finder patterns, which let a scanner locate the code and work out its orientation, so it can be read upside down or at an angle. Smaller alignment and timing patterns help correct for distortion.",
            "Size grows with the amount of data. The smallest version is a 21 by 21 grid, and each step up adds 4 modules per side, to a maximum of 177 by 177 in version 40. At the largest size and lowest error correction, a code can hold roughly 4,000 alphanumeric characters or about 3,000 bytes of data.",
            "More data means a denser code with smaller modules, which is harder to scan. For links, keep the text short. A shorter URL produces a simpler pattern that scans faster from a distance and at lower print quality.",
          ],
        },
        {
          heading: "2. Error Correction Levels",
          body: [
            "QR codes include redundant data using Reed-Solomon error correction, so a code can still be read when part of it is dirty, scratched or covered. There are four levels: L recovers up to about 7 percent of the code, M about 15 percent, Q about 25 percent and H about 30 percent.",
            "Higher levels give more resilience but need more modules for the same content, so the code becomes denser. Level M is a sensible default for printed material. Choose Q or H when the code may be worn, such as on stickers or outdoor signs, or when a logo will cover part of the centre.",
            "Error correction is not a licence to obscure the code. Covering a large area with a logo, low contrast colours or decorative effects can still make a code unreadable. Always test the finished design with more than one phone before printing in bulk.",
          ],
          callout: "Pick a level to match the conditions: M for clean print, Q or H for worn surfaces or codes with a logo. Then test the real printout.",
        },
        {
          heading: "3. Static vs Dynamic QR Codes",
          body: [
            "A static code stores the final content directly in the pattern: the URL, the text or the Wi-Fi details. Once printed it never changes, and it works for as long as the destination does. It needs no account or subscription, because nothing depends on a third party.",
            "A dynamic code stores a short redirect address controlled by a service. The service can change the destination later and may offer scan statistics. The drawback is dependency: if the subscription lapses or the provider closes, the printed code can stop working or point somewhere unexpected.",
            "The QR Code Generator on this site creates static codes, and generation happens in your browser, with no request sent to a server to build the code. The content you enter becomes the pattern directly. If you may need to change the destination later, point the code at a page you control and update that page instead.",
          ],
        },
        {
          heading: "4. Risks of Scanning Unknown Codes",
          body: [
            "A QR code can encode any text, so it can lead to a phishing page, trigger a download prompt or pre-fill a message or payment request. Attackers sometimes place stickers over legitimate codes in public places, so a poster or parking meter code is not necessarily what the owner intended.",
            "The code itself is just data, and the risk arises from what you do next. Scanning is generally safe in itself, but entering passwords, card details or personal information on the page it opens is where harm happens. Treat the destination like a link from an unknown sender.",
            "Be most careful with requests that create urgency or ask for payment or login, such as parking fees, package delivery notices or account verification. When in doubt, reach the service by typing its address yourself or using its official app.",
          ],
        },
        {
          heading: "5. How to Scan Safely",
          body: [
            "Use your phone's built-in camera or a trusted scanner that shows the full address before opening it. Read the address carefully: check the domain name, watch for look-alike spellings and be wary of shortened links that hide the real destination.",
            "Look at the physical code. If it is a sticker placed over another one, or the surface looks tampered with, do not use it. Prefer codes from sources you trust, and do not scan codes received in unexpected emails or messages.",
            "After opening a page, check that it uses HTTPS, that the address matches what you expect, and that it is not asking for more than the task needs. Never approve app installs or permission requests from a page you reached through an unknown code. If something feels wrong, close it.",
          ],
        },
        {
          heading: "6. Best Practices for Creating Codes",
          body: [
            "Keep the content short and use a link you control. Include a quiet zone, the blank margin around the code, of at least four modules, because scanners need it to separate the code from the background. Maintain strong contrast, ideally dark modules on a light background.",
            "Print at a size suited to the scanning distance. A common rule of thumb is that the code should be about one tenth of the distance it will be scanned from, so a code on a poster read from two metres away needs to be roughly 20 centimetres wide. Test, since printer quality and lighting change the result.",
            "Tell people what the code does with a short label beside it, such as 'Scan for the menu'. This builds trust and helps people notice if a sticker has been placed over yours. Check old codes occasionally to make sure the destination still works.",
          ],
        },
      ],
      summary: "QR codes store data in a pattern that scanners read with built-in error correction at four levels. Static codes are permanent and independent of any service, while dynamic ones depend on a provider. Scan carefully, check the full address, avoid entering sensitive details on unexpected pages, and test any code you print.",
      faq: [
        {
          q: "Do QR codes generated on this site expire?",
          a: "No. They are static codes, with the content encoded directly in the pattern, so nothing expires. The code keeps working as long as the destination it points to still exists.",
        },
        {
          q: "Is my data sent to a server when I generate a code?",
          a: "No. The code is generated in your browser without a server request, so what you type stays on your device while the pattern is built. Still, avoid encoding secrets in a code that others can scan.",
        },
        {
          q: "Which error correction level should I choose?",
          a: "Level M suits most clean printed uses. Choose Q or H if the code may get worn or dirty, or if you place a logo over the middle. Higher levels make the code denser, so test scanning on real phones.",
        },
        {
          q: "Can scanning a QR code harm my phone?",
          a: "Scanning alone is low risk, as the code only contains data. The danger comes from what you do next, such as opening a malicious page, entering credentials or approving a download. Check the address before you continue.",
        },
        {
          q: "How big should a printed QR code be?",
          a: "A rule of thumb is one tenth of the expected scanning distance, so about 20 cm for a poster scanned from 2 metres. Keep the quiet zone clear and test the printout with several phones before printing in bulk.",
        },
      ],
    },
  },
];
