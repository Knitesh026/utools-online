import type { ToolContent } from "./types";

export const documentsContent: Record<string, ToolContent> = {
  "/image-to-pdf": {
    route: "/image-to-pdf",
    name: "Image to PDF",
    intro: [
      "Image to PDF takes one or more pictures from your device and places each of them on its own A4 page of a new PDF document. It is the quickest way to turn phone photos of a receipt, a signed form, a whiteboard or a handwritten page into one file that can be emailed, uploaded to a portal or archived without sending a pile of loose JPEGs.",
      "People reach for it when a website asks for a single PDF but all they have is a handful of camera shots or screenshots. Students use it for scanned homework, small businesses for expense claims, and tenants or applicants for identity and address proofs that must be submitted as one attachment. Everything is assembled from the files you select, in the order you select them.",
    ],
    howItWorks: [
      "A PDF page is a rectangle of a fixed size, measured in points or millimetres, that holds drawing instructions. An image is placed on a page by embedding its pixel data once and then telling the page to draw it at a given position and width. This page uses the jsPDF library to do exactly that: it creates a portrait A4 document (210 by 297 mm), embeds each image, and draws it 190 mm wide, which leaves a 10 mm margin on the left and right.",
      "The height is worked out from the picture's own proportions (height times 190 divided by width), so nothing is stretched, and the picture is centred vertically on the page. A new page is added for every image after the first. All of this runs in your browser: the files are read with the FileReader API, never sent anywhere, and the finished document is saved straight to your downloads as images-to-pdf.pdf.",
    ],
    steps: [
      "Click the dashed upload area and pick one or more image files. You can select several at once, and you can come back and add more afterwards.",
      "Check the Selected Images list. Each row shows a small thumbnail and a label such as Image 1, so you can confirm the right pictures were added.",
      "Use the Remove button on any row to take out a wrong picture, or Clear All to empty the list and start over.",
      "Click Generate PDF. The button reads Generating PDF... while the pages are built, which takes longer for large photos.",
      "Wait for the download of images-to-pdf.pdf to start, then open it to check that the pages appear in the order you expected.",
    ],
    example: {
      title: "Illustrative example: three phone photos of a lease",
      text: "Suppose you photograph a three-page lease with your phone and each picture is 3000 x 4000 pixels (3:4 portrait). Each image is drawn 190 mm wide, so its height is 4000 x 190 / 3000 = 253.3 mm. That fits inside the 297 mm page, and the vertical offset is (297 - 253.3) / 2 = 21.8 mm of blank space above and below. The result is a three-page PDF with one photo per page. A landscape 4000 x 3000 photo would be 190 mm wide and 142.5 mm tall, sitting in the middle of the page with larger white bands above and below.",
    },
    useCases: [
      { title: "Submitting documents to an online portal", text: "Visa, bank and university application forms often accept only one PDF. Photograph each page, add the pictures in order and upload the single file the portal asks for." },
      { title: "Expense claims", text: "Combine a month of receipt photos into one PDF so finance staff open one attachment rather than twenty images with names like IMG_4821.jpg." },
      { title: "Sharing a handwritten set of notes", text: "Photograph pages of a notebook or whiteboard, convert them together, and send classmates a file that keeps the page order and opens on any device." },
      { title: "Archiving screenshots", text: "Bundle screenshots of a conversation, an order confirmation or an error message into one dated file you can store alongside other records." },
    ],
    tips: [
      "Add images in the order you want them to appear. The page has no drag handles, so if the order is wrong the simplest fix is Clear All and re-adding them.",
      "Photograph pages straight on, in even light, before converting. The tool places the picture as is, so a crooked or shadowed shot stays crooked or shadowed in the PDF.",
      "Very large camera photos make large PDFs because the full pixel data is embedded. If the result is too big to email, shrink the pictures first with an image resizer or compressor.",
      "Check the first page after downloading. It takes a few seconds and catches a missing, duplicated or sideways image before you send the file to someone.",
      "Select images of similar proportions when you can. Mixed portrait and landscape shots all work, but the white space around each one will differ from page to page.",
    ],
    limitations: "Pages are always portrait A4 with a fixed 10 mm side margin, and there are no options for page size, orientation, margins or compression quality. Images are scaled to fit the width only, so an extremely tall picture, taller than about 277 mm at 190 mm wide, can run past the edge of its page. There is no reordering control, no rotation, and no text recognition, so the pages are pictures rather than searchable text.",
    faqs: [
      { question: "Are my images uploaded to a server?", answer: "No. The pictures are read into your browser's memory with FileReader and the PDF is built there with jsPDF. The finished file is saved directly to your device, so the images do not travel over the network during conversion." },
      { question: "Which image formats can I use?", answer: "The upload box accepts any file your browser classes as an image, and the page mentions PNG, JPG and GIF. Common formats like JPEG and PNG are the safe choice. Unusual formats such as HEIC from some phones may not be readable by every browser." },
      { question: "Can I put several images on one page?", answer: "No. Each image gets a page of its own, centred on an A4 sheet. If you want a collage on a single page, combine the pictures into one image first and then convert that image." },
      { question: "Why is my PDF so large?", answer: "The full image data is embedded, so a stack of 12-megapixel photos produces a heavy file. Reduce the pixel dimensions or JPEG quality of the originals before converting, since a page printed at A4 does not need more than roughly 2000 pixels across." },
      { question: "Will the PDF text be searchable?", answer: "No. The pages contain pictures only. Text inside a photographed document is just pixels, and this tool does not run text recognition, so you cannot select or search it unless you process the PDF with an OCR program afterwards." },
      { question: "Is there a limit on how many images I can add?", answer: "The page does not set a count limit. The upload area states a maximum of 50 MB per image, and in practice the ceiling is your device's memory, because every image is held in the browser until the PDF has been created." },
    ],
  },

  "/pdf-to-image": {
    route: "/pdf-to-image",
    name: "PDF to Image",
    intro: [
      "PDF to Image turns every page of a PDF into a separate PNG or JPG picture. You choose a PDF of up to 50 MB, pick the image format and a resolution, press Convert to Images, and get a list of page previews, each with its own download button, plus a button that downloads all pages at once.",
      "People want this when they need a single page for a slide deck, a thumbnail for a website, a figure from a paper, or a version of a document that can travel through apps that accept pictures but not PDFs. Because the pages are drawn in your browser, the document is never uploaded, which suits contracts, statements and anything private.",
    ],
    howItWorks: [
      "A PDF page is not a picture. It is a list of drawing commands: place this text in this font at these coordinates, draw this curve, paint this embedded photo. Turning it into an image means rasterising, which is executing those commands onto a grid of pixels. The grid size comes from the scale you choose. A PDF page is measured in points of 1/72 inch, so scale 1 gives one pixel per point (72 DPI), scale 2 gives 144 DPI, and so on up to 4x at 288 DPI.",
      "This page uses the pdf.js library, the same engine that powers Firefox's PDF viewer. For each page it draws onto an off-screen canvas filled with white, then asks the canvas to encode itself as PNG, which keeps every pixel, or as JPG at 92 percent quality, which trades fine detail for a smaller file. The resulting files are held in browser memory and offered as downloads named after the PDF with the page number added.",
    ],
    steps: [
      "Click the upload area and choose a PDF file. Choosing anything other than a PDF shows an error, and files over 50 MB are refused with a size message.",
      "Once the file name appears in the File Selected box, choose a Format, either PNG for sharp text or JPG for smaller files.",
      "Choose a Resolution from the menu, from 1x (72 DPI, a small preview) up to 4x (288 DPI, large and detailed). 2x is the default.",
      "Click Convert to Images. The button reads Converting... and the page list fills as each page finishes rendering.",
      "Click the download icon next to a page to save it, or use Download all pages to save every page. Your browser may ask permission to download multiple files.",
    ],
    example: {
      title: "Illustrative example: image sizes for an A4 page",
      text: "An A4 page is 595 x 842 points. At 1x the image is 595 x 842 pixels, about 0.5 megapixels. At 2x it is 1190 x 1684 pixels (2.0 megapixels), at 3x 1785 x 2526 (4.5 megapixels) and at 4x 2380 x 3368 (8.0 megapixels). Going from 1x to 4x multiplies the pixel count by 16, which is why a 4x PNG of a busy page can be several megabytes while the 1x version is a few hundred kilobytes. For an A4 page printed full size, 4x (about 288 DPI) is close to the usual 300 DPI print standard.",
    },
    useCases: [
      { title: "Pulling a figure out of a paper", text: "Render one page at 3x or 4x, then crop the chart you need for a presentation instead of taking a blurry screenshot." },
      { title: "Sharing a page in a chat app", text: "Many messengers preview images inline but treat PDFs as downloads, so a page converted to PNG is easier for recipients to glance at." },
      { title: "Website thumbnails", text: "A first-page preview image of a brochure or report lets visitors see what they are about to download." },
      { title: "Editing a page in an image editor", text: "Rasterised pages can be annotated, redacted by painting over areas, or retouched in any program that opens PNG or JPG files." },
    ],
    tips: [
      "Choose PNG for pages with text, tables and diagrams, because JPEG compression leaves faint smudges around sharp edges and small letters.",
      "Pick the resolution to match the destination. 2x is plenty for screens and slides, while 4x is only needed if the picture will be printed at full page size.",
      "Convert long documents in parts when you can. A 200-page PDF at 4x produces hundreds of megabytes of pictures, all held in browser memory at once.",
      "Remember that text in an exported image can no longer be selected or searched. Keep the original PDF if you may need the words later.",
      "If your browser blocks the multiple downloads from Download all pages, allow downloads for the site when prompted, or save pages one at a time with the individual buttons.",
    ],
    limitations: "Pages are always exported as flat pictures, so text is no longer selectable and no OCR is performed. There is no page-range selector; every page is converted. Output is limited to PNG and JPG at four preset scales. Password-protected PDFs cannot be opened, the upload limit is 50 MB, and very large pages at 4x may exceed the canvas size your browser or phone can handle, in which case a lower scale is needed. Rendering quality depends on pdf.js.",
    faqs: [
      { question: "Is my PDF uploaded to a server?", answer: "No. The file is read into your browser, drawn page by page with pdf.js onto a canvas, and encoded as an image there. Nothing is transmitted, and the images exist only in memory until you download them." },
      { question: "What is the difference between PNG and JPG for PDF pages?", answer: "PNG keeps every pixel exactly, so text stays crisp, but files are larger. JPG discards fine detail to save space, which suits photo-heavy pages but blurs small text. For documents, PNG is usually the better choice." },
      { question: "Which resolution should I choose?", answer: "Resolution is the scale factor over 72 DPI. 1x gives small previews, 2x (144 DPI) looks sharp on screens, and 4x (288 DPI) approaches print quality. Doubling the scale quadruples the pixel count and roughly quadruples the file size." },
      { question: "Can I convert only some pages?", answer: "Not directly. The tool renders every page and lists them, and you download the ones you want with the per-page buttons. For a very long file, split the PDF into the pages you need first." },
      { question: "Why did my password-protected PDF fail?", answer: "A PDF that needs a password to open cannot be read by the renderer, so the page reports that the conversion failed. Remove the password in a PDF viewer first, if you are entitled to open the document." },
      { question: "Can I get editable text from the images?", answer: "No. Images are just pixels. Getting editable words from a scan needs optical character recognition, which is a separate process. If the PDF already contains real text, a PDF to Word tool is the better route." },
    ],
  },

  "/compress-pdf": {
    route: "/compress-pdf",
    name: "Compress PDF",
    intro: [
      "Compress PDF re-saves a document in a more compact form so it is easier to attach to an email or upload to a form with a size limit. You choose a PDF of up to 80 MB, press Compress PDF Now, and the page shows the real size before and after and the percentage change, then offers the result for download.",
      "It suits situations such as a job application portal that caps attachments at 2 MB, a mailbox that rejects messages over 20 MB, or a shared drive where dozens of nearly identical reports are eating space. It is a structural optimiser, not an image shrinker, and the sections below explain what that means for the results you should expect.",
    ],
    howItWorks: [
      "Inside a PDF file, the content is a collection of numbered objects: pages, fonts, image streams, annotations and bookkeeping tables. Some producers write these objects in a loose way, with metadata left in, separate small objects, and no object streams. This page loads the file with the pdf-lib library, blanks the title, author, subject and keywords fields, sets its own producer name, and writes the file back out with object streams enabled, which packs many small objects into one compressed block.",
      "That reduces overhead, and it can help noticeably on documents created by programs that write verbose files. It does not touch the photographs inside the PDF, so it does not lower image resolution or recompress JPEG data. Whatever size drop you see depends on how wasteful the original structure was. All of the work happens in your browser, and the file is not uploaded.",
    ],
    steps: [
      "Click the upload area or drag a PDF onto it. Anything that is not a PDF is refused, and files over 80 MB trigger a size warning.",
      "Read the file card, which shows the file name and the Original Size so you have a baseline to compare against.",
      "Read the note on the page: the tool re-saves the file and clears metadata, and it does not shrink embedded images.",
      "Click Compress PDF Now. A short wait follows while the document is loaded and re-saved in your browser.",
      "Review the Before, After and Size Reduction figures, then click Download Compressed PDF to get a file named after the original with -compressed added.",
    ],
    example: {
      title: "Illustrative example: reading the result panel",
      text: "Imagine a 4.80 MB report exported from a word processor. After compression the panel shows 4.32 MB. The reduction is (4.80 - 4.32) / 4.80 = 0.10, so the page displays -10.0%. A scanned 4.80 MB file made of full-page JPEG photos might come out at 4.79 MB, a reduction of 0.2%, because the bulk of its weight is image data that this method leaves alone. The figures are the real byte sizes of the original and the re-saved file.",
    },
    useCases: [
      { title: "Meeting an attachment limit", text: "Squeeze a slightly oversized report under a 10 MB or 25 MB mail limit when it only needs a modest trim." },
      { title: "Removing author details before sharing", text: "The tool clears the title, author, subject and keyword fields, which is handy when a draft carries a colleague's name or an internal project title." },
      { title: "Tidying files from verbose exporters", text: "Documents produced by some scripts and reporting tools store many small uncompressed objects and shrink well when repacked." },
      { title: "Housekeeping an archive", text: "Re-saving a folder of old reports one by one can recover some space, as a first pass before deciding whether stronger tools are justified." },
    ],
    tips: [
      "Expect small gains on scanned or photo-heavy PDFs. Their size is mostly image data, and a structural re-save cannot shrink that. Re-scan at a lower resolution instead.",
      "Compare the Before and After figures. They are the real byte sizes of your file and the re-saved file, and if the page reports no reduction, keep your original.",
      "Keep the original file until you have opened the compressed copy and flipped through the pages. It is a quick check that nothing important went missing.",
      "Unlock password-protected files before compressing. A document that needs a password to open usually cannot be processed here.",
      "If the file is already small and well built, the result can be about the same size or slightly larger. The page then says the PDF is already optimised and shows no reduction.",
    ],
    limitations: "This is lossless structural optimisation only. It does not downsample or recompress images, flatten transparency, or subset fonts, so photo-heavy and scanned PDFs may barely shrink. If the re-saved file is not smaller, the page says the PDF is already optimised and shows no reduction, and you should keep your original. Encrypted files can fail, and the limit is 80 MB per file.",
    faqs: [
      { question: "Does compression reduce the quality of my PDF?", answer: "The method used here does not recompress or resample images and does not alter text, fonts or vector drawings, so pages should look the same. What changes is how objects are packaged and which document properties, such as title and author, are kept." },
      { question: "Why did my file barely get smaller?", answer: "Most of the weight in many PDFs is embedded photographs or scanned page images. Repacking the structure cannot make those smaller. To cut size substantially you need to lower the image resolution or quality, which this tool does not do." },
      { question: "Are there compression levels to choose from?", answer: "No. The tool does one thing: it re-saves the PDF with a compact structure and clears the title, author, subject and keywords. Since there is no strength setting, judge the outcome by the real before and after sizes shown." },
      { question: "Is my document sent to a server?", answer: "No. The file is read into browser memory, processed with pdf-lib and offered back as a download. There is no upload step, which matters for contracts, statements and anything else you would rather not send out." },
      { question: "Can the compressed file be larger than the original?", answer: "Yes, occasionally. If the source was already efficiently packed, re-saving it may add a little overhead. The page then reports that it is already optimised, and you should keep your original file." },
      { question: "What is the largest file I can compress?", answer: "The page rejects files over 80 MB. Memory use grows with file size because the whole document is loaded in your browser, so very large PDFs may be slow on phones or older computers even when they are under the limit." },
    ],
  },

  "/merge-pdf": {
    route: "/merge-pdf",
    name: "Merge PDF",
    intro: [
      "Merge PDF joins two or more PDF files into a single document, in the order you arrange them. You add the files, move them up or down until the sequence is right, press the merge button, name the output file, and download one combined PDF containing every page of every input.",
      "Typical jobs are assembling an application packet from a cover letter, CV and certificates, putting scanned chapters back together, or combining monthly invoices into one file for an accountant. A merged file is easier to send, easier to print in one run, and impossible to receive with a page missing from the middle.",
    ],
    howItWorks: [
      "A PDF keeps its pages in a page tree, an ordered structure inside the file. Merging does not paste pictures of pages together. A tool creates a new empty document, opens each source, copies the page objects together with the fonts, images and content they depend on, and appends them to the new page tree. Page order in the result is simply the order in which the sources were processed, so the arrangement of your list is what decides the final sequence.",
      "This page does that with the pdf-lib library, running in your browser. It requires at least two files, accepts up to 100 MB per file, and saves with object streams to keep the output compact. The code can also forward the files to an external Stirling PDF service first if the site is configured with one, and it falls back to the in-browser method if that service is missing or fails.",
    ],
    steps: [
      "Click Upload from PC or Mobile, or drag PDFs onto the upload area. Every file must be a PDF, and each must be under 100 MB.",
      "Review the list. Each row shows the file name and its size in megabytes, and the total size is summarised for the whole batch.",
      "Use the up and down arrow buttons on a row to change its position, and the bin button to remove a file you added by mistake.",
      "Click the Merge button, which shows the count of files, for example Merge 3 PDFs. It stays disabled until two or more files are listed.",
      "In the Merge Complete panel, edit the Output Filename if you want something other than merged.pdf, then click Download Merged PDF. Clear and Start Over resets the page.",
    ],
    example: {
      title: "Illustrative example: three files, one packet",
      text: "Suppose cover-letter.pdf has 1 page, cv.pdf has 2 pages and certificates.pdf has 4 pages. Arranged in that order, the merged output has 1 + 2 + 4 = 7 pages: page 1 is the letter, pages 2 and 3 are the CV, and pages 4 to 7 are the certificates. If you moved certificates.pdf to the top instead, its four pages would come first and the letter would become page 6. The output size is roughly the sum of the inputs, minus any shared fonts or resources that can be stored once.",
    },
    useCases: [
      { title: "Job or visa application packets", text: "Combine a cover letter, CV, references and supporting certificates into the single attachment that the application form allows." },
      { title: "Monthly bookkeeping", text: "Join separate invoice or receipt PDFs into one file per month so an accountant or tax filing portal only needs one upload." },
      { title: "Rebuilding scanned documents", text: "Office scanners often produce one PDF per batch. Merge the batches in order to recover a complete contract or manual." },
      { title: "Course material and reports", text: "Put chapters written by different people into one handout, with a cover page file placed first." },
    ],
    tips: [
      "Arrange the list before merging, not after. Once the combined file exists, reordering pages needs a different kind of tool, so check the sequence and file names first.",
      "Name your files with a number prefix like 01-cover.pdf before uploading. It makes the list easy to verify at a glance when many documents are involved.",
      "Remove password protection from inputs first. Encrypted sources may fail to merge or produce pages that do not display correctly in the result.",
      "Open the downloaded file and scroll through it. Check page count, orientation and that mixed page sizes, such as A4 beside Letter, look acceptable for printing.",
      "Set a descriptive Output Filename such as application-packet-2025.pdf now, so you do not have to rename merged.pdf and risk confusing versions later.",
    ],
    limitations: "Merging works on whole files only: you cannot choose page ranges, rotate pages or delete pages here. Bookmarks, outlines and interactive form behaviour from the sources are not guaranteed to survive, and password-protected PDFs may fail. Pages keep their original sizes, so mixed A4 and Letter inputs stay mixed. The limits are 100 MB per file, and at least two files are required.",
    faqs: [
      { question: "Are my PDFs uploaded when I merge them?", answer: "By default the merge runs in your browser with pdf-lib, so the files stay on your device. The code is also able to try an external Stirling PDF server first when the site has one configured, and then falls back to the browser method." },
      { question: "How do I change the order of the files?", answer: "Use the up and down arrow buttons on each file row. The order shown in the list is the order of the pages in the result, from top to bottom. Remove and re-add a file if you want to start it afresh." },
      { question: "Can I merge only some pages of a PDF?", answer: "Not with this tool. It always takes every page of each file. To use only certain pages, split or extract them into a separate PDF first, then add that smaller file to the merge list." },
      { question: "Why do I need at least two files?", answer: "Merging combines documents, so with a single file there is nothing to join. The merge button stays disabled until the list contains two or more PDFs, and the label updates with the count." },
      { question: "Will the merged file be bigger than the originals combined?", answer: "It is usually close to the sum of the inputs. Shared resources such as an identical embedded font can sometimes be stored once, making it a bit smaller, while extra document structure can make it a little larger." },
      { question: "Why did merging fail for one of my files?", answer: "The usual causes are a password-protected file, a corrupted download or a file that is not really a PDF. The page reports that files must be valid, unlocked PDFs. Open the file in a viewer to test it, or re-save it as a fresh PDF." },
    ],
  },

  "/esign-pdf": {
    route: "/esign-pdf",
    name: "eSign PDF",
    intro: [
      "eSign PDF lets you draw a handwritten-style signature with a mouse, trackpad or finger and stamp it onto a page of a PDF. Choose the page, optionally type your name, press Sign & Finalize PDF, and download a copy with your drawn signature, typed name and date placed at the bottom right of that page. It is a convenient replacement for the print, sign by hand and scan routine.",
      "People use it for simple paperwork such as rental forms, permission slips, quotes, internal approvals and vendor onboarding documents that only call for a visible signature. It is a visual signature tool. It does not produce a cryptographic digital signature, and the notes below explain the difference so you can decide whether it fits the document at hand.",
    ],
    howItWorks: [
      "The signature pad is an HTML canvas. While you press and drag, the page records the pointer's path as a series of connected line segments drawn with a rounded 2.5 pixel stroke in dark slate. When you finish, the canvas is exported as a transparent PNG. The pdf-lib library then embeds that PNG in your document and draws it on the page you selected, with its right edge about 50 points in from the page edge and its base 70 points above the bottom. A point is 1/72 of an inch.",
      "The result is a normal PDF in which the signature is just another image sitting on the page, so it looks like ink but is not tied to your identity. A digital signature in the formal sense uses a certificate and a cryptographic hash, so any later change to the file is detectable. This tool does no such thing. The typed name and the date are printed as text beneath it. Everything is processed in your browser, and your document is not uploaded.",
    ],
    steps: [
      "Click the upload area or drop in a PDF. The page reads the file to count its pages; password-protected files cannot be read and give an error.",
      "Draw your signature in the box under Draw Your Signature Below, using mouse, trackpad, stylus or finger. Use Clear Signature to wipe the pad and try again.",
      "Open the Page to Place Signature menu and pick a page. It defaults to the last page, labelled Last Page, where sign-offs usually go.",
      "Optionally type your name in the Typed Signer Name box, and set the Signature Date. Both are printed as small text beneath the signature.",
      "Click Sign & Finalize PDF, then Download Signed PDF. The file is saved as signed- followed by the original file name.",
    ],
    example: {
      title: "Illustrative example: where the signature lands",
      text: "Take a standard A4 page, which is 595 points wide and 842 points tall. A signature you drew becomes an image about 180 points wide at most and 60 points tall at most. It is placed with its left edge near x = 595 - width - 50, so about 365 points from the left when the width is 180, and its bottom edge 70 points up from the bottom. In millimetres that is roughly 25 mm from the bottom edge and 18 mm from the right edge. If you picked page 3 of a 3-page contract, only page 3 changes.",
    },
    useCases: [
      { title: "Returning a signed form quickly", text: "Sign a rental application, permission form or timesheet on your phone and send it back without finding a printer." },
      { title: "Approving internal documents", text: "Add a visible sign-off to a purchase request or policy acknowledgement that only needs an on-page signature." },
      { title: "Freelance quotes and invoices", text: "Sign a quote before sending it to a client so the document looks complete and authorised." },
      { title: "Signing from a tablet or phone", text: "The pad responds to touch, so you can use a finger or stylus and end up with a more natural-looking signature than a mouse gives." },
    ],
    tips: [
      "Draw slowly and fill most of the pad. The signature is scaled down onto the page, and tiny drawings end up as tiny marks.",
      "A drawn signature looks more like a signature than typed text. If you only type a name, it is printed as plain text under the signature position, which many recipients will not accept as a signature.",
      "Check the page after downloading. The position is fixed near the bottom right, so confirm it sits on the signature line and does not cover printed text.",
      "Keep the original unsigned PDF. Once the signature is embedded as an image it is not editable, and you may need a clean copy later.",
      "Ask the recipient whether a drawn signature is acceptable. Some bodies need a certificate-based digital signature, a witnessed signature or a particular platform.",
    ],
    limitations: "This is a visual signature only. It is not a certificate-based digital signature, carries no timestamp or audit trail, and does not detect later edits. The position is fixed at the bottom right of the chosen page and cannot be dragged or resized. The typed name is printed in plain Helvetica text and is not a handwriting-style signature; it must use standard Latin letters. If you leave everything empty the tool refuses to sign. Password-protected PDFs cannot be opened. Whether a drawn signature has legal effect depends on the document and local rules, so check what applies.",
    faqs: [
      { question: "Is a signature drawn here legally binding?", answer: "That depends on the document type, the country and the agreement between the parties. Many everyday agreements accept simple electronic signatures, but some documents require stronger forms. Check the rules for your situation or ask the recipient before relying on it." },
      { question: "Does this add a digital certificate to the PDF?", answer: "No. The tool embeds your drawing as an image. A true digital signature uses a certificate and cryptographic checks so later changes can be detected, and that is not part of this page." },
      { question: "Why is my signature not where I wanted it?", answer: "Placement is fixed near the bottom right of the page you choose, with no way to move it. Pick the page carefully, and if the signature line is somewhere else, sign using a PDF editor that supports free placement." },
      { question: "Is my document uploaded anywhere?", answer: "No. The PDF is read in your browser, the signature image is added there with pdf-lib, and the signed copy is made available as a download. Neither the document nor your signature is sent to a server." },
      { question: "Can I sign multiple pages in one go?", answer: "Not in a single run. You select one page for the signature. To sign more pages, download the signed file, upload it again, draw the signature again, and choose a different page." },
      { question: "What happens if I draw nothing and type nothing?", answer: "The page shows an error and does not create a file, so you cannot download a copy that looks signed but contains no signature. Draw a signature, type a name, or both, and try again." },
    ],
  },

  "/pdf-to-word": {
    route: "/pdf-to-word",
    name: "PDF to Word",
    intro: [
      "PDF to Word extracts the text of a PDF and places it in a new Word file with the .docx extension, so you can edit, copy or reformat the words in a word processor. You choose a PDF of up to 50 MB, press Convert to Word Now, see a short preview of the extracted text, and then download the document.",
      "The need is common: a contract came as a PDF and you want to change a clause, a report has to be re-used in a newsletter, or you want the text out of a document that does not copy cleanly. Because PDF is a layout format and not an editing format, this conversion is always approximate. This tool recovers the text and paragraphs, not the original page design.",
    ],
    howItWorks: [
      "A PDF does not store paragraphs. It stores small pieces of text, each placed at exact coordinates on a page. To rebuild readable text, a converter has to read those pieces, group the ones that share a vertical position into a line, order the pieces from left to right, and decide where one paragraph ends and the next begins. This page does that with the pdf.js library: it asks each page for its text items, groups items into lines by their y position, and treats an unusually large vertical gap as a paragraph break.",
      "The lines of each paragraph are then joined into flowing text and written with the docx library as 12 pt paragraphs under a heading made from the file name. Everything runs in your browser. If the PDF has no text layer, which is the case for scans and photographed pages, there are no characters to read, and the page says so instead of producing a file with made-up content.",
    ],
    steps: [
      "Click the upload area or drag a PDF onto it. A non-PDF file is rejected with an error message, and anything above 50 MB is turned away before reading begins.",
      "Check that the file name is shown, then click Convert to Word Now to start the extraction in your browser.",
      "Read the extracted text preview, which shows up to the first 300 characters of what was found, so you can judge whether the result is useful.",
      "If the page reports that no extractable text was found, the PDF is a scan. Run it through an OCR tool first and try again.",
      "Click Download Word (.docx) to save the file, open it in Word, LibreOffice or Google Docs, and proofread it against the original.",
    ],
    example: {
      title: "Illustrative example: how pieces become paragraphs",
      text: "Suppose page 1 of a PDF contains the pieces Quarterly sales (y = 700), rose by 8% (y = 700, further right), then Costs were flat. (y = 686) and, after a bigger gap, Outlook is stable. (y = 640). The first two share y = 700, so they join into the line Quarterly sales rose by 8%. The line at y = 686 is only 14 points lower, a normal line gap, so it continues the same paragraph. The line at y = 640 is 46 points lower, well over the cut-off of about twice the line height, so it starts a new paragraph. The Word file therefore has two paragraphs under the title.",
    },
    useCases: [
      { title: "Reworking a text-based PDF", text: "Pull the wording of a letter, policy or article out of a PDF so you can edit it and send an updated version." },
      { title: "Checking whether a PDF contains real text", text: "If the preview shows your words, the PDF has an extractable text layer. If the page says no text was found, the document is a scan." },
      { title: "Starting a rewrite or translation", text: "Use the extracted paragraphs as a clean starting point for rewriting, summarising or translating, then rebuild headings and tables yourself." },
      { title: "Private, offline-style conversion", text: "Because it runs in the browser, you can convert a confidential document without sending it to a server." },
    ],
    tips: [
      "Look at the preview before downloading. If it shows garbled characters, the PDF probably uses an unusual font encoding, and another tool may do better.",
      "Do not expect tables, columns, images, headers or footnotes to survive. The output is a flat run of paragraphs, and anything arranged visually loses its arrangement.",
      "For a scanned PDF, use an OCR program first. There are no characters in the file to extract until one reads the images.",
      "Multi-column pages can come out interleaved, because text at the same height is joined into one line. Check two-column articles line by line.",
      "Always compare the Word file with the original before relying on it. Extraction can merge or split words in ways that are easy to miss.",
    ],
    limitations: "This recovers text only. Layout, fonts, bold and italics, images, tables, columns, headers, footers and page breaks are not carried over, and multi-column pages may read out of order. Scanned PDFs have no text layer and there is no OCR, so they are rejected with a clear message. Some PDFs with unusual font encodings give garbled characters, and right-to-left scripts may come out in the wrong order. Password-protected files cannot be read. The upload limit is 50 MB.",
    faqs: [
      { question: "Will the Word file look like my PDF?", answer: "No. The output is a flow of paragraphs in one font size under a title heading. Page layout, columns, images, tables and styling are not reproduced. Matching the layout needs a far more sophisticated converter." },
      { question: "Why does the page say no extractable text was found?", answer: "The PDF is probably a scan or a photograph saved as PDF, so each page is only a picture. There are no characters to read. Use an OCR tool to recognise the text first, then convert the resulting searchable PDF." },
      { question: "Can this convert a scanned document into editable text?", answer: "No. A scan is a set of page images, and turning that into words requires optical character recognition. This page does not perform OCR, so it reports that nothing could be extracted instead." },
      { question: "Is my PDF uploaded to a server?", answer: "No. The file is read into browser memory, text is extracted with pdf.js, and a .docx is built with a JavaScript library on your device. Nothing is sent over the network during conversion." },
      { question: "Why are some words joined or split oddly?", answer: "PDFs place text in small pieces, and the tool decides where spaces belong from the gaps between pieces. Tightly kerned or justified text can occasionally fool that guess, so proofread the result." },
      { question: "Is the output a real .docx file?", answer: "Yes, it is a genuine Word document created with the docx library, with a heading and ordinary paragraphs, and it opens in Word, LibreOffice and Google Docs." },
    ],
  },

  "/word-to-pdf": {
    route: "/word-to-pdf",
    name: "Word to PDF",
    intro: [
      "Word to PDF reads a .docx file and writes the text of its paragraphs into a new PDF. You pick a Word document of up to 40 MB, press Convert to PDF Now, see a short text preview, and then download the PDF. It is a lightweight way to produce a read-only copy of a simple text document without opening a word processor.",
      "A PDF is convenient because it looks the same on every device and cannot be reflowed by the recipient's software. People send CVs, letters, meeting notes and simple reports this way. This tool handles straightforward text content well, but it does not reproduce Word's full layout engine, so documents with rich formatting will come out much plainer.",
    ],
    howItWorks: [
      "A .docx file is a ZIP archive of XML files. The main text lives in word/document.xml, where each paragraph is a w:p element and the visible characters sit inside w:t elements within it. This page opens the archive with JSZip, parses that XML with the browser's DOMParser, and joins the w:t pieces of every paragraph to get plain text. Styles, numbering, images, tables and headers are stored in other parts and in other elements, and are not used.",
      "It then builds a PDF with pdf-lib: A4 pages of 595 by 842 points, 50 point margins, Helvetica at 11 points with 16 points between lines. The file name becomes a bold 18 point title at the top. Each paragraph is word-wrapped by measuring the width of text, and a new page starts when the lines reach the bottom margin. Helvetica here is a standard PDF font that covers Western European characters, so some other scripts cannot be drawn. All work stays in your browser.",
    ],
    steps: [
      "Click the upload area and select a Word file. Only .docx files are accepted; other extensions, including the older .doc, are rejected with a message.",
      "Confirm the file name, noting the 40 MB limit that applies to the upload.",
      "Click Convert to PDF Now. The browser unzips the file, collects the paragraph text and draws it on new pages.",
      "Read the short text preview that appears, which shows the start of what was captured from the document.",
      "Click Download PDF Document to save the result, then page through it to check that all of your text is present.",
    ],
    example: {
      title: "Illustrative example: how many lines fit on a page",
      text: "A page is 841.89 points tall with a 50 point margin at the top, and 35 points are used by the title. Body text starts at 841.89 - 50 - 35 = 756.89 points and each line takes 16 points. New content stops about 70 points from the bottom edge (50 margin + 20 allowance), so roughly (756.89 - 70) / 16 = 42 lines fit on the first page, a little more on later pages that have no title. Each paragraph adds 10 points of spacing. Across the 495 point text width, Helvetica at 11 points fits roughly 85 to 90 characters per line, so a 600-word letter of about 3,600 characters wraps to around 40 lines plus paragraph gaps, close to one full page.",
    },
    useCases: [
      { title: "Sending a plain letter or notes", text: "Convert text-only documents such as meeting minutes, cover letters or instructions into a PDF that opens identically for everyone." },
      { title: "Making a quick read-only copy", text: "Share a document you do not want recipients to edit without needing a full office suite on your computer." },
      { title: "Extracting text in a simple layout", text: "Turn the wording of a messy Word file into a clean, uniform page sequence without fonts, colours or odd spacing." },
      { title: "Working on a locked-down computer", text: "Convert in the browser when you cannot install software or export to PDF from your word processor." },
    ],
    tips: [
      "Use a document that is mostly text. Pictures, tables, text boxes and charts in the Word file will not appear in the PDF.",
      "Save older .doc files as .docx in Word or LibreOffice before uploading. The older binary format is not accepted.",
      "Expect headings, bold, italics, lists and colours to be flattened into body text, and plan to fix up the PDF or use Word's own export if layout matters.",
      "Check non-English text carefully. Characters outside the standard Latin set, including many accented capitals, emoji and scripts like Devanagari, may stop the conversion.",
      "Open the final PDF and scan every page quickly. It takes under a minute and confirms nothing was dropped between the Word file and the new document.",
    ],
    limitations: "Only the text of paragraphs is carried across. Images, tables, bullet or number formatting, bold and italic styles, fonts, colours, headers, footers, footnotes and page breaks are lost, and the output is always A4 in Helvetica 11 pt. Line breaks and tabs inside a paragraph are not preserved. Legacy .doc files are not accepted, and characters outside the standard Latin set can cause an error. The upload limit is 40 MB. For faithful layout, export from Word itself.",
    faqs: [
      { question: "Will fonts, images and tables be preserved?", answer: "No. The tool extracts plain paragraph text and sets it in Helvetica. Pictures, tables, text boxes, headers, footers and colours are not read, so use your word processor's own Save as PDF function when layout matters." },
      { question: "Can I convert an older .doc file?", answer: "No. Only .docx files are accepted, because the older .doc format is a different binary format that this tool cannot read. Open the file in Word or LibreOffice, use Save As to choose .docx, and upload that copy." },
      { question: "Is my document uploaded anywhere?", answer: "No. The file is unzipped and parsed in your browser by JavaScript, the PDF is created there with pdf-lib, and it is offered as a download. Nothing is transmitted to a server in the process." },
      { question: "Why did my conversion fail with a non-English document?", answer: "The PDF is drawn with Helvetica, a standard font that only covers a limited character set. Text in scripts such as Hindi, Arabic, Chinese or emoji cannot be encoded, and the conversion stops with an error." },
      { question: "Why are my headings and bold text gone?", answer: "The tool joins the text runs from each paragraph and ignores their formatting properties. Everything is written in the same 11 point style, apart from the file name that is added at the top as a title." },
      { question: "How large can the Word file be?", answer: "The page enforces a 40 MB limit. Documents with many embedded pictures can reach that size, but since images are not used in the output, you can save a copy without pictures to get under the limit if needed." },
    ],
  },

  "/documents-converter": {
    route: "/documents-converter",
    name: "Documents Converter",
    intro: [
      "Documents Converter moves text between three formats: PDF, Word (.docx) and plain text (.txt). You upload one file, choose a target format from three cards, press Convert Document Now, and download the result. Think of it as a small utility for getting the words of a document into whichever container the next step needs.",
      "Examples include turning a .txt note into a tidy PDF for sharing, pulling the text out of a .docx for a plain-text system, or giving a PDF's words a new life as an editable Word file. Conversion works by extracting text and rebuilding a simple document, so it is best for content where the wording matters and the visual design does not.",
    ],
    howItWorks: [
      "Each format stores text differently. A .txt file is just characters. A .docx file is a ZIP archive with XML, in which paragraphs are w:p elements holding w:t text runs. A PDF stores positioned text-drawing operators, often compressed. This page converts through plain text in two stages: first it extracts the text from the source, then it writes that text into the target format. Formatting does not make the trip, because plain text has no way to hold it.",
      "For .docx input it unzips the archive with JSZip and reads the paragraph text from the XML. For .txt it reads the file directly. For PDF input it uses pdf.js to read the text items on each page, groups them into lines by vertical position and joins lines into paragraphs. A scanned PDF with no text layer is rejected with a clear message. Output is built with the docx library for Word, with pdf-lib for PDF (A4, Helvetica 11 pt, 16 pt line spacing), or as a UTF-8 text file. The default target is chosen for you: PDF for text and Word files, Word for PDFs. All of it runs in your browser.",
    ],
    steps: [
      "Click the upload area and choose a .docx, .txt or .pdf file up to 30 MB. Other file types are refused with a message listing the supported ones.",
      "Look at the Select Target Format section. A sensible choice is pre-selected, but you can click PDF Document, Word (.docx) or Plain Text (.txt).",
      "Click Convert Document Now. The browser extracts the text and builds the new file in memory, usually within a few seconds.",
      "When the result is ready, click the download button, which shows the new file name, for example notes.pdf or report.docx.",
      "Open the converted file to confirm the wording came through, and use Upload Different File if you want to convert something else.",
    ],
    example: {
      title: "Illustrative example: a text note to PDF",
      text: "Take a file called shopping.txt with three lines: Milk, Bread and Eggs. Choose PDF Document as the target and convert. The output is shopping.pdf, a single A4 page with those three lines drawn in Helvetica 11 pt, the first at 50 points from the top margin and each following line 16 points lower. A line longer than 90 characters would be cut off at the 90th character, because the PDF writer does not wrap lines, so very long paragraphs should be broken into shorter lines first.",
    },
    useCases: [
      { title: "Plain notes into a shareable PDF", text: "Convert a .txt file of instructions, a script or a log excerpt into a PDF that opens the same way for everyone." },
      { title: "Getting text out of a Word file", text: "Export the wording of a .docx to .txt for pasting into a CMS, a form field or a code editor." },
      { title: "Making simple text editable again", text: "Turn the content of a text file into a .docx so a colleague can add comments or tracked changes in Word." },
      { title: "Checking what text a file contains", text: "Converting to .txt is a quick way to see exactly which words are extractable from a Word or PDF document." },
    ],
    tips: [
      "Use short lines when converting to PDF. Lines past 90 characters are truncated rather than wrapped, so insert line breaks in long paragraphs first.",
      "Choose Plain Text when you only need the wording. It is the most reliable path, since it has the fewest steps and no layout to lose.",
      "For PDF input, convert to plain text first as a test. If the words look right, a Word conversion will give the same text; if the page says no text was found, the PDF is a scan.",
      "Save text files as UTF-8 before uploading. Other encodings can turn accented letters into garbage characters, and no tool downstream can fix them cleanly.",
      "Keep your original file. Converting through plain text discards styling, so you will want the source if you need the formatting again.",
    ],
    limitations: "Only text is converted. Fonts, bold and italics, images, tables, columns, headers and page numbers are dropped, and all output uses simple default styling. PDF input needs a real text layer, so scanned PDFs are rejected, and multi-column layouts may read out of order. PDF output does not wrap long lines and cuts each at 90 characters, and its Helvetica font cannot draw non-Latin scripts. Old .doc files, spreadsheets and presentations are not supported. The limit is 30 MB.",
    faqs: [
      { question: "Which formats does the converter support?", answer: "Input can be .docx, .txt or .pdf, and output can be PDF, Word (.docx) or plain text. Older .doc files, spreadsheets, slides and images are not handled by this page." },
      { question: "Does the converted file keep my formatting?", answer: "No. The tool extracts plain text and rebuilds a simple document, so styles, fonts, images and tables are lost. It is meant for moving wording between formats, not for preserving appearance." },
      { question: "Why did my PDF conversion say no text was found?", answer: "The PDF is probably a scan, where each page is only a picture, so there are no characters to read. The page tells you so instead of writing filler. Run the file through an OCR tool first, then convert it." },
      { question: "Why are the ends of my lines missing in the PDF?", answer: "When writing a PDF the tool puts each line on a single row and cuts it at 90 characters, without wrapping. Insert manual line breaks in long paragraphs in the source text before converting to keep the whole sentence." },
      { question: "Is my file uploaded to a server?", answer: "No. Extraction and file creation happen in your browser using JSZip, docx and pdf-lib. The file never leaves your computer, and the output is generated locally and handed back as a download." },
      { question: "Can I convert a file to the same format?", answer: "The page allows picking the same target, for example PDF to PDF. That simply extracts the text and writes a new, plainer file, which is rarely what you want, so choose a different target unless you are deliberately stripping formatting." },
    ],
  },

  "/word-counter": {
    route: "/word-counter",
    name: "Word Counter",
    intro: [
      "Word Counter measures a block of text and reports its words, characters (with and without spaces), sentences, paragraphs, average word length and an estimated reading time. You paste or type into the Text Input box, press Analyze Text, and the Analysis Results panel fills in. A running character count appears under the box as you type.",
      "Writers check these numbers against limits all the time: a 500-word application essay, a 160-character meta description, a 280-character post, a 1,500-word assignment. Knowing exactly how the counts are produced matters, because different programs disagree on edge cases like hyphens and decimals, and a count that is off by a few words can be the difference between meeting a limit or not.",
    ],
    howItWorks: [
      "The page makes its counts with a few simple rules. Words: the text is trimmed and split wherever there is whitespace (spaces, tabs or line breaks), and empty pieces are discarded. That means a hyphenated compound like well-known counts as one word, and so does an email address or a URL. Characters: the plain length of the text, including spaces and line breaks. Characters without spaces: the same text with every whitespace character removed.",
      "Sentences are found by splitting on runs of full stops, question marks and exclamation marks and ignoring empty pieces, so a decimal such as 3.14 or an abbreviation such as e.g. creates extra splits. Paragraphs are chunks separated by one or more blank lines. Average word length is characters without spaces divided by the word count. Reading time divides words by 200, a commonly used silent-reading speed, and rounds up. All of it is calculated in your browser.",
    ],
    steps: [
      "Click inside the Text Input box and paste or type your text. The character count under the box updates as you type.",
      "Click Analyze Text. If the box is empty or only spaces, a message asks you to enter some text.",
      "Read the four large tiles for Words, Characters, Sentences and Paragraphs, then the rows below for Characters (no spaces), Avg. Word Length and Reading Time.",
      "Edit the text and click Analyze Text again, since results do not update live. Only the character count under the box changes while you type.",
      "Click Copy Results to put the words, characters, sentences and paragraph counts on your clipboard, or use the reset button to clear everything.",
    ],
    example: {
      title: "Illustrative example: counting a two-sentence sample",
      text: "Take this text: The quick brown fox jumps over the lazy dog. It was a well-known sentence! It splits on whitespace into 14 words (well-known counts once). It has 74 characters in total and 61 without spaces, since it contains 13 spaces. There are 2 sentences, from the full stop and the exclamation mark, and 1 paragraph. Average word length is 61 / 14 = 4.36. Reading time is 14 / 200 = 0.07 minutes, rounded up to 1 min, so the panel shows 1 min.",
    },
    useCases: [
      { title: "Meeting an essay or assignment limit", text: "Check a draft against a required range such as 800 to 1,000 words before submitting, using the same whitespace-based method that many graders use." },
      { title: "Writing meta descriptions and social posts", text: "Use the character count, with or without spaces, to stay within snippet and post length limits before publishing." },
      { title: "Estimating how long a script or article takes to read", text: "The reading time figure gives a quick estimate for a blog introduction, a newsletter or a short speech." },
      { title: "Editing for brevity", text: "Compare the sentence count and average word length before and after tightening a paragraph, to see whether it really got simpler." },
    ],
    tips: [
      "Press Analyze Text after every edit. The results panel shows the numbers from the last click, not the current text, so a stale figure is easy to miss.",
      "Know that a word processor may count differently. Some tools split hyphenated words or count numbers and symbols separately, so test against the exact tool your reader will use.",
      "Watch for decimals, abbreviations and URLs when the sentence count matters. Every full stop inside them is treated as a sentence boundary, so the figure can read high.",
      "Separate paragraphs with a completely empty line. Single line breaks stay in the same paragraph, so text without blank lines always counts as one.",
      "For limits that count characters, decide whether spaces count. Use the Characters value when they do and Characters (no spaces) when the rules say otherwise.",
    ],
    limitations: "The tool counts using simple whitespace and punctuation rules and does not understand language. Hyphenated words, URLs and email addresses count as one word, symbols standing alone count as words, and decimals and abbreviations inflate the sentence count. It does not measure keyword density, readability grades or syllables, and the reading time assumes 200 words per minute for everyone. Counts are not live and refresh only when you click Analyze Text.",
    faqs: [
      { question: "How does the counter treat hyphenated words?", answer: "As one word. The text is split only on whitespace, so well-known, mother-in-law and state-of-the-art each count once. A dash with spaces around it, such as in a - b, creates a separate item for the dash itself." },
      { question: "Why is my sentence count higher than expected?", answer: "Sentences are found by splitting at full stops, question marks and exclamation marks. A number like 3.14, an abbreviation like e.g. or a URL contains full stops that are counted as breaks, so the figure can be larger than your own count." },
      { question: "Does the character count include spaces?", answer: "The Characters tile includes spaces, tabs and line breaks. Characters (no spaces) removes every whitespace character. Check which version your limit refers to, because the two can differ by many hundreds in a long document." },
      { question: "How is reading time calculated?", answer: "The word count is divided by 200 words per minute and rounded up to a whole minute. A 450-word text gives 2.25 and is shown as 3 mins. Real speed varies a lot with the reader and the difficulty of the material." },
      { question: "What counts as a paragraph?", answer: "A chunk of text separated from the next by one or more empty lines. Text where each sentence is on its own line but with no blank lines between them is treated as a single paragraph." },
      { question: "Is my text sent anywhere?", answer: "No. The counting is done with JavaScript in your browser. Whatever you paste stays on your device and is gone when you reset or reload the page, so you can check drafts that are not yet public." },
    ],
  },

  "/text-reverser": {
    route: "/text-reverser",
    name: "Text Reverser",
    intro: [
      "Text Reverser flips a piece of text back to front, so the last character becomes the first. Type or paste into the Original Text box, press Reverse Text, and the Reversed Text panel shows the result, with a Copy Result button to put it on your clipboard. The reverse of Hello, World is dlroW ,olleH.",
      "People use it for puzzles and word games, for checking whether a phrase is a palindrome, for creating mirror-style text for social posts, for simple obfuscation of spoilers, and for learning how strings work in programming. It reverses the whole text as one string, which is different from reversing the order of words or lines.",
    ],
    howItWorks: [
      "Computers store text as a sequence of code units. This page splits your text into an array of those units, reverses the array, and joins it back into a string. In JavaScript, that unit is a 16-bit value called a UTF-16 code unit. For ordinary letters, digits and punctuation, one unit equals one visible character, so the reversal looks exactly as you would expect, including spaces and line breaks.",
      "Some characters need more than one unit. Emoji and many rare symbols are stored as a pair of units called a surrogate pair, and a letter with a combining accent can be stored as a base letter followed by a separate accent mark. Reversing units one by one swaps those halves, which can produce broken symbols or accents attached to the wrong letter. Line breaks are reversed too, so the last line becomes the first. Everything runs locally in your browser.",
    ],
    steps: [
      "Click inside the Original Text box and type or paste what you want to reverse. A character count appears below the box.",
      "Click Reverse Text. If the box is empty or contains only spaces, the page asks you to enter some text.",
      "Read the output in the Reversed Text panel, where the whole input appears back to front.",
      "Click Copy Result to place the reversed text on your clipboard. The button briefly confirms that it worked.",
      "Use the circular arrow button to clear both the input and the output and start again.",
    ],
    example: {
      title: "Illustrative example: reversing a phrase and a palindrome check",
      text: "Input: Hello, World. Output: dlroW ,olleH. Notice that the comma and the space also move, so the comma now sits after the W. To test a palindrome, reverse level and you get level again, which is the same, so it reads identically both ways. Reversing a man, a plan gives nalp a ,nam a, which differs from the original because the spaces and comma are included. For a multi-line input such as ab then cd on the next line, the result is dc on the first line and ba on the second.",
    },
    useCases: [
      { title: "Palindrome and word-game checks", text: "Reverse a word or phrase and compare it with the original to see if it reads the same both ways, or to prepare clues for a puzzle." },
      { title: "Teaching and learning string operations", text: "Students can compare the tool's output with their own reversal code in Python, Java or JavaScript and see where characters are handled differently." },
      { title: "Light obfuscation", text: "Hide a spoiler, quiz answer or hint in reversed text so that it is not read by accident, while anyone who wants it can flip it back." },
      { title: "Creative text effects", text: "Create backward captions or playful usernames and then copy them straight into a post or profile." },
    ],
    tips: [
      "Remember that spaces and punctuation move too. If you want to reverse the order of words while keeping each word readable, this is not the right operation.",
      "Reverse the output again to restore the original. For text made of plain letters and digits, doing it twice returns exactly what you began with.",
      "Keep emoji and accented text out of the input if you need accurate results. Reversal at code-unit level can split them into broken symbols.",
      "Use plain text for the best outcome. Pasting from a word processor can bring invisible characters along, and those will be reversed and may show up in odd places.",
      "Check the result before posting it. Right-to-left scripts such as Arabic and Hebrew have their own display rules, and reversing them can look confusing on screen.",
    ],
    limitations: "The reversal works on UTF-16 code units, not on what a reader sees as characters. Emoji, characters outside the basic plane and letters stored with separate combining accents can be broken or misplaced, producing question marks or detached accent marks. It reverses the entire text only, with no option to reverse words, sentences or line order separately. Input made up only of spaces is rejected, and output is not live and updates when you click the button.",
    faqs: [
      { question: "Why do my emoji turn into strange symbols?", answer: "An emoji such as a smiley is stored as two 16-bit units. The tool reverses units one by one, which swaps the two halves, and that is no longer a valid character, so it shows as a replacement symbol or box." },
      { question: "Does it reverse the words or the whole text?", answer: "The whole text, character by character. The last letter becomes the first, and the order of words flips as a side effect, but each word is also written backward. Reversing only the word order is a different operation." },
      { question: "Are line breaks reversed as well?", answer: "Yes. The line break characters are part of the string, so they are reversed with everything else. A text of two lines comes out with the second line first, and each line is itself written backward." },
      { question: "Can I use it to check a palindrome?", answer: "Yes, but remember that spaces, capitals and punctuation count. A phrase like Never odd or even only matches its reverse if you first remove spaces and punctuation and make it all one case." },
      { question: "Is there a size limit?", answer: "The page sets no explicit limit. Because the text is turned into an array of characters in the browser, extremely long input of many millions of characters may be slow, but normal documents reverse instantly." },
      { question: "Is the text sent to a server?", answer: "No. The reversal is a single JavaScript operation in your browser. What you type is not uploaded, and clicking the reset button clears both boxes." },
    ],
  },

  "/html-color-codes": {
    route: "/html-color-codes",
    name: "HTML Color Codes",
    intro: [
      "HTML Color Codes is a small reference palette. It lists 30 common named colors with their hex codes, lets you search the list by name, and shows the picked color as a large swatch together with its HEX and RGB values. Underneath, a row of six tints runs from your color to white, each of which you can click to select and copy.",
      "Web designers, front-end developers, bloggers and students use a list like this to grab a code quickly, to see what a named color such as Coral or Indigo really is in numbers, and to find a lighter variation for hover states, backgrounds or borders without opening a design program. It is a lookup and quick-variant tool, not a full color picker.",
    ],
    howItWorks: [
      "A hex color code is a base-16 way of writing three numbers. After the # come three pairs of digits for red, green and blue, each pair running from 00 (none) to FF (full, which is 255). The color Coral, #FF7F50, is red FF = 255, green 7F = 127 and blue 50 = 80. Each pair is converted with the rule first digit x 16 plus second digit, and the page prints the three results as rgb(255, 127, 80).",
      "The six tints are made by mixing your color with white in steps. For a mixing fraction f of 0, 0.2, 0.4, 0.6, 0.8 and 1, each channel becomes round(channel x (1 - f) + 255 x f). At f = 0 you get the original, and at f = 1 you get #FFFFFF. These are properly called tints, since they move toward white rather than toward black. The calculation runs in your browser.",
    ],
    steps: [
      "Type part of a color name into Search Colors, for example blue or pl. The list below filters as you type and matches any part of the name.",
      "Click a color in the list. Each row shows a small swatch, the name and the hex code, and the chosen row is outlined.",
      "Read the large preview, then the HEX Code and RGB Code boxes. Use the small copy icon next to either to copy that value.",
      "Look at the Color Shades row of six swatches. Hover to see the code, or click one to select it as the active color and copy its hex at the same time.",
      "Click Copy Color to copy the active hex code, or Reset to clear the search and return to the default blue, #3B82F6.",
    ],
    example: {
      title: "Illustrative example: tints of Indigo",
      text: "Select Indigo, #4B0082. Its channels are R = 75 (4B), G = 0 (00) and B = 130 (82), shown as rgb(75, 0, 130). The 20% tint mixes each channel with white: red = 75 x 0.8 + 255 x 0.2 = 60 + 51 = 111, green = 0 x 0.8 + 51 = 51, blue = 130 x 0.8 + 51 = 104 + 51 = 155. Converting back to hex gives 6F, 33 and 9B, so the second swatch is #6F339B. Each further step moves closer to white, ending at #FFFFFF.",
    },
    useCases: [
      { title: "Finding the hex for a named color", text: "Look up Teal, Navy, Salmon or Khaki and copy the code to paste into a stylesheet, design file or presentation." },
      { title: "Building hover and background variants", text: "Start with a brand color and pick one of the lighter tints for a button hover, a table stripe or a soft background panel." },
      { title: "Learning how hex maps to RGB", text: "Click through colors and compare each hex code with its RGB readout to see how pairs like FF, 80 and 00 turn into numbers." },
      { title: "Choosing accessible-looking pairs", text: "Pick a deep color and one of its pale tints to get two shades of the same hue that are clearly different in lightness." },
    ],
    tips: [
      "Remember the list is short: 30 entries. If a name is not found, search for a nearby one or enter the code in a dedicated picker.",
      "Know that the bright #00FF00 is the CSS keyword lime, while Green is the darker #008000. Both are in the list, so pick the one that matches the keyword you use in your stylesheet.",
      "Use the tint row for light variants only. For darker versions, take the RGB readout and scale each channel down yourself or use a picker with a darkness control.",
      "Check text contrast before using a pale tint as a background. Light text on a light tint is hard to read, especially for visitors with low vision.",
      "Keep hex codes in uppercase or lowercase consistently across a project. CSS treats #ff7f50 and #FF7F50 as identical, but a single style makes searching easier.",
    ],
    limitations: "The built-in list holds 30 colors, not the full set of 140 CSS color names, and has no custom input, picker or HSL output. Only 6-digit hex and RGB are shown, with no alpha channel. The shade row only mixes toward white, so there are no darker shades. Colors are shown on your own screen, so appearance varies with display calibration.",
    faqs: [
      { question: "How many colors does the tool include?", answer: "It includes 30 named colors, covering the basic primary and secondary colors plus familiar ones like Coral, Indigo, Khaki and Plum. It is a starter reference rather than the complete list of 140 names defined in CSS." },
      { question: "Why are Green and Lime different?", answer: "In CSS, the keyword green is the fairly dark #008000, while the full-intensity #00FF00 is called lime. The list follows those names, so choose Lime for the bright color and Green for the darker one." },
      { question: "What do the six swatches under Color Shades represent?", answer: "They are the selected color mixed with 0%, 20%, 40%, 60%, 80% and 100% white. The first is the original color and the last is pure white, so they are lighter tints, not darker shades." },
      { question: "What is the difference between hex and RGB?", answer: "They describe the same color in different notation. Hex writes the red, green and blue amounts as three base-16 pairs, while RGB writes the same amounts as decimal numbers from 0 to 255. Both are valid in CSS." },
      { question: "Can I enter my own color code?", answer: "Not on this page. You can only pick from the built-in names or the tints produced from them. To convert an arbitrary hex code to RGB, use a hex to RGB converter, which accepts any 3-digit or 6-digit value." },
      { question: "Does clicking a shade change my selection?", answer: "Yes. Clicking a tint makes it the active color, updates the large preview and the HEX and RGB boxes, and copies its hex code. You can then generate a new row of tints from that color." },
    ],
  },

  "/hex-to-rgb": {
    route: "/hex-to-rgb",
    name: "HEX to RGB",
    intro: [
      "HEX to RGB converts a web color code such as #1E90FF into the matching RGB notation, rgb(30, 144, 255). Type the code into the Hex Color box, and a color swatch previews it as soon as the format is valid. Press Convert to see the RGB Result, and use Copy RGB to place the result on your clipboard.",
      "The conversion matters when a tool, an API or a design program asks for red, green and blue numbers while a brand guide or a stylesheet gives you hex. It is also a quick way for students to see how the two notations relate, and for developers to double-check a value they have been handed, without doing base-16 arithmetic by hand.",
    ],
    howItWorks: [
      "Screens mix red, green and blue light, each at an intensity from 0 to 255, which is 256 levels or one byte per channel. A hex code writes those three bytes in base 16 (digits 0 to 9 and A to F) as six characters: two for red, two for green, two for blue. To convert a pair, multiply the first digit by 16 and add the second, with A to F standing for 10 to 15. So 1E is 1 x 16 + 14 = 30, 90 is 9 x 16 + 0 = 144, and FF is 15 x 16 + 15 = 255.",
      "Shorthand codes with three digits are expanded by doubling each digit: #F80 means #FF8800. This page accepts either three or six hex digits, with or without the leading #, and ignores upper or lower case. It does not accept eight-digit codes with an alpha channel. The arithmetic is done in your browser with parseInt, and nothing is sent anywhere.",
    ],
    steps: [
      "Click the Hex Color box and type a code in the form #RRGGBB or #RGB. The # is optional, but spaces before or after the code are not allowed.",
      "Watch the preview bar under the box. When the code is valid and begins with #, it fills with that color so you can confirm it is what you meant.",
      "Click Convert. An empty box or an invalid format produces a message telling you to use #RRGGBB or #RGB.",
      "Read the RGB Result in the output panel, written as rgb(r, g, b) with three numbers from 0 to 255.",
      "Click Copy RGB to copy the string, or Reset to empty the input and result and convert another color.",
    ],
    example: {
      title: "Illustrative example: converting #1E90FF (dodger blue)",
      text: "Split the code into pairs: 1E, 90 and FF. Red: 1E = 1 x 16 + 14 = 30. Green: 90 = 9 x 16 + 0 = 144. Blue: FF = 15 x 16 + 15 = 255. The result is rgb(30, 144, 255). A shorthand example: #F80 expands to #FF8800, which gives red FF = 255, green 88 = 8 x 16 + 8 = 136 and blue 00 = 0, so the page returns rgb(255, 136, 0), a bright orange. In both cases, the three numbers fall between 0 and 255.",
    },
    useCases: [
      { title: "Moving a brand color between tools", text: "A style guide lists hex, but a presentation or image program wants red, green and blue values. Convert once and type the three numbers in." },
      { title: "Writing CSS with rgba()", text: "To make a color semi-transparent in CSS you need its RGB numbers, for example rgba(30, 144, 255, 0.5). Convert the hex, then add your alpha value." },
      { title: "Checking a value from a developer or designer", text: "Confirm that the code you were sent matches the color you expect by seeing the preview and the decimal numbers side by side." },
      { title: "Learning color notation", text: "Convert a few codes and watch how doubling a digit, or changing a pair from 00 to FF, shifts one channel from none to full." },
    ],
    tips: [
      "Paste codes without extra spaces. The format check is strict, so a leading or trailing space makes an otherwise correct code count as invalid.",
      "Use six-digit codes when precision matters. Three-digit shorthand can only produce 4,096 colors, those where each channel is a doubled digit, so many colors have no shorthand.",
      "Add alpha yourself in CSS if you need transparency. This tool outputs three numbers and ignores eight-digit codes, so convert the first six digits and add an alpha value after.",
      "Check the preview bar before trusting a code. If it stays empty when you expected color, the code is probably invalid or missing a digit.",
      "Reading the numbers helps to judge a color: three similar values give gray, a high value in one channel gives a strongly tinted color, and 0, 0, 0 is black.",
    ],
    limitations: "The converter handles only 3-digit and 6-digit hex codes. Eight-digit codes with transparency, named colors like tomato, and other formats such as HSL are not accepted. It converts in one direction only, from hex to RGB, and outputs a single rgb() string without a percentage or alpha version. Spaces around the code make it invalid, and the preview swatch needs the leading #. Colors may look slightly different across screens.",
    faqs: [
      { question: "How do I convert a hex color to RGB by hand?", answer: "Split the code into three pairs. For each pair, multiply the first digit by 16 and add the second, treating A to F as 10 to 15. For #1E90FF this gives 30, 144 and 255, which you write as rgb(30, 144, 255)." },
      { question: "Does the # symbol matter?", answer: "The converter accepts codes with or without it, so 1E90FF and #1E90FF give the same result. The live color preview, though, only appears when the # is typed, because the browser needs it to display the swatch." },
      { question: "What does a three-digit hex code mean?", answer: "It is shorthand in which each digit is repeated. #09C means #0099CC. The tool expands it before converting, so #09C returns rgb(0, 153, 204). Only colors whose pairs have identical digits can be written this way." },
      { question: "Can it convert RGB back to hex?", answer: "Not on this page. It converts in a single direction. To go the other way, write each number from 0 to 255 as a two-digit hex value, for example 144 = 90, and put the three pairs after a hash sign." },
      { question: "Does it support transparency (8-digit hex)?", answer: "No. Only 3-digit and 6-digit codes are accepted, and an eight-digit code is reported as invalid. Convert the first six digits here, then add your own alpha in rgba() form in your CSS." },
      { question: "Why does my color look different on another screen?", answer: "RGB numbers describe signals sent to a display, and each screen reproduces them with its own brightness, calibration and color profile. The numbers are identical, but the perceived color can shift between devices and lighting." },
    ],
  },

  "/gradient-generator": {
    route: "/gradient-generator",
    name: "Gradient Generator",
    intro: [
      "Gradient Generator builds a two-color CSS background and shows it live. You choose Linear or Radial, set the angle for a linear gradient with a slider from 0 to 360 degrees, pick Color 1 and Color 2 with the color pickers or by typing hex codes, and the preview and the CSS code update straight away. A single button copies the declaration.",
      "Gradients are used for hero banners, buttons, cards, page backgrounds and subtle fades that avoid image files. Because they are drawn by the browser from a one-line rule, they stay sharp at any screen size and add no download weight. This page helps you find a pair of colors and a direction that look right, then hands you the exact line to paste into your stylesheet.",
    ],
    howItWorks: [
      "A CSS linear gradient is defined by a direction and a list of colors, as in linear-gradient(45deg, #FF6B6B, #4ECDC4). The angle is measured clockwise from the top: 0deg points up, 90deg points right, 180deg points down and 270deg points left. The browser lays an imaginary line through the center of the box at that angle, sized so that the first color lands exactly on one corner and the last on the opposite corner. Colors along that line are blended channel by channel.",
      "For a box w wide and h tall, the length of that line is w x |sin(angle)| + h x |cos(angle)|. A radial gradient, written here as radial-gradient(circle, color1, color2), starts at the center with the first color and spreads outward in a circle until it reaches the farthest corner, where it becomes the second color. The page assembles the string from your settings and applies it as the preview background. Nothing leaves your browser.",
    ],
    steps: [
      "Choose a Gradient Type, Linear or Radial. Linear is selected by default and shows an angle control, and radial hides it because a circle has no direction.",
      "For a linear gradient, drag the Angle slider between 0 and 360. The label shows the current value in degrees, and the preview rotates as you move it.",
      "Set Color 1 by clicking the color square or typing a hex code in the text field beside it, then do the same for Color 2.",
      "Check the Preview & Code panel, where the large swatch and the dark CSS box both change as you edit. The line begins with background:.",
      "Click Copy CSS Code to copy the full declaration, or Reset to return to 45 degrees with the starting pair, #FF6B6B and #4ECDC4.",
    ],
    example: {
      title: "Illustrative example: the default gradient on a 200 x 100 box",
      text: "With the defaults, the code is background: linear-gradient(45deg, #FF6B6B, #4ECDC4). The 45 degree direction points up and to the right, so the coral color #FF6B6B starts at the bottom-left corner and the teal #4ECDC4 finishes at the top-right. On a box 200 px wide and 100 px tall the gradient line is 200 x sin 45 + 100 x cos 45 = 141.4 + 70.7 = about 212 px long. Halfway along it, the blend is about rgb(167, 156, 152), the average of (255, 107, 107) and (78, 205, 196), a muted gray-beige.",
    },
    useCases: [
      { title: "Hero and banner backgrounds", text: "Create a smooth two-color backdrop for a landing page header without exporting or hosting an image." },
      { title: "Buttons and call-to-action blocks", text: "Give a button a gentle diagonal gradient and copy the rule straight into the button's CSS class." },
      { title: "Card and badge accents", text: "Use a short gradient strip on cards, pricing tiers or avatars to separate sections or add some visual interest." },
      { title: "Learning how CSS gradients are built", text: "Move the slider and watch how the angle changes the direction, while reading the exact syntax that produces it." },
    ],
    tips: [
      "Choose colors that are not too far apart in lightness if you place text on top. A dark-to-light gradient makes it hard to keep a single text color readable across the whole box.",
      "Remember that 90 degrees runs left to right and 180 degrees runs top to bottom. Use those two values for the most common horizontal and vertical fades.",
      "Type valid hex values, either three or six digits with the #. A malformed value is ignored by the browser, and the preview may fall back to showing nothing.",
      "Add a plain background-color line as a fallback in your CSS. Very old browsers that do not understand gradients will then still show a solid color.",
      "Test the gradient on the real element before shipping. The same code looks different on a wide banner and on a small square, since the angle is applied to each box's shape.",
    ],
    limitations: "The generator makes two-color gradients only. There are no extra color stops, no stop positions, no transparency, no repeating gradients, no conic gradients and no choice of radial shape or center, and radial output is always a centered circle. Color 1 and Color 2 inputs are not validated, so a mistyped value gives an invalid rule. The Generate button does nothing, since the preview updates live. Output is a background declaration, not a standalone image.",
    faqs: [
      { question: "What do the angle values mean?", answer: "The angle is measured clockwise from straight up. 0 degrees runs from bottom to top, 90 degrees from left to right, 180 degrees from top to bottom and 270 degrees from right to left. Values in between tilt the direction diagonally." },
      { question: "Can I add a third color or move the color stops?", answer: "Not here. The tool takes exactly two colors that sit at the start and end of the gradient. For more stops, copy the output and add extra colors by hand, for instance linear-gradient(45deg, red, yellow 40%, blue)." },
      { question: "Why does the angle slider disappear for Radial?", answer: "A radial gradient spreads outward from the center in a circle, so it has no direction to rotate. The page writes it as radial-gradient(circle, color1, color2), with color 1 in the middle and color 2 at the edge." },
      { question: "How do I use the copied code?", answer: "Paste the line inside a CSS rule for the element you want to color, for example .hero { background: linear-gradient(45deg, #FF6B6B, #4ECDC4); }. It also works in a style attribute or in a JavaScript style assignment." },
      { question: "Does the Generate button do anything?", answer: "No extra action is needed. The preview and the CSS box update live as soon as you change any setting. Use Copy CSS Code to take the result, and Reset to return to the starting values." },
      { question: "Will the gradient look the same in every browser?", answer: "Modern browsers render the same standard syntax consistently. Small differences can appear in how colors are blended or in banding, which shows as visible stripes on subtle gradients, particularly on lower quality screens." },
    ],
  },
};
