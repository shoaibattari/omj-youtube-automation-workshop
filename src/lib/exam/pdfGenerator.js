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
 * Fits image dimensions inside a bounding box preserving aspect ratio.
 */
function fitInsideBox(imgWidth, imgHeight, maxBoxWidth, maxBoxHeight) {
  const scale = Math.min(maxBoxWidth / imgWidth, maxBoxHeight / imgHeight);
  return {
    width: imgWidth * scale,
    height: imgHeight * scale,
  };
}

/**
 * Generates an official OMJ Batch 2 Final Test Paper PDF
 * with student details, assigned niche, assigned topic,
 * AND Page 2 Official Character Reference Sheet.
 *
 * @param {Object} params
 * @param {string} params.studentName - Full student name
 * @param {string} params.rollNumber - Official Roll Number / Participant ID
 * @param {string} params.nicheName - Assigned niche title
 * @param {string} params.topicTitle - Assigned topic title
 * @param {string} [params.setCode] - Assigned set code (A, B, C, D)
 * @param {string} [params.characterName] - Name of assigned character
 * @param {Array<string>} [params.characterImages] - Paths or urls to character images
 * @returns {Promise<Uint8Array>} PDF byte array
 */
export async function generateTestPaperPdf({
  studentName,
  rollNumber,
  nicheName,
  topicTitle,
  setCode = "A",
  characterName,
  characterImages = [],
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
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

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

  // 3. Group Name is strictly BLANK as instructed

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
  const maxTopicLineWidth = boxWidth - 24;

  let topicFontSize = 13.5;
  let lines = wrapText(topicTitle || "", boldFont, topicFontSize, maxTopicLineWidth);

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

  // ==========================================
  // PAGE 2: Official Character Visual Reference Sheet
  // ==========================================
  const effectiveCode = String(setCode || "A").toUpperCase();
  const charLabel = characterName || `Character ${effectiveCode}`;
  const page2 = pdfDoc.addPage([790.5, 1119]);
  const p2Width = 790.5;
  const p2Height = 1119;

  // Header Box
  page2.drawRectangle({
    x: 40,
    y: p2Height - 130,
    width: p2Width - 80,
    height: 90,
    color: rgb(0.04, 0.07, 0.13),
    borderColor: rgb(0.85, 0.65, 0.13),
    borderWidth: 1.5,
  });

  page2.drawText("THE OKHAI MEMON JAMAT (OMJ) — SOCIAL WELFARE COMMITTEE", {
    x: 55,
    y: p2Height - 65,
    size: 13,
    font: boldFont,
    color: rgb(0.95, 0.78, 0.25),
  });

  page2.drawText("Fundamentals of YouTube Automation — Batch 2 | Final Practical Examination", {
    x: 55,
    y: p2Height - 85,
    size: 11,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page2.drawText(`APPENDIX: OFFICIAL CHARACTER REFERENCE SHEET — ${charLabel.toUpperCase()}`, {
    x: 55,
    y: p2Height - 105,
    size: 11,
    font: boldFont,
    color: rgb(0.3, 0.85, 0.55),
  });

  page2.drawText(
    `Candidate: ${cleanStudentName}  |  Roll Number: ${cleanRollNumber}  |  Assigned Niche: ${rawNiche}`,
    {
      x: 55,
      y: p2Height - 122,
      size: 9.5,
      font: boldFont,
      color: rgb(0.8, 0.85, 0.9),
    }
  );

  // Instructions Banner
  page2.drawRectangle({
    x: 40,
    y: p2Height - 195,
    width: p2Width - 80,
    height: 52,
    color: rgb(0.96, 0.97, 0.99),
    borderColor: rgb(0.8, 0.85, 0.9),
    borderWidth: 1,
  });

  page2.drawText("PRACTICAL USAGE INSTRUCTIONS:", {
    x: 55,
    y: p2Height - 158,
    size: 9.5,
    font: boldFont,
    color: rgb(0.1, 0.15, 0.25),
  });

  page2.drawText(
    "1. Use this assigned character model sheet in your 2D animation video, scene storyboarding, and YouTube thumbnail design.",
    {
      x: 55,
      y: p2Height - 173,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.35),
    }
  );

  page2.drawText(
    "2. The 3 angles/poses below represent your channel protagonist. Download raw high-res assets from the examination portal.",
    {
      x: 55,
      y: p2Height - 186,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.35),
    }
  );

  // 3 Character Image Cards
  const cardWidth = 223.5;
  const cardHeight = 450;
  const cardY = p2Height - 665;

  for (let i = 1; i <= 3; i++) {
    const cardX = 40 + (i - 1) * (cardWidth + 20);

    // Card background & border
    page2.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      color: rgb(0.98, 0.98, 0.99),
      borderColor: rgb(0.82, 0.85, 0.9),
      borderWidth: 1,
    });

    // Label Header Bar inside Card
    page2.drawRectangle({
      x: cardX,
      y: cardY + cardHeight - 28,
      width: cardWidth,
      height: 28,
      color: rgb(0.92, 0.94, 0.97),
    });

    page2.drawText(`Visual Asset / Pose ${i}`, {
      x: cardX + 12,
      y: cardY + cardHeight - 19,
      size: 10,
      font: boldFont,
      color: rgb(0.12, 0.18, 0.32),
    });

    // Look for image file on disk
    let diskImgPath = path.join(
      process.cwd(),
      "public",
      "characters",
      effectiveCode,
      `character-${effectiveCode.toLowerCase()}-${i}.jpeg`
    );

    if (!fs.existsSync(diskImgPath)) {
      // Fallback check in characterImages array if provided
      if (characterImages[i - 1]) {
        const rel = characterImages[i - 1].replace(/^\//, "");
        diskImgPath = path.join(process.cwd(), "public", rel);
      }
    }

    if (fs.existsSync(diskImgPath)) {
      try {
        const imgBytes = fs.readFileSync(diskImgPath);
        const img = await pdfDoc.embedJpg(imgBytes);
        const fit = fitInsideBox(img.width, img.height, cardWidth - 16, cardHeight - 44);
        const imgX = cardX + (cardWidth - fit.width) / 2;
        const imgY = cardY + 8 + (cardHeight - 44 - fit.height) / 2;

        page2.drawImage(img, {
          x: imgX,
          y: imgY,
          width: fit.width,
          height: fit.height,
        });
      } catch (err) {
        console.error("Failed to embed character image in PDF:", err);
      }
    }
  }

  // Assessment Rubric Checklist Box
  page2.drawRectangle({
    x: 40,
    y: 75,
    width: p2Width - 80,
    height: 140,
    color: rgb(0.97, 0.98, 1),
    borderColor: rgb(0.8, 0.85, 0.9),
    borderWidth: 1,
  });

  page2.drawText("PRACTICAL ASSESSMENT RUBRIC & CHARACTER INTEGRATION (150 TOTAL MARKS):", {
    x: 55,
    y: 195,
    size: 10,
    font: boldFont,
    color: rgb(0.1, 0.15, 0.3),
  });

  const rubricItems = [
    "• Channel Niche & Concept (25 Marks): Correct integration of assigned niche and target audience setup.",
    "• Scripting & Storytelling (35 Marks): Cohesive narrative, hook, engagement, and character alignment.",
    "• 2D Animation & Video Editing (50 Marks): Integration of assigned character poses, transitions, sound & timing.",
    "• Thumbnail Design & SEO (40 Marks): High-CTR thumbnail featuring character face, title & description optimization.",
  ];

  rubricItems.forEach((item, idx) => {
    page2.drawText(item, {
      x: 55,
      y: 172 - idx * 20,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.35),
    });
  });

  // Footer
  page2.drawText(
    "Official Examination Document • The Okhai Memon Jamat (OMJ) Social Welfare Committee • Sunday, 8 November 2026",
    {
      x: 55,
      y: 45,
      size: 8.5,
      font: regularFont,
      color: rgb(0.5, 0.55, 0.65),
    }
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
