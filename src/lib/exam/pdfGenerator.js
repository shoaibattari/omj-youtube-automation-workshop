import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * Wraps text into lines that do not exceed maxWidth points.
 */
function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0] || "";

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const candidate = `${currentLine} ${word}`;
    const width = font.widthOfTextAtSize(candidate, fontSize);
    if (width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Generates an official OMJ Batch 2 Final Test Paper PDF
 * with student details, assigned niche, and assigned topic.
 *
 * Coordinates are calibrated to match the printed lines of
 * public/templates/Batch_2_Blank_Test_Paper(1).pdf:
 * - Student Name line is at y = 861 -> text baseline y = 863
 * - Roll Number line is at y = 827  -> text baseline y = 829
 * - Group Name line is at y = 793   -> stays strictly BLANK
 * - Niche line is at y = 759        -> text baseline y = 761
 * - Topic Box is [x: 405 to 735, y: 758 to 841] -> centered at x = 570, y = 799
 *
 * @param {Object} params
 * @param {string} params.studentName - Full student name
 * @param {string} params.rollNumber - Official Roll Number / Participant ID
 * @param {string} params.nicheName - Assigned niche title
 * @param {string} params.topicTitle - Assigned topic title
 * @returns {Promise<Uint8Array>} PDF byte array
 */
export async function generateTestPaperPdf({
  studentName,
  rollNumber,
  nicheName,
  topicTitle,
}) {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "Batch_2_Blank_Test_Paper(1).pdf"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Official test paper template not found at: ${templatePath}`);
  }

  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const cleanStudentName = String(studentName || "Student").trim();
  const cleanRollNumber = String(rollNumber || "").trim();

  // Set PDF metadata so browser tab title displays student name and roll number instead of template name
  pdfDoc.setTitle(`${cleanStudentName} - ${cleanRollNumber} - Final Practical Assessment`);
  pdfDoc.setAuthor("The Okhai Memon Jamat (OMJ) - Social Welfare Committee");
  pdfDoc.setSubject(`Fundamentals of YouTube Automation Batch 2 - Roll ${cleanRollNumber}`);
  pdfDoc.setProducer("The Okhai Memon Jamat (OMJ)");
  pdfDoc.setCreator("OMJ Examination System");

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const black = rgb(0, 0, 0);

  // Left text column indentation (starts just after the colons)
  const leftColX = 165;
  const maxLeftWidth = 260;

  // 1. Student Name
  let nameFontSize = 14;
  const rawName = String(studentName || "").trim();
  let nameWidth = boldFont.widthOfTextAtSize(rawName, nameFontSize);
  if (nameWidth > maxLeftWidth) {
    nameFontSize = Math.max(9, (maxLeftWidth / nameWidth) * nameFontSize);
  }
  page.drawText(rawName, {
    x: leftColX,
    y: 863,
    size: nameFontSize,
    font: boldFont,
    color: black,
  });

  // 2. Roll Number
  const rawRoll = String(rollNumber || "").trim();
  page.drawText(rawRoll, {
    x: leftColX,
    y: 829,
    size: 14,
    font: boldFont,
    color: black,
  });

  // 3. Group Name is strictly BLANK as instructed:
  // "Group Name = BLANK. Do not generate a group name."

  // 4. Niche
  let nicheFontSize = 13.5;
  const rawNiche = String(nicheName || "").trim();
  let nicheWidth = boldFont.widthOfTextAtSize(rawNiche, nicheFontSize);
  if (nicheWidth > maxLeftWidth) {
    nicheFontSize = Math.max(9, (maxLeftWidth / nicheWidth) * nicheFontSize);
  }
  page.drawText(rawNiche, {
    x: leftColX,
    y: 761,
    size: nicheFontSize,
    font: boldFont,
    color: black,
  });

  // 5. Assigned Topic / Question in Dashed Box
  // Box boundary: x between 405 and 735 (width 330), y between 758 and 841 (center y = 799)
  const boxLeft = 405;
  const boxWidth = 330;
  const boxCenterY = 799;
  const maxTopicLineWidth = boxWidth - 24; // 306 pt safe width with comfortable padding

  let topicFontSize = 13.5;
  let lines = wrapText(topicTitle || "", boldFont, topicFontSize, maxTopicLineWidth);

  // If topic wraps into 3 or more lines, adjust font size so it fits elegantly
  if (lines.length > 2) {
    topicFontSize = 11.5;
    lines = wrapText(topicTitle || "", boldFont, topicFontSize, maxTopicLineWidth);
  }

  const lineHeight = topicFontSize * 1.35;
  const totalHeight = lines.length * lineHeight;
  const startY = boxCenterY + totalHeight / 2 - topicFontSize;

  lines.forEach((line, index) => {
    const lineWidth = boldFont.widthOfTextAtSize(line, topicFontSize);
    const lineX = boxLeft + (boxWidth - lineWidth) / 2;
    page.drawText(line, {
      x: lineX,
      y: startY - index * lineHeight,
      size: topicFontSize,
      font: boldFont,
      color: black,
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
