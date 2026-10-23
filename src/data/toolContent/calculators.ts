import type { ToolContent } from "./types";

export const calculatorsContent: Record<string, ToolContent> = {
  "/sip-calculator": {
    route: "/sip-calculator",
    name: "SIP Calculator",
    intro: [
      "A systematic investment plan, or SIP, puts a fixed sum into an investment such as a mutual fund on the same date every month. This calculator projects what that habit could grow to. You enter a monthly amount, an assumed annual return and a duration in years, and it reports the total you put in, the projected gain and the final value in rupees.",
      "People use it to check whether a monthly contribution is on track for a goal such as a down payment, a child's education fund or a retirement top-up. It is equally useful for comparing scenarios, for example what an extra 2,000 rupees a month or five more years does to the end figure. Everything is computed in your browser, so nothing you type is stored or sent anywhere.",
    ],
    howItWorks: [
      "The page treats each instalment as an ordinary annuity: money is added at the end of each month and then compounds monthly. The formula is FV = P x ((1 + i)^n - 1) / i. Here FV is the final value, P is the Monthly Investment, i is the monthly rate (annual rate divided by 100, then by 12) and n is the number of months (years multiplied by 12). If the rate is zero the code simply returns P x n.",
      "Total Invested is P x n, Total Gain is FV minus Total Invested, and the gain percentage is Total Gain divided by Total Invested times 100. All four figures are rounded to two decimals and displayed in Indian digit grouping (lakhs and crores). Note that the rate is a steady assumed return. Real funds move up and down, so the output is a smooth projection, not a forecast.",
    ],
    steps: [
      "Type the amount you plan to invest every month into the Monthly Investment (rupees) field, for example 5000.",
      "Enter the Annual Return Rate in percent, such as 12. Use a figure you consider realistic rather than the best past result you have seen.",
      "Fill in Time Period in years. Decimals work, so 2.5 years is treated as 30 months.",
      "Press Calculate to see Final Value, Total Invested and the gain with its percentage.",
      "Change one input at a time and recalculate to see which lever matters most, then use Reset to start over.",
    ],
    example: {
      title: "5,000 rupees a month for 10 years at 12 percent",
      text: "Inputs: P = 5,000, annual rate = 12, years = 10. Monthly rate i = 12 / 100 / 12 = 0.01 and n = 10 x 12 = 120 months. Growth factor (1.01)^120 = 3.30039. Final value = 5,000 x (3.30039 - 1) / 0.01 = 5,000 x 230.0387 = 1,150,193.45. Total invested = 5,000 x 120 = 600,000. Gain = 1,150,193.45 - 600,000 = 550,193.45, which is 91.7 percent of the amount invested. The page shows the final value as 11,50,193.45 rupees. If the instalments were instead made at the start of each month, the result would be multiplied by 1.01 and reach about 11,61,695, which is why other calculators can show a slightly higher number for identical inputs.",
    },
    useCases: [
      { title: "Goal planning", text: "Work backwards from a target such as 10 lakh rupees in seven years by trying different monthly amounts until the final value crosses the target." },
      { title: "Comparing durations", text: "Run the same monthly amount for 5, 10 and 15 years to see how much of the final value comes from compounding rather than contributions." },
      { title: "Stress-testing the rate", text: "Calculate at 8, 10 and 12 percent to understand how sensitive your plan is to a lower return than you hoped for." },
    ],
    tips: [
      "Compare the Gain percentage across runs rather than the raw final value. It shows how hard your money is working relative to what you put in.",
      "Start early if you can. Doubling the duration usually does far more than doubling the monthly amount, because later years compound on a larger base.",
      "Use a conservative rate for planning. If the real return turns out higher you gain a pleasant surprise, and if it is lower your plan still holds.",
      "Remember that the figure is in future rupees. Inflation reduces what the final value can buy, so consider the result alongside your expected cost of living.",
    ],
    limitations: "This is an illustration with a fixed annual return, month-end instalments and no costs. It ignores expense ratios, exit loads, taxes on gains, missed instalments and market volatility, and it does not model step-up contributions. Market-linked returns are not guaranteed. The output is an estimate for planning, not investment, tax or financial advice.",
    faqs: [
      { question: "Is the return rate in this SIP calculator guaranteed?", answer: "No. The rate is an assumption you choose, and the calculator applies it evenly every month. Actual mutual fund returns vary from month to month and can be negative for long stretches. Treat the output as one possible path, and try several rates to see a range." },
      { question: "Does this calculator support a step-up SIP?", answer: "No. It assumes the same instalment every month for the whole period. To approximate a step-up, calculate each block of years separately, then carry the earlier final value forward by hand. A dedicated step-up tool would be more precise." },
      { question: "Why does my fund house calculator show a different number?", answer: "Differences usually come from timing and costs. This page assumes the instalment lands at the end of each month. Some tools assume the start of the month, which adds roughly one month of extra growth, and some deduct fund charges or taxes." },
      { question: "What is the difference between SIP and lump sum investing?", answer: "A lump sum invests everything at once and compounds for the full period. A SIP spreads the money over time, so early instalments compound longest and later ones barely grow. That is why the length of time you stay invested matters so much for a SIP." },
      { question: "Can I enter a zero percent return?", answer: "Yes. With a rate of zero the code skips the compounding formula and returns the plain total of all instalments, so the gain is zero. This is a quick way to see how much of your result comes from compounding alone." },
    ],
  },
  "/emi-calculator": {
    route: "/emi-calculator",
    name: "EMI Calculator",
    intro: [
      "An EMI, or equated monthly instalment, is the fixed amount you repay to a lender every month until a loan is cleared. This calculator takes a Principal Amount, an Annual Interest Rate and a Tenure in years, then returns your monthly EMI together with the total you will repay and the interest portion of it.",
      "It suits anyone comparing a personal, car or education loan before signing. Seeing the EMI next to total interest makes a cheaper monthly payment look less attractive when it comes from a longer tenure. The sums run locally in your browser, so loan details never leave your device.",
    ],
    howItWorks: [
      "The page uses the standard reducing-balance formula: EMI = P x r x (1 + r)^n / ((1 + r)^n - 1). P is the principal, r is the monthly interest rate (annual rate divided by 100, then by 12) and n is the number of monthly instalments (tenure in years times 12). Because interest is charged on the outstanding balance, early instalments are mostly interest and later ones mostly principal. At a zero rate the code returns P divided by n.",
      "Total Amount is EMI x n and Total Interest is Total Amount minus P. The headline EMI is rounded to two decimals, while the two summary tiles are shown in lakhs with one decimal, for instance 6.2L. One lakh is 100,000, so the tiles are quick comparisons, not exact rupee figures. The calculation assumes the first payment is due one month after disbursal and that the rate never changes.",
    ],
    steps: [
      "Enter the loan amount in the Principal Amount (rupees) field, for example 500000 for five lakh.",
      "Type the Annual Interest Rate as quoted by the lender, such as 8.5. Decimals are accepted.",
      "Enter the Tenure in years. A value like 1.5 is treated as 18 monthly instalments.",
      "Press Calculate. The Monthly EMI appears first, followed by Total Amount and Total Interest in lakhs.",
      "Change the tenure or rate and recalculate to compare offers, then press Reset to clear the form.",
    ],
    example: {
      title: "Five lakh loan at 8.5 percent for 5 years",
      text: "Inputs: P = 500,000, annual rate = 8.5, tenure = 5 years. Monthly rate r = 8.5 / 100 / 12 = 0.0070833 and n = 5 x 12 = 60. Growth term (1 + r)^60 = 1.527301. EMI = 500,000 x 0.0070833 x 1.527301 / (1.527301 - 1) = 5,409.2 / 0.527301, which gives 10,258.27 rupees per month. Total Amount = 10,258.27 x 60 = 615,495.94 rupees, shown as 6.2L. Total Interest = 615,495.94 - 500,000 = 115,495.94 rupees, shown as 1.2L. A quick sanity check: with no interest the EMI would be 500,000 / 60 = 8,333, so 10,258 is plausible for 8.5 percent.",
    },
    useCases: [
      { title: "Comparing lender offers", text: "Enter the same principal and tenure with each bank's quoted rate to see the exact monthly difference and the lifetime interest gap." },
      { title: "Choosing a tenure", text: "Try 3, 5 and 7 years to find a monthly payment you can carry without paying far more interest than necessary." },
      { title: "Budget checks before a purchase", text: "Test whether the EMI of a planned car or appliance loan fits inside the share of monthly income you are comfortable committing." },
    ],
    tips: [
      "Look at Total Interest, not only the EMI. A lower EMI from a longer tenure often costs more overall, and the difference is easy to miss.",
      "Use the rate on your sanction letter. Advertised starting rates are often reserved for the best credit profiles and may not apply to you.",
      "Add processing fees and insurance separately. They are not part of this calculation, so they raise the real cost of borrowing.",
      "Treat the lakh tiles as rounded. If you need the exact total, multiply the displayed EMI by the number of months.",
    ],
    limitations: "The result assumes a fixed rate, equal monthly payments and no fees, insurance, part-payments or penalty charges. Lenders may count days differently, round instalments, or reset the rate on floating loans, so the real EMI can differ by a small amount. Use the output as an estimate to compare options, not as a loan offer or financial advice.",
    faqs: [
      { question: "What is the difference between flat and reducing-balance interest?", answer: "This calculator uses the reducing-balance method, where interest each month is charged only on the principal still owed. A flat rate charges interest on the original amount for the whole term, so it produces a higher effective cost for the same quoted percentage." },
      { question: "Will my EMI change if the interest rate changes?", answer: "On a fixed-rate loan the EMI stays the same. On a floating-rate loan, lenders usually either change the EMI or the tenure when the benchmark moves. This tool shows a single fixed rate, so rerun it with the new rate to see the effect." },
      { question: "Why is the first EMI mostly interest?", answer: "Interest is calculated on the full outstanding balance, which is highest at the start. With 500,000 at 8.5 percent, month one interest is about 3,542 of a 10,258 instalment. The principal share grows each month as the balance shrinks." },
      { question: "Does this include prepayment?", answer: "No. The tool assumes you pay exactly the EMI until the end. If you plan to prepay, the practical way to estimate the effect is to recalculate using your remaining balance and remaining months as new inputs." },
      { question: "Why is the EMI slightly different from my bank statement?", answer: "Banks may start interest from the disbursal date, adjust for the number of days in the first period, or round instalments to the nearest rupee. These timing details change the figure by a small amount, but the formula underneath is the same." },
    ],
  },
  "/emi-calculator-advanced": {
    route: "/emi-calculator-advanced",
    name: "EMI Calculator Advanced",
    intro: [
      "This version of the loan calculator adds the details that appear in real loan quotes: a Down Payment that reduces the amount borrowed, a one-time Processing Fee, and a tenure you can enter in years or in months. Beside the monthly EMI it shows a short repayment table with principal, interest and balance for selected months.",
      "It is aimed at buyers who are financing something such as a car, a two-wheeler or a property and want to see how a larger down payment changes the monthly burden. The table also helps you understand how little of the first instalments reduces the debt. The page opens with example values already filled in, and all processing is local to your browser.",
    ],
    howItWorks: [
      "The net loan is Loan Amount minus Down Payment. The EMI then follows the reducing-balance formula: EMI = N x r x (1 + r)^n / ((1 + r)^n - 1), where N is the net loan, r is the monthly rate (annual percent divided by 1200) and n is the number of months (years times 12 when the unit is years). At a zero rate it returns N divided by n. Each schedule row computes interest as balance x r, principal as EMI minus interest, and carries the balance forward.",
      "Total Amount is EMI x n plus the Processing Fee, and Total Interest is EMI x n minus the net loan, so the fee is counted in the total but not in the interest. The schedule keeps months 1 to 3, the final month, and then every few months, spaced about one twelfth of the term apart. The on-page table shows the first six of those rows, rounded to the nearest rupee, while the CSV export lists every month with two decimals.",
    ],
    steps: [
      "Enter the full price or amount in Loan Amount (rupees), or tap one of the quick buttons for 1, 5, 10 or 20 lakh.",
      "Type your Down Payment. The line beneath it shows the Net Loan that will actually be financed.",
      "Set the Interest Rate (percent per year) and the Tenure number, then choose Years or Months in the Unit selector.",
      "Add the lender's Processing Fee in rupees, or leave it at zero if there is none.",
      "Read the Monthly EMI, Total Interest and Total Amount, check the Month, Principal, Interest and Balance table, and download the CSV if needed.",
    ],
    example: {
      title: "12 lakh purchase, 2 lakh down, 9 percent for 10 years",
      text: "Inputs: Loan Amount = 1,200,000, Down Payment = 200,000, rate = 9, tenure = 10 years, Processing Fee = 10,000. Net loan N = 1,000,000. Monthly rate r = 9 / 1200 = 0.0075 and n = 120. Growth term (1.0075)^120 = 2.451357. EMI = 1,000,000 x 0.0075 x 2.451357 / 1.451357 = 12,667.58, displayed as 12,668. Total repaid on the loan = 12,667.58 x 120 = 1,520,109.29, so Total Interest = 520,109 and Total Amount = 1,520,109 + 10,000 = 1,530,109. Month 1: interest = 1,000,000 x 0.0075 = 7,500, principal = 12,667.58 - 7,500 = 5,168, balance = 994,832. Month 2: interest 7,461, principal 5,206, balance 989,626.",
    },
    useCases: [
      { title: "Sizing the down payment", text: "Raise the down payment in steps and watch the net loan, EMI and total interest fall, to decide how much cash is worth committing up front." },
      { title: "Checking the true cost of a quote", text: "Enter the processing fee to see how much it adds to Total Amount, and compare it against a lender with a lower rate but a bigger fee." },
      { title: "Short tenures in months", text: "Switch the unit to months for 18 or 30 month consumer loans, where entering fractions of a year would be awkward." },
    ],
    tips: [
      "Keep the Loan Amount as the full price and put the cash you are paying in Down Payment. Entering only the borrowed sum there would subtract the down payment twice.",
      "Compare Total Interest across two scenarios instead of looking at EMI alone. Stretching the tenure can lower the EMI while raising lifetime interest sharply.",
      "Do not enter a tenure of zero. The formula divides by the number of months, so the figures become meaningless.",
      "Remember that the Total Amount includes the fee but the Total Interest excludes it, so subtract the fee when comparing interest across lenders.",
    ],
    limitations: "The on-screen table is a sampled preview of the first few rows, while the CSV download lists every month. The model assumes a fixed rate, month-end payments, a fee paid on top of the loan and no insurance, prepayment or penalty charges. Lenders may compute interest by day, so real figures can differ slightly. Output is an estimate, not financial advice.",
    faqs: [
      { question: "How does the down payment change the EMI?", answer: "The down payment is subtracted from the Loan Amount before the formula runs. A smaller net loan lowers every instalment in proportion, and it also cuts total interest, because interest is charged on a smaller outstanding balance for the same period." },
      { question: "Is the processing fee part of the interest?", answer: "No. The fee is a separate one-time charge. This tool adds it to Total Amount but leaves it out of Total Interest, so you can see the cost of borrowing and the cost of arranging the loan as two distinct numbers." },
      { question: "Why does the schedule skip some months?", answer: "The schedule keeps months 1 to 3, the final month, and one month in every twelfth of the term (months 10, 20, 30 and so on for a 10 year loan). The page displays only the first six of these, and the CSV export contains all months instead. Balances are computed month by month, so each row shown is accurate for its month." },
      { question: "Can I model prepayments or a floating rate?", answer: "Not directly. The calculator holds one rate and one tenure. To estimate a part-payment, subtract it from the balance shown in the table, then enter the remaining balance and remaining months as a fresh loan." },
      { question: "Should I enter tenure in months or years?", answer: "Either works. Years multiply by twelve internally, so 7 years and 84 months give the same EMI. Choose months when the loan term is not a whole number of years, for instance 30 months." },
    ],
  },
  "/age-calculator": {
    route: "/age-calculator",
    name: "Age Calculator",
    intro: [
      "The Age Calculator turns a single date of birth into a precise age: whole years, extra months, extra days, and the total number of days lived. You pick the date with the Birth Date field, press Calculate Age, and the result is measured against today's date as your device reports it.",
      "It is handy for filling in forms that ask for age in years and months, checking eligibility cut-offs for exams or enrolment, planning a milestone birthday, or settling a family debate about who is older. Because the maths runs inside your browser, the birth date you choose is not uploaded or stored anywhere.",
    ],
    howItWorks: [
      "The page subtracts the birth date from today in three parts: years = current year minus birth year, months = current month minus birth month, and days = current day minus birth day. If the day difference is negative, it borrows one month and adds the number of days in the month before the current one. If the month difference is then negative, it borrows one year and adds 12 months. This is the same long-subtraction method used for dates by hand.",
      "Total Days is a separate calculation: the difference between today and the birth date in milliseconds, divided by 86,400,000 (the milliseconds in a day) and rounded down. Leap years are handled automatically because it counts real calendar time, not 365 x years. The age is based on the date of the device clock, so a wrong system date gives a wrong result.",
    ],
    steps: [
      "Click the Birth Date field and choose a date from the picker, or type it in the format your browser shows.",
      "Press Calculate Age. If the field is empty, the page asks you to select a birth date first.",
      "Read the four tiles: Years, Months and Days make up your exact age, and Total Days shows the full count.",
      "To check someone else, choose their date and press Calculate Age again; the result updates immediately.",
      "Press Reset to clear the date and the result before starting over.",
    ],
    example: {
      title: "Born 15 March 1990, measured on 10 January 2025",
      text: "Years = 2025 - 1990 = 35. Months = 0 - 2 = -2 (the code numbers January as 0 and March as 2). Days = 10 - 15 = -5. Days is negative, so months drops by one to -3 and days gains the length of December, which is 31, giving 26. Months is still negative, so years drops by one to 34 and months gains 12, giving 9. The age is 34 years, 9 months, 26 days. Check: 15 March 1990 plus 34 years is 15 March 2024, plus 9 months is 15 December 2024, plus 26 days is 10 January 2025. Total Days is the real count of days in between, 12,720, and it includes the nine leap days (29 February 1992 through 2024).",
    },
    useCases: [
      { title: "Eligibility checks", text: "Confirm whether someone meets a minimum or maximum age on a given cut-off date for an exam, job or scheme." },
      { title: "Forms and records", text: "Get age expressed in years and months for paediatric, school admission or insurance forms that ask for both." },
      { title: "Milestones", text: "Use Total Days to see when a round number such as 10,000 days lived falls, which many people like to mark." },
    ],
    tips: [
      "Check your device date first. The calculator measures to the date on your clock, so a wrong system date shifts every number.",
      "Use Years, Months and Days together rather than only Years when a form asks for exact age; years alone hides up to eleven months.",
      "If you need age on a specific past or future date, note that this page always uses today, so work that case out by hand with the same borrow method.",
      "Double-check birthdays on 29 February. The calendar has no such date in most years, so records often treat 28 February or 1 March as the anniversary.",
    ],
    limitations: "The page always measures to the current moment on your device, with no option to pick a different end date. It uses the Gregorian calendar only, ignores time of birth and time zones beyond what your browser applies, and Total Days can differ by one near midnight. Do not rely on it for legal age proof; official documents decide that.",
    faqs: [
      { question: "How are leap years handled?", answer: "Total Days counts real elapsed calendar time, so 29 February days are included automatically. The years, months and days split also follows the real month lengths, because borrowed days come from the actual length of the previous month." },
      { question: "Why does it say 9 months instead of nearly 10?", answer: "The calculator only counts completed months. If you are 9 months and 26 days past your last birthday, the tenth month is not complete yet, so it stays at 9 until the day-of-month reaches your birth day again." },
      { question: "Can I calculate age on a particular date, like a school cut-off?", answer: "Not with this page, which always compares to today. You can estimate by subtracting the cut-off date manually with the same method: subtract year, month and day, and borrow from the previous month if days go negative." },
      { question: "Does it account for time zones?", answer: "Only loosely. The birth date comes from a date picker without a time, and today is read from your device clock. Near midnight, or when travelling across time zones, Total Days may differ by a day from another source." },
      { question: "Is my birth date stored anywhere?", answer: "No. The calculation happens in your browser in the page itself. The date you pick is held in memory only while the page is open and disappears when you reset or leave." },
    ],
  },
  "/unit-converter": {
    route: "/unit-converter",
    name: "Unit Converter",
    intro: [
      "The Unit Converter switches a number from one unit of measurement to another within four categories: Length, Weight, Volume and Temperature. You choose a category, type a Value, pick the From and To units, and the page shows the converted number together with a plain statement such as 5 mile = 8.046722 kilometer.",
      "It is useful in kitchens, workshops, classrooms and while shopping online, anywhere a recipe, a part specification or a product listing uses a unit you do not use daily. Conversions are calculated locally on your device with fixed factors, so they work offline once the page has loaded and no values are sent to a server.",
    ],
    howItWorks: [
      "For length, weight and volume the page stores one factor per unit relative to a base unit: meter, kilogram and liter. A conversion divides your value by the From factor to reach the base unit, then multiplies by the To factor. In plain text: result = value / factor_from x factor_to. For example, the meter factor of a mile is 0.000621371, because one meter is that fraction of a mile. The answer is shown to six decimals with trailing zeros removed.",
      "Temperature cannot use a single multiplier because the scales have different zero points. The page first converts to Celsius (C = (F - 32) x 5/9 for Fahrenheit, C = K - 273.15 for Kelvin) and then to the target scale (F = C x 9/5 + 32, K = C + 273.15). Temperature results are rounded to two decimals. Volume units follow US customary definitions, so a gallon here is the US gallon of about 3.785 liters.",
    ],
    steps: [
      "Choose a Category from the drop-down: Length, Weight, Volume or Temperature. The unit lists change to match.",
      "Type the number to convert into the Value box.",
      "Select the starting unit in From and the target unit in To.",
      "Press Convert to see the result and the readable line showing both units.",
      "Press Reset to clear the value and result, or change the category to start a different kind of conversion.",
    ],
    example: {
      title: "Three conversions with the numbers shown",
      text: "Length: 5 miles to kilometers. Base value = 5 / 0.000621371 = 8,046.72 meters. Multiply by the kilometer factor 0.001 to get 8.046722 kilometers. Weight: 70 kilograms to pounds. Base is already kilograms, so 70 x 2.20462 = 154.3234 pounds. Temperature: 98.6 Fahrenheit to Celsius. (98.6 - 32) x 5/9 = 66.6 x 0.5556 = 37, displayed as 37.00 Celsius. A quick sanity check for the first one: a kilometer is about 0.62 miles, so 5 miles should be a little over 8 kilometers, which matches.",
    },
    useCases: [
      { title: "Cooking and baking", text: "Convert cups, tablespoons and teaspoons from an American recipe into milliliters or liters for a metric measuring jug." },
      { title: "Travel and fitness", text: "Translate distances in miles into kilometers, or body and luggage weight between pounds and kilograms." },
      { title: "Science and homework", text: "Check Celsius, Fahrenheit and Kelvin conversions, or confirm that a hand-calculated length conversion is reasonable." },
    ],
    tips: [
      "Estimate first. Knowing that a kilogram is a little over two pounds lets you catch a mis-selected unit before it matters.",
      "Check the From and To menus before pressing Convert. Swapping them is the most common cause of an answer that looks wildly off.",
      "Remember that cups, pints and gallons here are US measures. British imperial versions of the same names are larger, so recipes may differ.",
      "For work that needs more precision than six decimal places, keep the original value and convert once at the end instead of chaining several conversions.",
    ],
    limitations: "The conversion factors are rounded to five or six significant digits, so very large or very small values may carry tiny errors. Only four categories are offered, and the page accepts negative numbers for temperature only. Length, weight and volume values must be zero or greater. For engineering, pharmacy or legal measurement, use exact published standards and verify the result.",
    faqs: [
      { question: "Can I convert negative temperatures?", answer: "Yes. Temperature accepts negative values such as -5 Celsius, which converts to 23.00 Fahrenheit. Length, weight and volume reject negatives because a negative distance, mass or volume has no practical meaning in this tool." },
      { question: "Are the gallon and cup the US or UK versions?", answer: "They are US versions. The gallon factor corresponds to about 3.785 liters and the cup to about 237 milliliters. UK imperial gallons are roughly 4.546 liters, so results can differ by around 20 percent if your source uses imperial." },
      { question: "How accurate are the conversions?", answer: "Accuracy is limited by the stored factors. The mile factor, for instance, has six significant digits, which gives good everyday precision. The output is shown to six decimals, but only the leading digits should be trusted for scientific work." },
      { question: "What is the difference between metric and imperial units?", answer: "Metric units such as meters, grams and liters scale by powers of ten, so conversions are simple shifts. Imperial and US customary units use irregular ratios, like 12 inches to a foot or 16 ounces to a pound, which is why a converter helps." },
      { question: "Why does Fahrenheit to Kelvin go through Celsius?", answer: "The scales have different starting points and step sizes, so there is no single multiplier. Passing through Celsius keeps each formula short and easy to verify: first adjust the zero point and step size, then add 273.15 for Kelvin." },
    ],
  },
  "/bmi-calculator": {
    route: "/bmi-calculator",
    name: "BMI Calculator",
    intro: [
      "Body Mass Index, or BMI, is a single number that relates a person's weight to their height. This calculator lets you choose a Measurement System (Metric in kg and cm, or Imperial in lbs and inches), enter your Weight and Height, and returns your BMI to one decimal place with a colour-coded category: Underweight, Normal Weight, Overweight or Obese.",
      "People use it as a quick first look at weight relative to height, to track change over months, or to follow a general health discussion with a doctor or dietitian. It is a screening number rather than a diagnosis. The calculation happens in your browser and your measurements are not saved or transmitted.",
    ],
    howItWorks: [
      "The formula is BMI = weight in kilograms / (height in meters)^2. In the metric setting the page converts centimeters to meters by dividing by 100. In the imperial setting, height in inches is multiplied by 0.0254 to get meters, and the equivalent imperial form is BMI = 703 x weight in pounds / (height in inches)^2. The result is rounded to one decimal, so 22.857 appears as 22.9.",
      "The category thresholds used by the page are those commonly applied to adults: below 18.5 is Underweight, 18.5 up to but not including 25 is Normal Weight, 25 up to but not including 30 is Overweight, and 30 or higher is Obese. The category is chosen from the unrounded BMI, which matters only for values right on a boundary. Because BMI uses only weight and height, it cannot see muscle, bone density or where fat is carried.",
    ],
    steps: [
      "Select a Measurement System: Metric (kg/cm) or Imperial (lbs/in). The labels on the Weight and Height fields update accordingly.",
      "Enter your Weight in the unit shown, for example 70 for 70 kg.",
      "Enter your Height in centimeters or inches, for example 175 for 175 cm.",
      "Press Calculate to see the BMI number, its category and a summary of the weight and height you entered.",
      "Use Reset to clear the fields, which also returns the system to Metric.",
    ],
    example: {
      title: "70 kg and 175 cm",
      text: "System = Metric. Height in meters = 175 / 100 = 1.75. Height squared = 1.75 x 1.75 = 3.0625. BMI = 70 / 3.0625 = 22.857, shown as 22.9. Because 22.9 is at least 18.5 and below 25, the category is Normal Weight. For context, the same 1.75 m height has a Normal Weight band from 18.5 x 3.0625 = 56.7 kg to 25 x 3.0625 = 76.6 kg. At 85 kg the BMI would be 27.8 and the category Overweight. In imperial units, 154 lb at 68 in gives 703 x 154 / 4,624 = 23.4.",
    },
    useCases: [
      { title: "Tracking over time", text: "Record your BMI monthly while changing diet or activity, and look at the trend rather than a single reading." },
      { title: "Preparing for a check-up", text: "Know your number before a consultation, so you can ask informed questions about what it means for your own situation." },
      { title: "Understanding a range", text: "Reverse the formula to see the weight span that falls in the Normal Weight band for your height." },
    ],
    tips: [
      "Measure height without shoes and weight at a consistent time of day. Small habits change the result by a few tenths of a point.",
      "Check the unit selector first. Entering kilograms with Imperial selected, or inches with Metric selected, produces a number that is far from reality.",
      "Look at the BMI together with waist size, fitness and medical history. Two people with the same BMI can have very different health profiles.",
      "Treat a boundary result such as 24.9 or 25.0 as a gradual change, not a sudden switch between categories.",
    ],
    limitations: "BMI does not measure body composition. It cannot tell muscle from fat, and it ignores age, sex, ethnicity, pregnancy and frame size. The categories shown are general adult cut-offs, and some health bodies use different thresholds for certain populations. It is not designed for children and teenagers. This tool does not give medical advice, so discuss your results with a qualified professional.",
    faqs: [
      { question: "Is BMI accurate for athletes?", answer: "Often not. Muscle weighs more than fat for the same volume, so a muscular person can reach an Overweight BMI while having low body fat. In that case, other measures such as waist circumference or body fat percentage are more informative." },
      { question: "Does the same BMI mean the same thing for every age?", answer: "No. The adult categories here do not apply to children, whose healthy ranges depend on age and sex. Older adults can also lose muscle, so a normal BMI may hide low muscle mass. Clinicians interpret the number in context." },
      { question: "Why do some countries use different BMI cut-offs?", answer: "Research has shown that risk related to body fat can start at lower BMI values in some populations, particularly several Asian populations. Some guidelines therefore lower the Overweight and Obese thresholds. Ask your doctor which scale they use." },
      { question: "What is the difference between metric and imperial entry?", answer: "Only the units. Metric takes kilograms and centimeters, imperial takes pounds and inches. The formula is the same once everything is converted, so the same person should get the same BMI either way, apart from rounding." },
      { question: "How do I work out a healthy weight range for my height?", answer: "Multiply the square of your height in meters by 18.5 and by 24.9. For 1.65 m, the square is 2.7225, giving about 50.4 kg to 67.8 kg. This range is a general reference point, not a personal target." },
    ],
  },
  "/gst-calculator": {
    route: "/gst-calculator",
    name: "GST Calculator",
    intro: [
      "Goods and Services Tax is added on top of the price of most goods and services in India. This calculator takes a Base Amount in rupees, lets you choose a GST Rate from a drop-down, and then shows the GST Amount and the Total Amount you would pay when the tax is added to the base price.",
      "Shopkeepers, freelancers and small business owners use it to prepare invoices, and buyers use it to check that a bill adds up. Working out the tax by hand is easy to get wrong when amounts have paise, so a quick check helps. The calculation takes place in your browser and nothing you enter is sent to a server.",
    ],
    howItWorks: [
      "The calculator treats the amount you enter as exclusive of GST. The formulas are GST Amount = Base Amount x Rate / 100 and Total Amount = Base Amount + GST Amount. Each value is rounded to two decimals and displayed with Indian digit grouping. There is no reverse mode, so it cannot start from a price that already includes GST.",
      "If you do have a GST-inclusive price, you can extract the tax yourself: Base = Inclusive Price x 100 / (100 + Rate), and GST = Inclusive Price minus Base. The drop-down offers 5, 12, 18 and 28 percent. GST on intra-state supplies is usually split equally between central and state tax (CGST and SGST), so at 18 percent each half is 9 percent, but this page shows the combined figure only.",
    ],
    steps: [
      "Enter the pre-tax price in the Base Amount (rupees) field. Paise are accepted, for example 1499.50.",
      "Open the GST Rate menu and choose the slab that applies to your goods or service. It starts at 18 percent.",
      "Press Calculate to see Base Amount, GST Amount with the rate shown, and the highlighted Total Amount including GST.",
      "To check another item or rate, change the fields and press Calculate again.",
      "Press Reset to empty the amount and put the rate back to 18 percent.",
    ],
    example: {
      title: "25,000 rupee service at 18 percent",
      text: "Base Amount = 25,000. GST Rate = 18. GST Amount = 25,000 x 18 / 100 = 4,500. Total Amount = 25,000 + 4,500 = 29,500, shown as 29,500 rupees in Indian grouping. Split into CGST and SGST for an intra-state sale, that is 2,250 each. To verify in reverse, take the total and divide by 1.18: 29,500 / 1.18 = 25,000, which recovers the base. A smaller check at 28 percent on 1,000 rupees gives 280 rupees of GST and a total of 1,280.",
    },
    useCases: [
      { title: "Preparing invoices", text: "Work out the tax line and invoice total for a quotation before you enter it into your billing software." },
      { title: "Verifying a bill", text: "Compare the GST printed on a restaurant, repair or purchase bill against the percentage you expect." },
      { title: "Pricing decisions", text: "Decide the pre-tax price you need so that the final price a customer sees lands on a round number." },
    ],
    tips: [
      "Confirm that your figure is pre-tax. If the price already includes GST, using this page directly will add the tax a second time.",
      "Find the correct rate for your item in the official GST rate notifications. Product classification, not intuition, decides the slab.",
      "For intra-state sales, show CGST and SGST as two equal halves on the invoice. For inter-state sales the full amount is IGST.",
      "Keep two decimals when entering amounts and round only the final invoice total, as your accounting practice requires.",
    ],
    limitations: "The calculator adds GST to an exclusive price only and offers four fixed rates. GST rate slabs are revised from time to time by the GST Council, and some items are exempt, zero-rated, charged at special rates or subject to additional cess, none of which are available here. Verify the current rate on the official GST portal. The output is for estimation, not tax advice.",
    faqs: [
      { question: "What is the difference between GST-inclusive and exclusive prices?", answer: "An exclusive price is before tax, and the tax is added on top. An inclusive price already contains the tax. This page assumes exclusive. For inclusive prices, divide by one plus the rate (for example 1.18) to find the base, then subtract to get GST." },
      { question: "How do I find the GST rate for my product?", answer: "Look up the item's HSN code for goods or SAC code for services, then check the current rate schedule on the official GST website or ask your accountant. Rates change, so avoid relying on an old invoice or memory." },
      { question: "What are CGST, SGST and IGST?", answer: "For a sale within one state, the tax is split into Central GST and State GST, each normally half of the total rate. For a sale between states, a single Integrated GST (IGST) equal to the full rate is charged instead." },
      { question: "Can I use this to calculate GST on a discount?", answer: "Yes, if you first apply the discount. Enter the discounted pre-tax price as the Base Amount. GST is generally charged on the transaction value after trade discounts, but check the rules for your specific case." },
      { question: "Why does my invoice total differ by a few paise?", answer: "Invoicing software often rounds each line item's tax separately, while this page rounds once for the whole amount. When many lines are involved, the sum of rounded lines can differ by a few paise from a single calculation." },
    ],
  },
  "/mortgage-calculator": {
    route: "/mortgage-calculator",
    name: "Mortgage Calculator",
    intro: [
      "A mortgage, or home loan, is repaid in equal monthly instalments over many years. This calculator starts from the Property Price and your Down Payment, works out the amount to borrow, and then shows the Monthly Payment, the Loan Amount, the Total Interest and the Total Payment including interest, using the Annual Interest Rate and Loan Tenure in years you supply.",
      "It is aimed at first-time buyers and anyone comparing a larger down payment with a longer loan. Seeing the interest bill alongside the monthly figure is often the most sobering part of the exercise. A button labelled Auto 20% fills the down payment with one fifth of the price. All calculations run in your browser and nothing is stored.",
    ],
    howItWorks: [
      "The amount borrowed is L = Property Price - Down Payment. The monthly payment uses the reducing-balance formula: M = L x r x (1 + r)^n / ((1 + r)^n - 1). In this expression r is the monthly rate (annual percent divided by 100, then by 12) and n is the number of monthly payments (tenure in years x 12). If the rate is zero, the payment is simply L / n. A down payment larger than the price is rejected with a message.",
      "Total Payment is M x n and Total Interest is Total Payment minus L. Every figure is rounded to two decimals and shown in rupees with Indian digit grouping. The model assumes payments at the end of each month, a rate that stays fixed for the entire tenure, and no extra charges. Stamp duty, registration, insurance and processing fees are not included, so the actual cost of buying a home is higher than the numbers shown.",
    ],
    steps: [
      "Enter the full Property Price in rupees, for example 5000000 for fifty lakh.",
      "Type your Down Payment, or press the Auto 20% button next to it to fill in one fifth of the price.",
      "Enter the Annual Interest Rate as a percentage and the Loan Tenure in years. Decimals such as 7.5 and 12.5 are accepted.",
      "Press Calculate to see the Monthly Payment, Loan Amount, Total Interest and Total Payment.",
      "Adjust the down payment, rate or tenure and calculate again to compare scenarios, then use Reset to clear everything.",
    ],
    example: {
      title: "50 lakh property, 10 lakh down, 7.5 percent for 20 years",
      text: "Property Price = 5,000,000 and Down Payment = 1,000,000, so L = 4,000,000. Monthly rate r = 7.5 / 100 / 12 = 0.00625 and n = 20 x 12 = 240. Growth term (1.00625)^240 = 4.460817. M = 4,000,000 x 0.00625 x 4.460817 / 3.460817 = 25,000 x 1.288938 = 32,223.73 rupees. Total Payment = 32,223.73 x 240 = 7,733,694.66. Total Interest = 7,733,694.66 - 4,000,000 = 3,733,694.66, which is more than 93 percent of the amount borrowed. In month one, interest alone is 4,000,000 x 0.00625 = 25,000, so only about 7,224 of the first payment reduces the debt.",
    },
    useCases: [
      { title: "Testing affordability", text: "Check whether the monthly payment for a chosen property fits comfortably within your household budget before visiting lenders." },
      { title: "Down payment trade-offs", text: "Compare 10, 20 and 30 percent down to see how each step cuts the loan, the monthly payment and the interest total." },
      { title: "Tenure comparison", text: "Compare 15 and 20 years. For the example above, 15 years raises the payment to about 37,080 but cuts total interest by roughly 10.6 lakh." },
    ],
    tips: [
      "Budget for costs beyond the loan. Registration, stamp duty, brokerage, insurance and moving costs usually have to be paid in cash and are not in this result.",
      "Try a rate one or two points above today's offer. If you have a floating-rate loan, your payment may rise, and knowing by how much is prudent.",
      "Use the Total Interest figure to compare tenures, not just the payment. A longer term feels cheaper monthly but costs more overall.",
      "Press Auto 20% before changing the price, or it will use the price at that moment. Edit the down payment manually if it needs to differ.",
    ],
    limitations: "This is a simplified repayment estimate for a fixed-rate loan. It ignores property tax, home insurance, processing and legal fees, prepayments, rate resets on floating loans, and tax benefits or deductions that may apply in your case. The currency is fixed to the rupee. Lenders may calculate differently, so use it for comparison, not as a loan offer or financial advice.",
    faqs: [
      { question: "How much down payment should I make?", answer: "There is no universal answer. Lenders often require a minimum share of the price, and a larger down payment lowers both the monthly payment and total interest. Balance that against keeping enough savings for emergencies and moving costs." },
      { question: "Does this calculator use a fixed or floating rate?", answer: "It uses one fixed rate for the whole tenure. If your loan floats with a benchmark, the real payment or tenure will move when the rate changes. You can approximate this by calculating again with the new rate and the remaining balance." },
      { question: "Why is the total interest so high compared with the loan?", answer: "Interest accrues monthly on the outstanding balance over many years. With 4,000,000 at 7.5 percent for 20 years, interest is about 3.73 million. Shortening the tenure or paying extra principal early reduces it substantially." },
      { question: "What happens if I pay extra towards the principal?", answer: "Extra principal reduces the outstanding balance, so future interest is lower and the loan ends sooner or the instalment shrinks, depending on the lender. This calculator does not model prepayment, but you can rerun it with the reduced balance." },
      { question: "Why is my bank's EMI slightly different?", answer: "Banks may begin charging interest from the disbursal date, disburse in stages, round instalments, or use a slightly different rate than the quote. The underlying formula is the same, so the figure should be close but is rarely identical." },
    ],
  },
  "/ppp-calculator": {
    route: "/ppp-calculator",
    name: "PPP Calculator",
    intro: [
      "Purchasing power parity, or PPP, compares currencies by what they can buy rather than by their market exchange rate. This page converts an Amount from a From Currency to a To Currency using an Exchange Rate you type in, and can optionally apply an Inflation Rate percentage to give a second, adjusted figure.",
      "It helps when you compare a salary, a budget or a price across countries, for example thinking about relocating from the United States to India, or sizing a freelance rate for clients abroad. You supply the rate yourself, which keeps the page free of live-data assumptions. All arithmetic happens locally in your browser.",
    ],
    howItWorks: [
      "The calculation is deliberately simple. Converted Amount = Amount x Exchange Rate, where the rate means 1 unit of the From Currency equals this many units of the To Currency. If you enter an Inflation Rate above zero, the PPP Adjusted figure is Converted Amount x (1 + Inflation / 100). Both results are rounded to two decimals. The currency drop-downs only label the output, they do not fetch or change any rate.",
      "That makes the quality of the answer depend on the rate you enter. A market rate gives an ordinary currency conversion. A PPP conversion factor, such as those published by the World Bank, OECD or IMF, shows how many local units are needed to buy what one dollar buys in the United States. Multiplying by that factor gives a cost-of-living comparison. Check the current official figures, because they are revised regularly.",
    ],
    steps: [
      "Enter the Amount you want to convert, such as 1000 or a monthly salary.",
      "Select the From Currency and To Currency from the lists. Ten currencies are offered, including USD, EUR, GBP, JPY and INR.",
      "Type the Exchange Rate for 1 unit of the From Currency in the To Currency. Use a PPP conversion factor if you want a purchasing-power comparison.",
      "Optionally add an Inflation Rate in percent if you want a second figure marked up for price growth.",
      "Press Calculate to see the original amount, the exchange-rate conversion and, if applicable, the inflation-adjusted amount.",
    ],
    example: {
      title: "100 US dollars to rupees at 83.5 with 5.5 percent inflation",
      text: "Inputs: Amount = 100 USD, To Currency = INR, Exchange Rate = 83.5, Inflation Rate = 5.5. Converted Amount = 100 x 83.5 = 8,350 INR. Inflation multiplier = 1 + 5.5 / 100 = 1.055. PPP Adjusted = 8,350 x 1.055 = 8,809.25 INR, which is 459.25 rupees above the plain conversion. To see the PPP idea itself, imagine a hypothetical PPP factor of 22.5 rupees per dollar. The same 100 dollars of purchasing power would then correspond to 2,250 rupees of local spending, and the market rate of 83.5 is about 3.7 times that factor.",
    },
    useCases: [
      { title: "Comparing salaries across countries", text: "Convert an offer with a PPP factor to judge what the pay would buy locally, not just what it equals at the market rate." },
      { title: "Pricing for international clients", text: "Estimate a fair fee in a client's currency by looking at both the market conversion and a cost-of-living view." },
      { title: "Study and economics exercises", text: "Demonstrate the gap between market exchange rates and purchasing power with real published figures." },
    ],
    tips: [
      "State where your rate came from. A market rate, a bank rate and a PPP factor answer different questions, so label results to avoid mixing them.",
      "Use the same year for every figure. Mixing a current market rate with an older PPP factor gives a misleading comparison.",
      "Leave Inflation blank unless you have a reason to use it. The default of zero hides the adjusted card and gives a clean conversion.",
      "Round conclusions sensibly. PPP estimates rest on baskets of goods and averages, so differences of a few percent are noise.",
    ],
    limitations: "This tool does not fetch live exchange rates or official PPP data, and it does not derive a PPP factor from prices. The inflation adjustment is a simple percentage markup, not a full price-level model. PPP comparisons depend on the basket of goods used and vary by city and lifestyle. Treat the output as a rough illustration, not economic or financial advice.",
    faqs: [
      { question: "What does PPP actually mean?", answer: "Purchasing power parity is the idea that a given basket of goods should cost the same in different countries once converted into a common currency. A PPP rate is the conversion that would make the basket's price equal, which measures cost of living instead of market value." },
      { question: "Why does PPP differ from the market exchange rate?", answer: "Market rates respond to trade, capital flows, interest rates and sentiment. Many everyday services, like haircuts or rent, are local and cheaper where wages are lower. PPP captures that gap, so poorer economies usually have a PPP rate that is stronger than their market rate." },
      { question: "Where can I find a PPP conversion factor?", answer: "The World Bank, the OECD and the IMF publish PPP conversion factors by country and year. They are listed as local currency units per international dollar. Always check the current official release and the base year before using a number." },
      { question: "How does the inflation field change the answer?", answer: "It multiplies the converted amount by one plus the percentage, so 5.5 percent adds 5.5 percent to the result. It is a plain markup, useful for projecting a price one year forward, but not a formal PPP model." },
      { question: "Is this the same as a currency converter?", answer: "With a market rate entered, yes, it behaves like a basic converter. The difference is purpose: because you supply the rate, you can use a PPP factor to compare living costs. The page itself does not know which kind of rate you entered." },
    ],
  },
};
