import type { Guide } from "./guides";

export const moreGuides: Guide[] = [
  {
    slug: "image-formats-jpg-png-webp-explained",
    title: "JPG, PNG and WebP Explained: Which Image Format Should You Use?",
    category: "Images",
    excerpt: "A practical comparison of JPG, PNG and WebP covering compression type, transparency, file size behaviour and browser support, so you can pick the right format for photos, logos, screenshots and web pages.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "Image Converter",
      path: "/image-converter",
    },
    content: {
      introduction: "Choosing an image format sounds trivial until a logo comes out with a fuzzy halo, a screenshot becomes a 4 MB file, or a website feels slow because every photo is a lossless PNG. Each format makes a different trade between quality, size and features. This guide explains how JPG, PNG and WebP actually work, what each one is good at, and a simple way to decide which to use.",
      sections: [
        {
          heading: "Lossy and lossless compression in plain terms",
          body: [
            "Every image format has to shrink a grid of pixels, and there are two ways to do it. Lossless compression finds patterns and stores them more efficiently, so decoding gives back exactly the original pixels. Lossy compression goes further by throwing away detail the eye is unlikely to miss, which gives much smaller files but cannot be reversed.",
            "JPG is lossy. PNG is lossless. WebP can be either, which is one reason it is flexible. The practical consequence is that re-saving a JPG repeatedly stacks up small errors each time, while a PNG can be opened and saved forever without any change to its pixels.",
            "Lossy does not mean low quality. At a sensible setting a JPG looks the same as the original to most viewers. The loss only becomes visible at aggressive settings, where you see blocky patches and smudged edges around text or sharp lines.",
          ],
        },
        {
          heading: "JPG: the default for photographs",
          body: [
            "JPG (also written JPEG) splits an image into small blocks and stores each one using a mathematical transform that keeps broad colour and brightness changes while discarding fine variation. This suits photographs, where colours blend smoothly and noise is already present. A typical photo can shrink to a small fraction of its uncompressed size with no visible damage.",
            "JPG has no transparency. If you place a JPG on a coloured background, the white or black rectangle around the subject stays. It also handles sharp edges poorly: text, thin lines and flat-colour logos show faint speckles around the edges, usually called ringing or artefacts.",
            "Use JPG for photos you want to share widely, since every browser, phone, email client and printer understands it. Avoid it for screenshots, diagrams and anything you will edit and re-save many times.",
          ],
        },
        {
          heading: "PNG: sharp edges and transparency",
          body: [
            "PNG compresses without losing any pixel data, and it supports a full alpha channel, meaning each pixel can be partly transparent. That makes it the standard for logos, icons, interface screenshots and any graphic that must sit cleanly on different backgrounds.",
            "The cost is file size when the content is photographic. A photograph has millions of slightly different pixels, so there are few repeating patterns for lossless compression to exploit, and the PNG may be several times larger than a good JPG of the same picture. Flat graphics are the opposite: large areas of one colour compress extremely well in PNG, often to a smaller size than JPG with cleaner edges.",
            "A rule that holds up well: if the image has text, hard edges, few colours, or needs transparency, start with PNG. If it is a photo, start with JPG.",
          ],
        },
        {
          heading: "WebP: one format for both jobs",
          body: [
            "WebP was designed to replace both of the older formats on the web. It offers lossy compression comparable to or better than JPG, lossless compression that is usually smaller than PNG, and transparency in either mode. It can also hold animation, which makes it an alternative to GIF.",
            "File size varies by image, so treat any single percentage you read online with caution. What you can rely on is the direction: for the same visual quality, WebP files tend to be smaller than the JPG or PNG equivalent, and the saving is worth testing on your own images.",
            "Browser support is now broad across current versions of Chrome, Firefox, Safari and Edge. The remaining friction is outside the browser. Some older desktop software, print services, email templates and upload forms still reject WebP, so keep a JPG or PNG copy for those situations.",
          ],
          callout: "Pick the format by content, not habit: photos to JPG or lossy WebP, logos and screenshots to PNG or lossless WebP, anything needing transparency to PNG or WebP.",
        },
        {
          heading: "How size behaves in practice",
          body: [
            "Three things drive file size: pixel dimensions, content complexity and quality setting. Doubling the width and height of an image quadruples the pixel count, so dimensions matter more than the format. A 4000 by 3000 photo has 12 million pixels, while a 1200 by 900 version has 1.08 million, about 9 percent of the original, so resizing before compressing often saves more than any format change.",
            "Complexity matters because compressors reward repetition. A plain screenshot of a document is tiny as PNG and large as a high-quality JPG. A detailed landscape is the reverse. Noise, grain and fine textures raise sizes in every format.",
            "Quality settings are not comparable across formats. A JPG at 80 and a WebP at 80 are different encodings, so compare results by looking at the image at full size and checking the resulting file, rather than by matching numbers.",
          ],
        },
        {
          heading: "A simple decision guide and conversion tips",
          body: [
            "For a website, serve WebP where you can and keep JPG or PNG as a fallback. For email attachments and documents sent to unknown recipients, JPG for photos and PNG for graphics is the safest choice. For archiving originals you may edit later, keep a lossless copy such as PNG or the camera original.",
            "When converting, go from the best source you have. Converting a JPG to PNG does not restore lost detail; it only wraps the already-degraded pixels in a lossless container, and the file usually grows. Converting JPG to WebP lossy applies a second round of loss, so use a fairly high quality setting or start from the original.",
            "Always check the result after converting: open it at 100 percent, look at edges and gradients such as skies, and confirm transparency still behaves on a dark and a light background.",
          ],
        },
      ],
      summary: "JPG suits photographs, PNG suits sharp graphics and transparency, and WebP covers both with smaller files and wide modern browser support. Choose by content type, resize before compressing, keep a lossless original, and always inspect a converted image at full size before publishing it.",
      faq: [
        {
          q: "Does converting JPG to PNG improve quality?",
          a: "No. The detail discarded when the JPG was first saved cannot be recovered. Converting to PNG stores the existing pixels without further loss, which protects them from future degradation, but the picture looks the same and the file is usually larger.",
        },
        {
          q: "Is WebP always smaller than JPG?",
          a: "Not always, but often. For the same visual quality WebP typically produces smaller files, though the gap depends on the image and encoder settings. Test a few of your own images and compare both the file size and the appearance.",
        },
        {
          q: "Which format keeps a transparent background?",
          a: "PNG and WebP both support transparency, including partly transparent edges such as soft shadows. JPG does not, so a transparent area is filled with a solid colour, usually white or black, when you save as JPG.",
        },
        {
          q: "Why does my screenshot look bad as a JPG?",
          a: "Screenshots contain sharp text and flat colours, which the JPG block transform handles poorly. It leaves faint speckles around letters. Saving the screenshot as PNG avoids the problem and is often smaller as well.",
        },
      ],
    },
  },
  {
    slug: "how-to-resize-images-without-losing-quality",
    title: "How to Resize Images Without Losing Quality",
    category: "Images",
    excerpt: "Understand pixels, DPI, aspect ratio and the difference between shrinking and enlarging, then use sensible target sizes for websites, email and social posts without blurry or stretched results.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "Image Resizer",
      path: "/image-resizer",
    },
    content: {
      introduction: "Resizing is the most common image task and one of the easiest to get wrong. People stretch a photo until it looks squashed, enlarge a small thumbnail and wonder why it is blurry, or chase a DPI number that makes no difference on screen. The underlying ideas are simple once you separate pixels from print resolution. This guide covers what resizing really does, why shrinking is safe and enlarging is not, and which sizes to aim for.",
      sections: [
        {
          heading: "Pixels are the only size that matters on screen",
          body: [
            "A digital image is a grid of pixels, for example 4000 columns by 3000 rows. On a screen, an image is shown using exactly that grid, scaled to fit whatever space the page or app gives it. The pixel dimensions decide how much detail the file holds and, together with the format, how large the file is.",
            "Centimetres and inches only appear when you print or place the image into a document. The same 4000 by 3000 file can be 10 inches wide at 400 pixels per inch or 20 inches wide at 200. Nothing in the file changes; only the instructions for how densely to print it.",
            "So when someone asks for a photo 'at least 1200 pixels wide', that is a real requirement. When someone asks for 'a 72 DPI image', for screen use the number is essentially irrelevant, because the browser ignores it.",
          ],
        },
        {
          heading: "DPI and PPI: when they matter",
          body: [
            "DPI (dots per inch) describes print density, and PPI is the same idea for pixels. To know whether an image will print well, divide its pixel dimensions by the size you want in inches. A 1800 by 1200 pixel photo printed at 6 by 4 inches has 300 pixels per inch, which is a common target for good prints.",
            "Stretch the same photo to 12 by 8 inches and it drops to 150 pixels per inch. Prints made at that density look soft up close, though acceptable from a distance. The fix is a source image with more pixels, not a metadata change.",
            "Editing a file's DPI tag without resampling does not add detail. It only changes the suggested print size. Resampling means actually changing the pixel count, and that is what a resizer does.",
          ],
          codeOrFormula: "Pixels per inch = pixel width / print width in inches\nExample: 1800 px / 6 in = 300 PPI",
        },
        {
          heading: "Downscaling is safe, upscaling is not",
          body: [
            "When you reduce an image, the software combines groups of source pixels into each new pixel. Information is discarded, but what remains is a faithful smaller version. Good algorithms such as bicubic or Lanczos resampling keep edges clean. Shrinking a photo to fit a web page loses nothing you could have seen at the smaller size.",
            "Enlarging works the other way. The software must invent pixels that were never captured, usually by interpolating between neighbours. The result is smooth but soft, and fine detail such as hair, text or texture cannot be created. Enlarging a small thumbnail to full-screen always looks blurry.",
            "Some tools use machine learning to sharpen enlarged images and can produce convincing results, but they add plausible detail rather than recovering real detail. For documents, evidence or product accuracy, do not rely on that. Start from the largest original you have and only ever work downward from it.",
          ],
          callout: "Keep your original untouched. Resize a copy, and always resize from the original rather than from an already shrunk version.",
        },
        {
          heading: "Keep the aspect ratio",
          body: [
            "Aspect ratio is width divided by height. A 4000 by 3000 photo is 4:3, or about 1.33. If you change only the width to 1200 and let the height follow, you get 1200 by 900, and nothing looks distorted. If you force 1200 by 1200, the picture is squeezed sideways and people look narrow.",
            "Most resizers have a lock or maintain-ratio option. Leave it on unless you intend to crop. When a platform needs a different ratio, such as 16:9 for video thumbnails, crop first to the right shape, then scale to the target size.",
            "Cropping removes the edges of the picture, while stretching distorts all of it. Cropping is nearly always the better choice, and you can pick which part of the frame to keep so the subject stays centred.",
          ],
          codeOrFormula: "New height = original height × (new width / original width)\nExample: 3000 × (1200 / 4000) = 900",
        },
        {
          heading: "Common target sizes",
          body: [
            "For web pages, an image rarely needs to be wider than the space it fills. A full-width hero banner is often prepared at around 1920 pixels wide, a blog content image at 1200 or less, and a small thumbnail at a few hundred. Supplying roughly double the displayed width keeps images crisp on high-density phone screens.",
            "For email, aim for about 600 to 800 pixels wide, since many email layouts are around that width, and keep each image well under a megabyte. For documents and forms that state a limit, such as 'under 200 KB', reduce the pixel dimensions first and then lower quality if needed.",
            "Social platforms publish recommended dimensions and change them from time to time, so check the platform's current help page before preparing a batch. As a general habit, use the platform's stated aspect ratio and make the file at least as large as it asks.",
          ],
        },
        {
          heading: "Resizing steps and a quality checklist",
          body: [
            "First decide the destination and note its pixel size or file limit. Second, crop to the correct aspect ratio if needed. Third, resize to the target width with the ratio locked. Fourth, export in a suitable format: JPG for photos, PNG for graphics with transparency or text.",
            "After exporting, view the result at 100 percent. Check that text is legible, edges are not jagged, faces look natural, and the file meets the size limit. If sharpness suffers after a large reduction, a very light sharpen can restore crispness, but over-sharpening creates bright halos.",
            "Resize once, from the original. Repeated resizing and saving of a JPG compounds compression loss, so avoid chains of edits on the same file.",
          ],
        },
      ],
      summary: "Resize by pixels, not by DPI tags. Shrink from the largest original, keep the aspect ratio locked, crop instead of stretching, and avoid enlarging small images. Pick a target width suited to the destination, export in the right format, and inspect the result at full size before using it.",
      faq: [
        {
          q: "Does changing DPI to 300 improve image quality?",
          a: "No. Changing the DPI value without resampling only alters the suggested print size stored in the file. The number of pixels stays the same, so the sharpness is identical. Real improvement needs an image with more pixels in the first place.",
        },
        {
          q: "Why does my enlarged photo look blurry?",
          a: "Enlarging forces the software to invent new pixels by averaging neighbouring ones, which produces smooth but soft results. Detail that was never captured cannot be created. Use a larger original if you have one.",
        },
        {
          q: "How do I resize without stretching?",
          a: "Lock the aspect ratio and change only one dimension so the other follows. If you need a different shape, crop first to the required ratio and then scale the cropped picture to the target size.",
        },
        {
          q: "What size should website images be?",
          a: "Match the largest size the image is displayed at, and consider about twice that width for sharp rendering on high-density screens. Avoid uploading an original camera file when the page shows it at a few hundred pixels.",
        },
      ],
    },
  },
  {
    slug: "how-emi-is-calculated",
    title: "How EMI Is Calculated: Formula, Worked Example and What Drives Interest",
    category: "Finance",
    excerpt: "See exactly how a loan EMI is calculated with the standard formula, follow a worked example, and learn how tenure and interest rate change the monthly payment and the total interest you pay.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "EMI Calculator",
      path: "/emi-calculator",
    },
    content: {
      introduction: "An EMI, or equated monthly instalment, is the fixed amount you pay every month to clear a loan. The figure on your loan offer looks like it appears from nowhere, but it comes from a single formula based on three inputs: the amount borrowed, the interest rate and the number of months. Knowing how it works helps you compare offers, see why a longer tenure costs more overall, and judge how much a lower rate is really worth.",
      sections: [
        {
          heading: "The EMI formula",
          body: [
            "The standard formula spreads the loan over equal monthly payments so that the balance reaches exactly zero at the end. It uses the monthly interest rate, which is the annual rate divided by 12 and by 100, and the total number of monthly payments.",
            "In the formula below, P is the principal borrowed, r is the monthly rate as a decimal, and n is the number of months. The term (1 + r) raised to the power n captures how interest compounds on the outstanding balance over the full tenure.",
            "Banks may round the result differently or round the monthly rate, so your lender's figure can differ from a calculator by a few rupees. For the exact number, the sanction letter or repayment schedule is the authority.",
          ],
          codeOrFormula: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)\nr = annual rate / 12 / 100",
        },
        {
          heading: "Worked example",
          body: [
            "Suppose you borrow 500,000 at 9% per year for 5 years. The monthly rate is 9 / 12 / 100 = 0.0075, and the number of months is 60. Putting these into the formula gives an EMI of about 10,379.18.",
            "Over 60 payments you would pay about 622,750.66 in total, so the interest cost is about 122,750.66. That is roughly 24.6 percent of the amount borrowed, spread over five years. Those figures were checked by running the formula in code and by stepping through the balance month by month until it reached zero.",
            "Notice that the interest is far more than 9 percent of the loan. The 9 percent is a yearly rate applied to a balance that falls over time, and the loan lasts five years, so the total is much higher than a single year of interest on the full amount.",
          ],
        },
        {
          heading: "Reducing balance: where each payment goes",
          body: [
            "Each month, interest is charged on the balance still owed, and the rest of the EMI reduces the principal. In the first month of the example, interest is 500,000 × 0.0075 = 3,750, so only 10,379.18 − 3,750 = 6,629.18 goes toward principal. The balance falls to about 493,370.82.",
            "In month two, interest is calculated on the smaller balance, so slightly less goes to interest and slightly more to principal. This shift continues every month. Early payments are mostly interest, and the last few are almost entirely principal.",
            "This is why prepaying early in a loan saves more than prepaying late. Every rupee of principal removed in the early years stops generating interest for all the months that remain. It is also why a loan advertised as flat rate is not comparable to a reducing balance rate, because flat interest is charged on the original amount throughout.",
          ],
          callout: "A reducing balance loan charges interest only on what you still owe, so the interest portion of each EMI shrinks over time while the total EMI stays constant.",
        },
        {
          heading: "How tenure changes the cost",
          body: [
            "Tenure is the lever that lowers the EMI but raises the total cost. Keep the same 500,000 at 9% and change only the term. At 3 years the EMI is about 15,899.87 and total interest about 72,395. At 5 years it is 10,379.18 with interest about 122,751. At 10 years the EMI drops to about 6,333.79, but total interest rises to about 260,055.",
            "Stretching the loan from five years to ten reduces the monthly burden by roughly 4,045 but more than doubles the interest paid. The lender is not charging a higher rate; you are simply borrowing the money for longer.",
            "A practical approach is to choose the shortest tenure whose EMI fits comfortably in your budget, and keep room for other expenses. If your income grows later, you can often make part prepayments to shorten the loan, subject to your lender's rules.",
          ],
        },
        {
          heading: "How the interest rate changes the cost",
          body: [
            "Rate has a smaller effect than tenure over short periods but still adds up. With the same 500,000 over 5 years, raising the rate from 9% to 10% lifts the EMI from 10,379.18 to about 10,623.52 and total interest from about 122,751 to about 137,411. One percentage point costs about 14,660 extra in this example.",
            "The longer the tenure, the larger the effect of the rate, because interest compounds on the balance for more months. A one-point difference on a 20-year home loan is a much bigger amount than on a 2-year personal loan.",
            "When comparing offers, look beyond the headline rate. Processing fees, insurance bundled with the loan and prepayment charges all change the real cost. Ask the lender for the annual percentage cost or total repayment figure where available.",
          ],
        },
        {
          heading: "Using an EMI calculator wisely",
          body: [
            "A calculator is most useful for what-if comparisons. Enter the same loan with different tenures and rates, and look at both columns: the monthly EMI and the total interest. Choosing only by the lowest EMI usually means choosing the most expensive loan.",
            "Check affordability using your actual budget rather than a rule of thumb. Add the new EMI to existing obligations and confirm you still have a buffer for emergencies. Some lenders also look at the share of income going to repayments when deciding eligibility.",
            "Remember that variable rate loans can change the EMI or the tenure when the lender's benchmark rate moves. A calculator shows the position at one fixed rate, so treat it as an estimate and revisit it if your rate resets.",
          ],
        },
      ],
      summary: "EMI comes from the loan amount, the monthly interest rate and the number of months, with interest charged on the declining balance. Longer tenures lower the monthly payment but raise total interest sharply, and even a one point rate difference matters. Compare loans by total repayment, not only by the monthly figure.",
      faq: [
        {
          q: "Why is the first EMI mostly interest?",
          a: "Interest is charged on the full outstanding balance, which is largest at the start. The fixed EMI first covers that interest, and only the remainder reduces principal. As the balance falls, the interest share shrinks and the principal share grows.",
        },
        {
          q: "Does a longer tenure always cost more?",
          a: "At the same interest rate, yes. A longer tenure lowers the monthly EMI but keeps the balance outstanding for more months, so total interest is higher. The trade-off is monthly comfort against overall cost.",
        },
        {
          q: "Why does my bank's EMI differ slightly from the calculator?",
          a: "Lenders may round the rate or the instalment differently, count days instead of whole months for the first period, or add fees. The sanction letter and the repayment schedule are the authoritative figures.",
        },
        {
          q: "What is the difference between flat and reducing balance rates?",
          a: "A flat rate charges interest on the original loan amount for the whole term, while a reducing balance rate charges it on what remains. A flat rate that looks lower can be more expensive in real terms.",
        },
      ],
    },
  },
  {
    slug: "how-sip-returns-are-calculated",
    title: "How SIP Returns Are Calculated: Formula, Example and Limits",
    category: "Finance",
    excerpt: "Learn the future value formula behind a systematic investment plan, follow a worked example with monthly compounding, and understand why a SIP calculator gives an estimate rather than a promised return.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "SIP Calculator",
      path: "/sip-calculator",
    },
    content: {
      introduction: "A systematic investment plan, or SIP, means investing a fixed amount at regular intervals, usually every month. SIP calculators show a future value, and that number can look precise enough to treat as a forecast. It is not one. The calculation is straightforward arithmetic that assumes a steady return, while real investments rise and fall. This guide shows the formula, a worked example, and what the result does and does not tell you.",
      sections: [
        {
          heading: "What a SIP calculator actually computes",
          body: [
            "A SIP calculator answers a narrow question: if you invest a fixed amount each month and it grows at a constant assumed rate, what is the pot worth at the end? It does not predict markets, choose a fund or account for taxes and fees unless you adjust the rate yourself.",
            "Every instalment grows for a different length of time. The first deposit compounds for the whole period, while the last one has barely begun. The formula adds up all of these individual growth amounts in a compact way.",
            "Because the return is an input you supply, the output is only as meaningful as that assumption. The calculator is a tool for comparing scenarios, such as different amounts or durations, rather than a guarantee of what any fund will deliver.",
          ],
        },
        {
          heading: "The future value formula",
          body: [
            "The usual SIP formula treats each instalment as made at the start of the month, which is how most calculators do it. Here P is the monthly amount, i is the monthly rate (annual rate divided by 12 and by 100), and n is the number of monthly instalments.",
            "The expression inside the brackets sums the growth of every instalment. Multiplying by (1 + i) at the end accounts for the fact that each payment is invested one month earlier than it would be if paid at month end.",
            "If a calculator assumes payment at the end of each month, it leaves out that last factor and shows a slightly lower figure. Neither is wrong; they model different timing. Check which convention a tool uses before comparing two results.",
          ],
          codeOrFormula: "FV = P × [((1 + i)^n − 1) / i] × (1 + i)\ni = annual rate / 12 / 100,  n = years × 12",
        },
        {
          heading: "Worked example",
          body: [
            "Take a monthly SIP of 5,000 for 10 years at an assumed 12% a year. The monthly rate is 0.01 and n is 120. Plugging in gives a future value of about 1,161,695. The total you invest is 5,000 × 120 = 600,000, so the estimated gain is about 561,695. These figures were checked by running the formula in code.",
            "If the same deposits were made at the end of each month instead, the result is about 1,150,193, which is roughly 11,500 lower. That gap comes purely from the timing assumption.",
            "Change only the rate and the sensitivity shows. At 10% the same plan reaches about 1,032,760, and at 8% about 920,828. A four point swing in the assumed return moves the end value by roughly 240,000, even though you deposited exactly the same money.",
          ],
        },
        {
          heading: "Why time matters more than most inputs",
          body: [
            "Compounding rewards duration. Keep the 5,000 monthly at 12% but invest for 15 years instead of 10. The future value becomes about 2,522,880 against 900,000 deposited. Adding 5 years raised deposits by 300,000 but lifted the end value by more than 1.3 million, because earlier deposits had longer to grow.",
            "This is why starting early often beats investing a larger amount later. A smaller instalment started sooner can catch up with a bigger one started late, provided the assumed returns actually materialise.",
            "It also shows why stopping a SIP in a bad year can be costly. The calculator assumes uninterrupted deposits. In practice you decide whether to continue, and that choice often matters as much as the fund you pick.",
          ],
          callout: "More time in the market increases the effect of compounding. The estimate is most sensitive to duration and the assumed rate, and least sensitive to small changes in the monthly amount.",
        },
        {
          heading: "Estimates are not promises",
          body: [
            "Real returns are not a steady 12% every month. Investments linked to markets can fall as well as rise, and a SIP's outcome depends on the path taken, not just the average. A fund can average the same yearly figure over ten years in many different sequences, and your result changes with the sequence.",
            "Past performance of a fund or index does not guarantee future results, and a high figure from the past is not a safe input for the future. When a calculator is used to plan, it is more honest to run a conservative case, a middle case and an optimistic case, and see whether the plan works in the first two.",
            "Also remember that fees, taxes and inflation reduce what you actually keep and what the money can buy. A future value of one million in ten years will not buy what one million buys today.",
          ],
        },
        {
          heading: "Using the calculator sensibly",
          body: [
            "Start with the goal, such as a down payment or a retirement top-up, and work backwards. Enter the amount you could sustain through a lean year, not the amount you can afford in your best month, because consistency is what makes the formula meaningful.",
            "Use a range of rates rather than a single optimistic one, and compare the outcomes. If the plan only works at the highest rate, the goal is probably too ambitious for the time or amount you have.",
            "For personal advice about which products suit you, consult a qualified, registered adviser. A calculator can show arithmetic, but it cannot assess your risk tolerance, tax position or other commitments.",
          ],
        },
      ],
      summary: "A SIP calculator applies the future value of regular deposits at an assumed constant rate. In the example, 5,000 a month for 10 years at 12% reaches about 1,161,695 on 600,000 invested. Real returns vary, so treat the result as an estimate, test several rates, and give time and consistency the most weight.",
      faq: [
        {
          q: "Is the SIP calculator result guaranteed?",
          a: "No. It assumes a constant return that real investments do not deliver. Market-linked returns vary from period to period and can be negative. The result is a scenario that depends entirely on the rate you enter.",
        },
        {
          q: "Why do two SIP calculators show different results?",
          a: "They may assume deposits at the start or end of each month, compound monthly or annually, or round the rate differently. Start-of-month timing gives a slightly higher value. Check each tool's stated assumptions before comparing.",
        },
        {
          q: "Does the formula include taxes and fees?",
          a: "No. The standard formula uses only amount, rate and duration. Expense ratios, exit charges and taxes reduce your actual outcome. You can approximate this by entering a lower net rate.",
        },
        {
          q: "What rate should I enter?",
          a: "There is no correct rate to assume. Try a low, a medium and a high figure and see whether your goal still holds. Planning around a cautious number is safer than relying on a past high.",
        },
      ],
    },
  },
  {
    slug: "how-gst-is-calculated",
    title: "How GST Is Calculated: Adding, Removing and Splitting Tax",
    category: "Finance",
    excerpt: "Learn the formulas for adding GST to a price, removing it from a GST-inclusive amount and splitting it into CGST and SGST, with clear worked examples you can verify by hand.",
    readTime: "6 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "GST Calculator",
      path: "/gst-calculator",
    },
    content: {
      introduction: "GST is charged as a percentage of a price, but the arithmetic trips people up in one place: going backwards. Adding 18 percent to a price is easy; working out the original price from a total that already includes GST is not the same as subtracting 18 percent. This guide gives the formulas for both directions, explains the CGST and SGST split, and uses worked examples. Rates here are examples for the method only.",
      sections: [
        {
          heading: "Exclusive and inclusive prices",
          body: [
            "A GST-exclusive price is the base amount before tax. A GST-inclusive price already contains the tax. Invoices usually show the exclusive value, the tax amount and the total separately, but shop labels and quotations often state a single inclusive price, so it matters which one you have in hand.",
            "Confusing the two causes real errors. If a supplier quotes 1,000 plus GST, you will pay more than 1,000. If a price tag says 1,000 inclusive of GST, the supplier receives less than 1,000 after the tax is set aside.",
            "Before calculating, find out what the figure represents. Read the wording on the quotation or invoice, and when it is unclear, ask the seller to state whether tax is included.",
          ],
        },
        {
          heading: "Adding GST to a base price",
          body: [
            "To add GST, multiply the base price by the rate to get the tax, then add it to the base. Equivalent shortcut: multiply the base by (1 + rate/100).",
            "As an example only, suppose the base price is 2,000 and the applicable rate is 18 percent. GST is 2,000 × 18 / 100 = 360, and the total is 2,360. Using the shortcut, 2,000 × 1.18 = 2,360, the same answer.",
            "The rate depends on the goods or service, and rates and classifications are revised by the authorities from time to time. Do not rely on a rate remembered from an older invoice. Check the current rate for your item on the official GST portal or with your tax professional.",
          ],
          codeOrFormula: "GST amount = Base price × Rate / 100\nTotal = Base price + GST amount = Base price × (1 + Rate / 100)",
        },
        {
          heading: "Removing GST from an inclusive price",
          body: [
            "Here is the common mistake. If 18 percent GST was added to a base, then the total is 118 percent of the base, so the base is the total divided by 1.18, not the total minus 18 percent of the total. Subtracting 18 percent of 1,180 gives 967.60, which is wrong.",
            "The correct method is to divide. If the inclusive price is 2,950 at an example rate of 18 percent, the base is 2,950 / 1.18 = 2,500. The GST contained in the price is 2,950 − 2,500 = 450. You can confirm by adding 18 percent to 2,500: 2,500 × 0.18 = 450.",
            "A quick check is that the tax amount in an inclusive price is always a smaller fraction of the total than the rate itself. At 18 percent, the tax is 18/118, about 15.25 percent, of the inclusive price.",
          ],
          codeOrFormula: "Base price = Inclusive price / (1 + Rate / 100)\nGST amount = Inclusive price − Base price",
          callout: "To remove GST, divide by (1 + rate/100). Never subtract the rate percentage from the inclusive total.",
        },
        {
          heading: "CGST and SGST split",
          body: [
            "For a sale within one state, the GST is divided equally between the central government (CGST) and the state government (SGST, or UTGST in union territories). Each is half of the total GST rate.",
            "In the earlier example with 360 of GST on a base of 2,000, the CGST is 180 and the SGST is 180. At an 18 percent rate, each component is 9 percent, so 2,000 × 9 / 100 = 180.",
            "For a sale between different states, a single integrated tax (IGST) applies at the full rate instead, so the tax is shown as one line. The total amount is the same either way; only the way it is reported and shared differs. Which applies depends on the place of supply rules, which your invoice or accountant will confirm.",
          ],
          codeOrFormula: "CGST = SGST = GST amount / 2\nIGST = full GST amount (for interstate supply)",
        },
        {
          heading: "A full worked example",
          body: [
            "A service provider quotes 2,500 for a job, and GST at an example rate of 18 percent applies. GST is 2,500 × 0.18 = 450, so the invoice total is 2,950. Within a state this is shown as CGST 225, SGST 225.",
            "Now reverse it. A customer holds only the invoice total of 2,950 and wants the base. Divide by 1.18 to get 2,500, and the tax is 450, split as 225 and 225. The numbers reconcile in both directions, which is the best check available.",
            "With discounts, apply them to the base price before adding GST unless the invoice states otherwise, since tax generally follows the final taxable value. Terms differ by transaction, so confirm with the invoice terms.",
          ],
        },
        {
          heading: "Common mistakes to avoid",
          body: [
            "The first is subtracting instead of dividing when removing tax. The second is applying the rate to a figure that already includes tax, which double-counts it. The third is rounding too early: keep full precision through the calculation and round only the final amounts, because rounding each line can leave a rupee difference on the total.",
            "Another is using an outdated rate. Rate changes are announced officially and apply from a stated date. Use the current official rate for the goods or services and the date of supply.",
            "Finally, a calculator cannot tell you whether a transaction is taxable, exempt or subject to special rules. It only does the arithmetic once you supply the right rate, so use it alongside your invoice and professional advice.",
          ],
        },
      ],
      summary: "To add GST, multiply the base by one plus the rate. To remove it, divide the inclusive price by one plus the rate. Within a state, split the tax equally into CGST and SGST. Always check the current official rate for your item rather than relying on memory.",
      faq: [
        {
          q: "How do I find the original price from a GST-inclusive amount?",
          a: "Divide the inclusive price by 1 plus the rate as a decimal. At an example rate of 18 percent, divide by 1.18. Subtracting the percentage from the total gives the wrong answer because the tax was charged on the smaller base.",
        },
        {
          q: "What is the difference between CGST, SGST and IGST?",
          a: "CGST and SGST are the central and state shares of GST on a sale within one state, each usually half of the total rate. IGST is a single tax charged at the full rate on interstate supplies.",
        },
        {
          q: "Where do I check the current GST rate?",
          a: "Use the official GST portal and notifications from the tax authorities, or ask a qualified tax professional. Rates and classifications can change, so avoid relying on figures from older articles or invoices.",
        },
        {
          q: "Should discounts be applied before GST?",
          a: "Generally the tax applies to the final taxable value, so a discount on the base price reduces the GST too. Treatment can depend on how the discount is documented, so check your invoice terms or advisor.",
        },
      ],
    },
  },
  {
    slug: "understanding-bmi-and-its-limits",
    title: "Understanding BMI and Its Limits",
    category: "Health",
    excerpt: "Learn how body mass index is calculated, what the standard WHO adult categories mean, why BMI is only a screening measure, and which groups it can misjudge, with a worked example you can follow.",
    readTime: "6 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "BMI Calculator",
      path: "/bmi-calculator",
    },
    content: {
      introduction: "Body mass index compares your weight with your height using a single number. It is quick, free and widely used, which is why it appears in health forms and fitness apps. It is also easy to over-read. BMI cannot see muscle, bone, fat distribution or fitness. This guide explains the formula, the standard WHO adult categories and the groups for whom the number can mislead. It is general information, not medical advice.",
      sections: [
        {
          heading: "The BMI formula",
          body: [
            "BMI is your weight in kilograms divided by the square of your height in metres. Height is squared so that the measure roughly evens out the difference in weight between taller and shorter people.",
            "Take an adult who weighs 70 kg and is 1.75 m tall. Height squared is 1.75 × 1.75 = 3.0625, and 70 divided by 3.0625 gives 22.9. A second person at 82 kg and 1.70 m has height squared of 2.89 and a BMI of 28.4.",
            "If you prefer pounds and inches, multiply weight in pounds by 703 and divide by height in inches squared. A person who is 154 lb and 66 inches tall gets 703 × 154 / 4,356 = 24.9, close to the metric figure for the same body.",
          ],
          codeOrFormula: "BMI = weight (kg) / height (m)²\nBMI = 703 × weight (lb) / height (in)²",
        },
        {
          heading: "WHO adult categories",
          body: [
            "The World Health Organization groups adult BMI into bands. Below 18.5 is classed as underweight. From 18.5 to 24.9 is the normal range. From 25.0 to 29.9 is overweight, sometimes called pre-obese. At 30.0 and above the person is classed as obese, which is further divided into class I (30.0 to 34.9), class II (35.0 to 39.9) and class III (40.0 and above).",
            "These bands were set by looking at population-level patterns between BMI and the risk of certain health conditions. They are statistical guideposts for groups, not diagnoses for individuals. Two people with the same BMI can have very different health.",
            "These categories apply to adults. For children and teenagers, BMI is interpreted against age and sex growth charts rather than fixed bands, and a health professional should do that interpretation.",
          ],
        },
        {
          heading: "Why BMI is a screening measure, not a diagnosis",
          body: [
            "A screening tool is meant to flag people who might want a closer look, not to settle the question. BMI works for that purpose because it is cheap and repeatable: a clinician can compute it in seconds and use it as a starting point alongside other information.",
            "What it does not do is measure body fat directly. It cannot tell whether weight is muscle, fat, bone or fluid, and it says nothing about where fat is stored. Fat around the abdomen is generally regarded as more relevant to certain health risks than fat elsewhere, which is why waist measurement is often used as a companion check.",
            "A proper assessment may also consider blood pressure, blood tests, family history, diet, activity and how you feel. BMI is one input among several, and it is poor at stating anything certain about a single person.",
          ],
          callout: "This guide is general information, not medical advice. If you are worried about your weight or health, speak to a qualified doctor or dietitian.",
        },
        {
          heading: "Who BMI can misjudge",
          body: [
            "Athletes and people with a lot of muscle can have a BMI in the overweight range while carrying little excess fat, because muscle is denser than fat. A heavily trained person may be classed as overweight by the number alone.",
            "Older adults can lose muscle and gain fat while their weight stays steady, so a normal BMI can hide an unhealthy body composition. Very short and very tall people can also be slightly misjudged by the formula.",
            "Ethnicity matters too. Some health bodies use lower cut-off points for South Asian and some other populations, because risk can appear at lower BMI values. Pregnant women, children and people with conditions that cause fluid retention need different assessment altogether, since BMI is not designed for them.",
          ],
        },
        {
          heading: "Using BMI sensibly",
          body: [
            "Treat your BMI as a rough indicator and look at the trend rather than a single reading. Large unexplained changes in weight deserve a conversation with a clinician more than a particular number does.",
            "Combine it with other simple measures: waist circumference, how your clothes fit, your energy and fitness, and results from routine health checks. If these point in the same direction, the picture is clearer. If they disagree, rely on the more direct measures.",
            "Avoid using BMI to judge other people or to set extreme goals. Rapid weight loss or gain chosen only to move into a different band can be harmful. Sensible habits such as regular movement, balanced meals and enough sleep matter more than hitting a number.",
          ],
        },
      ],
      summary: "BMI is weight in kilograms divided by height in metres squared, grouped by WHO into underweight, normal, overweight and obese bands for adults. It is a quick screening number that cannot see muscle, fat distribution or age effects. Use it as one input and see a professional for personal advice.",
      faq: [
        {
          q: "What is a healthy BMI range?",
          a: "The WHO normal range for adults is 18.5 to 24.9. Being inside or outside it does not by itself prove good or poor health. Other factors such as waist size, fitness and medical history also matter.",
        },
        {
          q: "Is BMI accurate for athletes?",
          a: "Often not. Muscle is dense, so a very muscular person can show an overweight BMI with low body fat. Body composition measures and a clinician's judgement give a better picture for athletes.",
        },
        {
          q: "Does BMI work for children?",
          a: "Not with adult bands. Children's BMI is compared with growth charts for their age and sex. A paediatrician or health professional should interpret it, not the adult categories.",
        },
        {
          q: "Should I rely on BMI alone to make health decisions?",
          a: "No. It is a screening number, not a diagnosis. Discuss concerns with a qualified healthcare professional who can consider your whole health, including measurements and tests that BMI cannot capture.",
        },
      ],
    },
  },
  {
    slug: "how-to-create-a-strong-password",
    title: "How to Create a Strong Password: Length, Entropy and Good Habits",
    category: "Security",
    excerpt: "Understand why length beats complexity, how password entropy is calculated with a worked example, and how password managers and two-factor authentication protect your accounts better than clever substitutions ever can.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "Password Generator",
      path: "/password-generator",
    },
    content: {
      introduction: "Most password advice is a list of rules that nobody follows well: one capital, one symbol, change it every month. A better way to think about it is how many guesses an attacker would need. That number depends on how unpredictable the password is, and it can be measured. This guide explains entropy with a simple formula, shows why length matters more than decoration, and covers the habits that actually keep accounts safe.",
      sections: [
        {
          heading: "What makes a password strong",
          body: [
            "A strong password is one that is hard to guess, either by a person who knows you or by software trying millions of candidates. Two things decide this: how long it is and how random it is. A short password built from a pet name and a birth year is weak no matter how many symbols you add, because attackers try such patterns first.",
            "Attackers rarely type guesses one at a time. They use lists of leaked passwords, common words, keyboard patterns and the usual tricks such as swapping a for @ or adding 1 at the end. A password that follows a predictable pattern falls quickly even if it looks complicated.",
            "The strongest passwords are ones generated by a random process, because randomness removes the human habits that attackers exploit. This is the job a password generator does well.",
          ],
        },
        {
          heading: "Entropy: measuring unpredictability",
          body: [
            "Entropy, measured in bits, counts how many equally likely possibilities a password could have been chosen from. Each extra bit doubles the number of guesses an attacker needs. For a truly random password, entropy equals the length multiplied by the base-2 logarithm of the character set size.",
            "Take the 94 printable ASCII characters (uppercase, lowercase, digits and symbols). Each random character adds log2(94), about 6.55 bits. A random 12 character password therefore has about 12 × 6.55 = 78.7 bits. A random 8 character one has about 52.4 bits.",
            "The calculation only holds when characters are chosen randomly. A human-chosen password like Summer2024! has far less entropy than the formula suggests, because the pattern is common. The formula gives an upper limit that only random generation reaches.",
          ],
          codeOrFormula: "Entropy (bits) = Length × log2(Character set size)\nExample: 12 × log2(94) = 12 × 6.55 ≈ 78.7 bits",
        },
        {
          heading: "Length beats complexity",
          body: [
            "Compare two random passwords. Sixteen lowercase letters only have a character set of 26, so entropy is 16 × log2(26) = 16 × 4.70, about 75.2 bits. Eight characters from the full 94 symbol set give only about 52.4 bits. The long, plain password is vastly stronger, by around 23 bits, which means roughly seven million times more possibilities.",
            "This is why passphrases work. A passphrase made of several random words from a large list is easy to remember and type. With a list of 7,776 words, each random word adds about 12.9 bits, so four words give about 51.7 bits, five give about 64.6 and six give about 77.5.",
            "The words must really be chosen at random, by dice or a generator, not picked because they feel meaningful. A famous quote or a line from a song is predictable and appears in attacker wordlists.",
          ],
          callout: "Add length first. A longer random password almost always beats a shorter one dressed up with symbols.",
        },
        {
          heading: "Password managers",
          body: [
            "The real problem is not making one strong password, it is making a different strong password for every account. People reuse passwords because remembering dozens is impossible. When one site is breached, attackers try the same email and password on other services, and reuse turns one leak into many.",
            "A password manager solves this by generating and storing a unique random password per account, protected by one strong master password. You remember one passphrase, and the manager fills in the rest. Reputable managers encrypt the vault so the provider cannot read it.",
            "Choose a manager that is well established and keep the master password out of the vault itself. Write down recovery information and keep it somewhere physically safe, since losing the master password can mean losing access to everything.",
          ],
        },
        {
          heading: "Two-factor authentication",
          body: [
            "Two-factor authentication adds a second proof beyond the password, usually a code from an authenticator app, a hardware security key or a text message. Even if your password leaks, an attacker still needs the second factor.",
            "Not all second factors are equal. Authenticator apps and hardware keys are generally stronger than codes sent by SMS, since phone numbers can be hijacked through SIM swapping. Any second factor is much better than none, so turn on whichever is available for email, banking and your password manager first.",
            "Store backup codes safely when you set it up. If your phone is lost and you have no backup, recovery can be slow or impossible.",
          ],
        },
        {
          heading: "Common mistakes to avoid",
          body: [
            "Reusing a password across sites is the most damaging habit. Close behind are personal details such as names, birthdays and phone numbers, which are easy to find or guess. Predictable substitutions like P@ssw0rd do not fool cracking tools, which try them by default.",
            "Another mistake is sharing passwords through chat or email, where copies linger. Writing a password down is not always bad: a note kept in a locked drawer is safer than a weak password remembered in your head. Compare the real risks for your situation.",
            "Frequent forced changes tend to produce predictable edits like adding a number. Current guidance generally favours changing a password when there is a reason, such as a breach or suspicious activity, rather than on a fixed schedule. Treat any message asking you to confirm a password by link with suspicion, and go to the site directly instead.",
          ],
        },
      ],
      summary: "Password strength comes from length and genuine randomness, measured as entropy: length times log2 of the character set. Sixteen random lowercase letters beat eight mixed characters. Use a manager for unique passwords, turn on two-factor authentication, and avoid reuse and predictable patterns.",
      faq: [
        {
          q: "How long should a password be?",
          a: "Longer is better. For a random password, 14 to 16 characters or a passphrase of five to six random words is a strong target. For the master password of a manager, use a passphrase you can remember and type reliably.",
        },
        {
          q: "Are password generators safe to use?",
          a: "A generator that runs locally in your browser and does not send the result anywhere is safe in principle. Use trusted tools, copy the password straight into a manager, and avoid generators that ask you to create an account or share the output.",
        },
        {
          q: "Is it safe to write passwords down?",
          a: "It can be, if the paper is kept somewhere secure. For many people, a written unique password is safer than a short memorable one that gets reused. A password manager remains a better option for most accounts.",
        },
        {
          q: "Do I need to change my passwords regularly?",
          a: "Not on a fixed schedule if they are long and unique. Change a password when there is a breach, suspicious activity, or when you have shared it with someone who no longer needs access.",
        },
      ],
    },
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: How It Works Byte by Byte",
    category: "Developers",
    excerpt: "See how Base64 turns bytes into text step by step with a verified example, why it adds roughly one third to the size, how data URIs use it, and why it is encoding and not encryption.",
    readTime: "7 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "Base64 Converter",
      path: "/base64-converter",
    },
    content: {
      introduction: "Base64 shows up in email attachments, data URIs, API tokens and configuration files, usually as a string of letters and digits that looks like gibberish. It is not secret and it is not compression. It is a way of representing arbitrary bytes using only 64 safe text characters. This guide walks through the algorithm by hand with a small example, explains why the output is larger than the input, and clears up the common confusion with encryption.",
      sections: [
        {
          heading: "Why Base64 exists",
          body: [
            "Many systems were built to carry text, not raw binary. Early email, for example, moved only a limited set of printable characters safely, and certain byte values could be altered or treated as control codes along the way. Sending an image or a file directly could corrupt it.",
            "Base64 solves this by mapping any sequence of bytes onto an alphabet of 64 characters that survive text channels intact. The alphabet is the uppercase letters A to Z, lowercase a to z, digits 0 to 9, and the symbols + and /. An equals sign is used for padding at the end.",
            "Because every character belongs to that safe set, the encoded data can be embedded in JSON, HTML, URLs (with a variant) or email bodies without trouble, then decoded back to the exact original bytes on the other side.",
          ],
        },
        {
          heading: "How it works, byte by byte",
          body: [
            "The algorithm takes the input three bytes at a time. Three bytes are 24 bits, and 24 divides evenly into four groups of 6 bits. Each 6-bit group is a number from 0 to 63, which is used as an index into the 64-character alphabet.",
            "Work through the text Man. In ASCII, M is 77, a is 97 and n is 110, which in binary are 01001101, 01100001 and 01101110. Joined, that is 010011010110000101101110. Split into four 6-bit groups: 010011, 010110, 000101, 101110.",
            "Those groups equal 19, 22, 5 and 46. In the alphabet, index 19 is T, 22 is W, 5 is F and 46 is u. So Man encodes to TWFu. You can confirm this with any Base64 tool.",
          ],
          codeOrFormula: "Man  ->  01001101 01100001 01101110\n     ->  010011 010110 000101 101110\n     ->  19 22 5 46  ->  T W F u  ->  TWFu",
        },
        {
          heading: "Padding with equals signs",
          body: [
            "Input length is not always a multiple of three. When the last group has only one or two bytes, the encoder fills the remaining bits with zeros to make complete 6-bit groups, then adds equals signs so the output length is a multiple of four.",
            "Two leftover bytes produce three characters plus one equals sign. The text Ma encodes to TWE=. One leftover byte produces two characters plus two equals signs. The five byte string Hello encodes to SGVsbG8=, where the single equals sign shows that the last group was short by one byte.",
            "The padding carries no data. It just tells the decoder how many bytes the final group really holds. Some systems drop padding, which works if the decoder knows the length, but standard decoders usually expect it.",
          ],
        },
        {
          heading: "Why the size grows by about a third",
          body: [
            "Every three bytes of input become four characters of output, and each character normally occupies one byte in storage. The ratio is therefore 4 to 3, an increase of about 33 percent. The 13 byte text Hello, World! becomes the 20 character string SGVsbG8sIFdvcmxkIQ==, because 13 bytes round up to five groups of four.",
            "In addition, some formats such as MIME email break Base64 into lines of 76 characters with line endings, which adds a little more. The extra overhead is small compared with the one third increase from the encoding itself.",
            "This is the main cost of the technique. Encoding a 1 MB image as Base64 gives about 1.33 MB of text, and if the transport then compresses the text, much of the overhead disappears, but you should never expect Base64 to save space.",
          ],
          callout: "Base64 makes data safe to carry as text, not smaller. Expect roughly 33 percent more bytes than the original.",
        },
        {
          heading: "Data URIs and everyday uses",
          body: [
            "A data URI embeds a file directly in a web page or stylesheet using the form data:image/png;base64, followed by the encoded bytes. It saves a separate network request, which can help for tiny icons, but it inflates the document and bypasses caching of the image on its own.",
            "Other common uses include email attachments, storing small binary values in JSON or XML, and the segments of JSON Web Tokens, which use a URL-safe variant that replaces + and / with - and _. HTTP Basic authentication also encodes the username and password pair this way.",
            "For anything large, it is usually better to serve the file normally. Embedding a large image as Base64 makes the page heavier and harder to cache, and the browser must decode it before showing it.",
          ],
        },
        {
          heading: "Encoding is not encryption",
          body: [
            "Anyone can decode Base64, with no key and no effort. It offers no confidentiality at all, and its presence means nothing about whether data is protected. A password stored as Base64 is effectively stored in plain text.",
            "Mix-ups cause real problems, such as developers placing credentials in a Base64 string and treating it as hidden. The Basic authentication header is an example: it is encoded, not secured, which is why it should only be used over an encrypted HTTPS connection.",
            "If you need to protect data, use real encryption with a key, and for passwords use a slow salted hashing function. Base64 may then be applied afterwards, purely to carry the encrypted bytes as text.",
          ],
        },
      ],
      summary: "Base64 converts every three bytes into four text characters from a 64-character alphabet, with equals signs padding the end. That makes binary safe to carry in text formats at the cost of about one third more size. It is reversible by anyone, so it is encoding, never encryption or protection.",
      faq: [
        {
          q: "Does Base64 compress data?",
          a: "No. It increases size by about 33 percent because four characters represent three bytes. If a surrounding system compresses the text, some of the overhead is recovered, but the encoding itself never reduces size.",
        },
        {
          q: "Is Base64 secure?",
          a: "No. Anyone can decode it without a key, so it gives no protection. Use proper encryption for confidentiality and a salted hash for passwords. Base64 only changes how bytes are written as text.",
        },
        {
          q: "What do the equals signs at the end mean?",
          a: "They are padding. They fill the final group so the output length is a multiple of four. One equals sign means the last group had two input bytes, and two equals signs mean it had one.",
        },
        {
          q: "What is URL-safe Base64?",
          a: "It is a variant that replaces + and / with - and _ so the output can appear in URLs and filenames without escaping. It is used in JSON Web Tokens and often omits the padding.",
        },
      ],
    },
  },
  {
    slug: "how-to-merge-and-organize-pdf-files",
    title: "How to Merge and Organize PDF Files Properly",
    category: "Documents",
    excerpt: "Learn when merging PDFs makes sense, how to order pages and keep navigation intact, what happens to file size, how scanned and text PDFs differ, and how to check the merged result before sending it.",
    readTime: "6 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "Merge PDF",
      path: "/merge-pdf",
    },
    content: {
      introduction: "Combining several PDFs into one is a routine task: a job application with certificates, a loan file with statements, or a report assembled from separate chapters. A merge is simple to perform, but the result can still be awkward if pages are in the wrong order, the file is too large to email, or the scanned pages cannot be searched. This guide covers when to merge, how to plan the order, what to expect from the file size and how to check the result.",
      sections: [
        {
          heading: "When merging is the right choice",
          body: [
            "Merge when the recipient needs to read the documents as one package: an application with supporting papers, an invoice bundle, a contract with its annexes. A single file is easier to send, easier to store and harder to leave incomplete by accident.",
            "Do not merge when the parts have different audiences or lifespans. Sensitive pages such as identity documents should not travel inside a file that goes to people who only need the covering letter. Keep separate files when each piece will be updated independently.",
            "Many portals also set limits on file count or size, or ask for one document per requirement. Read the instructions before combining everything. A merged file that breaks a stated rule can be rejected, wasting more time than it saved.",
          ],
        },
        {
          heading: "Plan the order before you merge",
          body: [
            "Decide the order on paper first. A logical sequence usually starts with a cover page or index, then the main document, then supporting material in the same order as the list you refer to. Readers should never have to hunt for the page you mention.",
            "Name your source files so that they sort in the intended order, for example with numeric prefixes like 01, 02, 03. Most tools let you drag files into position as well, but good filenames make mistakes less likely when you add a file later.",
            "Check each source file for orientation and page size. Mixing landscape scans with portrait pages is fine, but pages rotated sideways should be corrected first, since fixing them after merging means locating each one inside a long document.",
          ],
        },
        {
          heading: "Bookmarks, page numbers and navigation",
          body: [
            "Bookmarks are the clickable outline in the sidebar of a PDF reader. Some merge tools keep the bookmarks of each source file, while others drop them, so test your tool on a small sample if you rely on them. Where bookmarks are lost, you can add new ones in a PDF editor after merging.",
            "In longer files a contents page with page numbers is helpful, but remember that numbers printed on a page rarely match the position in the PDF. Page 1 of the second document might be page 13 in the combined file. Either re-number or refer to the viewer's page count.",
            "Links inside the original documents, such as a table of contents entry that jumps to a section, often still work after merging because they point within the same source part. External links remain unchanged. Test a few before sending.",
          ],
        },
        {
          heading: "File size consequences",
          body: [
            "A merged PDF is roughly as large as the sum of its parts. Combining ten 500 KB files gives a file in the region of 5 MB. Email providers commonly limit attachments to a few tens of megabytes, and many online forms set much lower limits, so check the destination.",
            "Size is mostly decided by images. Scans and photographed pages are stored as pictures, which are large, while pages of typed text are tiny. If you need to reduce the total, compress images in the source files or compress the final merged file, and keep a copy of the full quality original.",
            "Merging tools sometimes remove duplicate resources such as repeated embedded fonts, so the result can be slightly smaller than the sum, but this varies and you should not plan around it. Check the actual size after merging.",
          ],
          callout: "Merge first, check the page order and size, then compress if needed. Keep the original files until you have confirmed that the combined version is correct.",
        },
        {
          heading: "Scanned and text PDFs",
          body: [
            "A text PDF contains real characters, so you can search, select and copy text. A scanned PDF contains page pictures only. Merging does not change either type, so a file combining both will have some pages searchable and others not.",
            "If search matters, run optical character recognition (OCR) on the scanned pages to add an invisible text layer. OCR is not perfect, so check names, numbers and dates, especially on poor scans. The visible page image remains the same.",
            "Scan quality affects everything. Pages scanned at an angle, in low resolution or in poor light are hard to read and larger than they need to be. Where possible, rescan at a moderate resolution suited to text, which is commonly around 200 to 300 DPI, and straighten the pages.",
          ],
        },
        {
          heading: "Check the result before you send it",
          body: [
            "Open the merged file and scroll through every page. Confirm the order, that no page is missing or duplicated, that orientation is right and that nothing is cut off at the edges. It takes a few minutes and avoids most embarrassing mistakes.",
            "Look at the file properties. Verify the size, the page count and that the title or author fields do not reveal information you did not mean to share. Some tools inherit metadata from the first file.",
            "Finally, check privacy. Make sure no confidential page was included by accident, and consider adding a password if the file contains personal data. Name the final file clearly, for example with your name and the purpose, so the recipient can identify it later.",
          ],
        },
      ],
      summary: "Merge PDFs when the reader needs one package, and plan the order first. Check whether bookmarks survive, expect the size to be about the sum of the parts, and remember scanned pages are images without searchable text. Review every page of the result before sending.",
      faq: [
        {
          q: "Will merging PDFs reduce quality?",
          a: "Normally not. The tool copies the pages into one file without re-rendering them. Quality only drops if you then compress the result with settings that downsample images, so keep the originals just in case.",
        },
        {
          q: "Why is my merged PDF so large?",
          a: "Images drive file size. Scanned pages and photos are big, while typed text is small. Compress the images, reduce scan resolution, or split the package into two files if the destination has a size limit.",
        },
        {
          q: "Can I reorder pages after merging?",
          a: "Yes. Most PDF editors let you move, rotate, delete and extract pages. It is easier to get the file order right before merging, because fixing a long file requires finding each page.",
        },
        {
          q: "Can I make scanned pages searchable?",
          a: "Yes, with OCR, which reads the page image and adds a hidden text layer. Check the output for mistakes in names and numbers, because accuracy depends heavily on the quality of the scan.",
        },
      ],
    },
  },
  {
    slug: "how-to-protect-a-pdf-with-a-password",
    title: "How to Protect a PDF With a Password: What It Does and Does Not Do",
    category: "Documents",
    excerpt: "Understand what PDF password protection really offers, the difference between user and owner passwords, how to choose a strong password, and how to share it safely with the person who needs the file.",
    readTime: "6 min read",
    publishedAt: "October 2026",
    relatedTool: {
      name: "our PDF tools",
      path: "/tools?category=Document%20Tools",
    },
    content: {
      introduction: "Sending a bank statement, a contract or an ID scan by email means the file may sit in several inboxes and backups. A password on the PDF adds a layer of protection if the message ends up in the wrong place. But the protection is easy to misunderstand. Some passwords really lock the contents, while others only ask software to behave politely. This guide explains the two kinds of password, the limits of each, and how to use them sensibly.",
      sections: [
        {
          heading: "What a PDF password does",
          body: [
            "A password to open the document encrypts its contents. Without the password, the file cannot be read: a viewer asks for it before showing any page. This is the setting that protects confidentiality if the file reaches the wrong person.",
            "The strength of this protection depends on the encryption method used by the tool that created the file and on the password itself. Modern tools generally use a strong standard cipher, but older compatibility settings use weaker ones, so choose the strongest option offered when you protect a file.",
            "Protection applies to the file as it is stored and sent. Once someone with the password opens it, they can copy, screenshot or print the content if the reader allows it. A password controls access to the file, not what an authorised reader does afterwards.",
          ],
        },
        {
          heading: "User and owner passwords",
          body: [
            "PDF defines two roles. The user password (also called the open password) is required to open the document. The owner password controls permissions, such as whether printing, copying text, editing or filling forms is allowed.",
            "You can set either or both. A file with only an owner password opens for anyone but asks reading software to follow the restrictions. A file with a user password is encrypted and cannot be opened without it.",
            "The important caveat is that permission restrictions rely on the viewer honouring them. Some software ignores them, and tools exist that remove them without the owner password when no open password is set. Treat owner restrictions as a polite request, not as security, and rely on the open password when confidentiality matters.",
          ],
          callout: "If the document is sensitive, set an open password. Restrictions alone do not stop a determined person from copying or printing the content.",
        },
        {
          heading: "Choosing a strong password",
          body: [
            "The file can be copied and attacked offline, which means a weak password can be guessed by trying many candidates without any limit on attempts. A short or predictable password offers little protection even with strong encryption underneath.",
            "Use length and randomness. A random password of 14 or more characters, or a passphrase of five or six random words, is a sensible choice. Avoid names, dates of birth, phone numbers, the document name or anything the recipient could guess from context.",
            "Do not reuse the password from your email or banking accounts. Create a one-off password for each file or recipient, and record it in a password manager if you may need it later. A password generator is a good way to produce one.",
          ],
        },
        {
          heading: "Sharing the password safely",
          body: [
            "Sending the password in the same email as the file defeats the purpose, because anyone who can read the message gets both. Use a separate channel, such as a phone call, a text message, or a different messaging app, so that compromising one channel is not enough.",
            "Agree the password in advance when you can, particularly for regular exchanges. Tell the recipient what to expect and which tool they can use to open it, since very old viewers may not support modern encryption.",
            "Avoid hinting at the password in the message, for example by saying it is your date of birth. Once the recipient has opened the file, consider asking them to confirm and to delete the message containing the password.",
          ],
        },
        {
          heading: "Limits and risks to know",
          body: [
            "If you forget the open password, there is no reset. The encryption is designed to prevent access without it, and recovery usually means guessing, which may be impossible for a strong password. Store the password safely and keep an unprotected original in a secure place.",
            "Encryption does not hide the file's existence, its size or often its name. Metadata such as title or author fields may remain visible, depending on the tool. Rename files and clean metadata if these details are sensitive.",
            "A protected PDF is only as safe as the device where it is opened. If a laptop is compromised, an attacker may capture the contents after you type the password. Keep software updated and use trusted devices for sensitive documents.",
          ],
        },
        {
          heading: "A sensible workflow",
          body: [
            "Finalise the document first, including merging, signing and compressing, because editing after protection is awkward. Then apply a password using a tool that states what encryption it uses, and choose an open password rather than permissions alone.",
            "Test the result. Open the protected file in at least one viewer, enter the password, and confirm it asks for it each time. Try the file on a second device if the recipient will use a different one.",
            "Send the file, share the password separately, and keep the original safe. For highly sensitive material, consider additional controls such as a secure sharing service with expiry dates, since a password on an attachment is only one layer.",
          ],
        },
      ],
      summary: "An open password encrypts a PDF and keeps it unreadable without the password, while an owner password sets permissions that depend on software cooperation. Choose a long random password, share it through a separate channel, and keep an unprotected original in a safe place, since forgotten passwords cannot be reset.",
      faq: [
        {
          q: "Can a password-protected PDF be opened without the password?",
          a: "Not by design if it has a strong open password and modern encryption. Weak passwords can be guessed, and old encryption settings are weaker. Owner-only restrictions can often be removed, so do not treat them as security.",
        },
        {
          q: "What if I forget the PDF password?",
          a: "There is no built-in recovery. Strong encryption is meant to prevent access without the password. Keep the password in a manager and store an unprotected original securely, so a lost password does not mean a lost document.",
        },
        {
          q: "Is it safe to send the password by email?",
          a: "Not in the same message as the file. Use a separate channel such as a call or a messaging app, so that someone who sees the email cannot read the document.",
        },
        {
          q: "Does a password stop people from printing or copying?",
          a: "Only if an owner password sets those restrictions and the viewer respects them. Some software ignores restrictions, and anyone who opens the file can take screenshots, so rely on limiting who gets the password.",
        },
      ],
    },
  },
];
