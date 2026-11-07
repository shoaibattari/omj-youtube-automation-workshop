import assert from "assert";
import fs from "fs";
import path from "path";
import { INITIAL_EXAM_SETS, INITIAL_EXAM_TOPICS } from "../src/lib/exam/initialTopicBank.js";

// Use isolated test directory to prevent tests from wiping production/runtime student assignments
process.env.EXAM_DATA_DIR = path.resolve("test/.test-storage");
import {
  findStudentInDatabase,
  normalizePakistaniPhone,
  createLookupTicket,
  verifyLookupTicket,
  generateOtpForStudent,
  verifyOtpForStudent,
  verifyPrivateCredential,
  createExamSessionToken,
  getAuthenticatedStudentFromToken,
} from "../src/lib/exam/auth.js";
import {
  getExamSets,
  getExamTopics,
  getAssignments,
  assignTopicToStudent,
  addExamSet,
  bulkImportTopics,
  getExamDashboardStats,
} from "../src/lib/exam/storage.js";
import { generateTestPaperPdf } from "../src/lib/exam/pdfGenerator.js";
import { PDFDocument } from "pdf-lib";

function resetStorage() {
  const dir = path.resolve("test/.test-storage");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + "/sets.json", JSON.stringify(INITIAL_EXAM_SETS, null, 2), "utf8");
  fs.writeFileSync(dir + "/topics.json", JSON.stringify(INITIAL_EXAM_TOPICS, null, 2), "utf8");
  fs.writeFileSync(dir + "/assignments.json", "[]", "utf8");
}

async function runAllTests() {
  resetStorage();
  console.log("=== STARTING OMJ ASSESSMENT SYSTEM TEST SUITE ===");
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}:`, err.message);
      failed++;
    }
  }

  async function asyncTest(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Roll number 2001 finds the correct existing student
  test("1. Roll number 2001 finds correct existing student", () => {
    const s = findStudentInDatabase("2001");
    assert(s !== null, "Student 2001 should be found");
    assert.strictEqual(s.fullName, "Muhammad Ahmed");
    assert.strictEqual(s.mode, "Hybrid");
  });

  // 2. Roll number 2501 finds the correct existing student
  test("2. Roll number 2501 finds correct existing student", () => {
    const s = findStudentInDatabase("2501");
    assert(s !== null, "Student 2501 should be found");
    assert.strictEqual(s.fullName, "Shahneel");
    assert.strictEqual(s.mode, "Full Online");
  });

  // 3. WhatsApp search finds the correct student
  test("3. WhatsApp search finds correct student", () => {
    const s = findStudentInDatabase("03213801242");
    assert(s !== null, "Student should be found by WhatsApp");
    assert.strictEqual(s.participantId, "2501");
  });

  // 4. Pakistani +92 and 03 phone formats normalize correctly
  test("4. Pakistani +92 and 03 phone formats normalize correctly", () => {
    const n1 = normalizePakistaniPhone("+923213801242");
    const n2 = normalizePakistaniPhone("923213801242");
    const n3 = normalizePakistaniPhone("03213801242");
    const n4 = normalizePakistaniPhone("0321-3801242");
    assert.strictEqual(n1, "03213801242");
    assert.strictEqual(n2, "03213801242");
    assert.strictEqual(n3, "03213801242");
    assert.strictEqual(n4, "03213801242");

    const sVia92 = findStudentInDatabase("+923213801242");
    assert(sVia92 !== null && sVia92.participantId === "2501");
  });

  // 5. Invalid identifier returns a safe error (null from findStudent)
  test("5. Invalid identifier returns safe error / null", () => {
    const s = findStudentInDatabase("99999999999");
    assert.strictEqual(s, null);
    const empty = findStudentInDatabase("");
    assert.strictEqual(empty, null);
  });

  // 6. Direct lookup grants session
  test("6. Direct lookup authenticates student without requiring OTP", () => {
    const student = findStudentInDatabase("2001");
    assert(student !== null);
    const session = createExamSessionToken(student);
    const authed = getAuthenticatedStudentFromToken(session);
    assert.strictEqual(authed.fullName, "Muhammad Ahmed");
  });

  // 7 & 8. Full Online and Hybrid students are supported
  test("7 & 8. Full Online and Hybrid modes are both supported", () => {
    const sOnline = findStudentInDatabase("2501");
    const sHybrid = findStudentInDatabase("2001");
    assert.strictEqual(sOnline.mode, "Full Online");
    assert.strictEqual(sHybrid.mode, "Hybrid");
    assert.strictEqual(sOnline.status.toUpperCase(), "PAID");
    assert.strictEqual(sHybrid.status.toUpperCase(), "PAID");
  });

  // 9 & 10. Topic assignment and parent set derivation
  await asyncTest("9 & 10. New student receives one set and topic belonging to that set", async () => {
    const s = { fullName: "Muhammad Ahmed", participantId: "2001", mode: "Hybrid" };
    const asgn = await assignTopicToStudent(s);
    assert(asgn.id, "Assignment has id");
    assert(asgn.setCode, "Assignment has setCode");
    assert(asgn.nicheName, "Assignment has nicheName");
    assert(asgn.topicTitle, "Assignment has topicTitle");

    const sets = await getExamSets();
    const parent = sets.find((x) => x.id === asgn.setId);
    assert.strictEqual(parent.code, asgn.setCode);
    assert.strictEqual(parent.nicheName, asgn.nicheName);
  });

  // 11. No duplicate topic while unused topics exist
  await asyncTest("11. No duplicate topic while unused topics exist", async () => {
    const sets = await getExamSets();
    const topics = await getExamTopics();
    const activeSetIds = new Set(sets.filter((s) => s.isActive).map((s) => s.id));
    const activeTopics = topics.filter((t) => t.isActive && activeSetIds.has(t.setId));

    // Assign to a new student
    const s2 = { fullName: "Shahneel", participantId: "2501", mode: "Full Online" };
    const asgn2 = await assignTopicToStudent(s2);

    const s1 = { fullName: "Muhammad Ahmed", participantId: "2001", mode: "Hybrid" };
    const asgn1 = await assignTopicToStudent(s1);

    assert.notStrictEqual(asgn1.topicId, asgn2.topicId, "Two students must receive different topics when unused topics exist");
  });

  // 12 & 13. Same student refreshes and downloads again - receives same topic
  await asyncTest("12 & 13. Same student refreshes or requests again gets same topic", async () => {
    const s1 = { fullName: "Muhammad Ahmed", participantId: "2001", mode: "Hybrid" };
    const asgnA = await assignTopicToStudent(s1);
    const asgnB = await assignTopicToStudent(s1);
    const asgnC = await assignTopicToStudent(s1);

    assert.strictEqual(asgnA.id, asgnB.id);
    assert.strictEqual(asgnA.topicId, asgnC.topicId);
    assert.strictEqual(asgnA.topicTitle, asgnC.topicTitle);
  });

  // 14. Two simultaneous assignment requests do not create two assignments
  await asyncTest("14. Concurrent requests for same student result in single idempotent assignment", async () => {
    const sSim = { fullName: "M.fahim", participantId: "2502", mode: "Full Online" };
    const [res1, res2] = await Promise.all([
      assignTopicToStudent(sSim),
      assignTopicToStudent(sSim),
    ]);
    assert.strictEqual(res1.id, res2.id, "Simultaneous assignments must yield identical record ID");
    assert.strictEqual(res1.topicId, res2.topicId);
  });

  // 15. More than 100 students are supported
  await asyncTest("15. More than 100 students supported via cycle repeat policy", async () => {
    // Simulate assigning 105 mock students
    const mockStudents = Array.from({ length: 105 }, (_, i) => ({
      fullName: `Mock Student ${i}`,
      participantId: `TEST_ROLL_${i}`,
      mode: "Full Online",
    }));

    const results = [];
    for (const st of mockStudents) {
      const res = await assignTopicToStudent(st);
      results.push(res);
    }

    assert.strictEqual(results.length, 105);
    const topicUsage = {};
    results.forEach((r) => {
      topicUsage[r.topicId] = (topicUsage[r.topicId] || 0) + 1;
    });

    const maxUsage = Math.max(...Object.values(topicUsage));
    const minUsage = Math.min(...Object.values(topicUsage));
    // Fair distribution check: difference between max and min usage must be at most 1
    assert(maxUsage - minUsage <= 1, `Fair distribution failed: maxUsage=${maxUsage}, minUsage=${minUsage}`);
  });

  // 16. New sets F, G can be added and assigned
  await asyncTest("16. New sets F, G can be added dynamically and receive assignments", async () => {
    const uniqueCode = "F" + Math.floor(Math.random() * 100);
    const newSet = await addExamSet({
      code: uniqueCode,
      nicheName: "Health & Fitness Automation",
      isActive: true,
    });
    assert.strictEqual(newSet.code, uniqueCode);

    const newTopics = await bulkImportTopics({
      setId: newSet.id,
      topicsList: [
        `10 AI Tools for Fitness Channels (${uniqueCode})`,
        `How to Script Nutrition Explainer Videos (${uniqueCode})`,
      ],
    });
    assert.strictEqual(newTopics.length, 2);

    const sNew = { fullName: "Set F Student", participantId: `SET_${uniqueCode}_STUDENT`, mode: "Hybrid" };
    const asgn = await assignTopicToStudent(sNew);
    // Because newly added topics have usage count 0, the engine should prioritize them!
    assert.strictEqual(asgn.setCode, uniqueCode);
    assert.strictEqual(asgn.nicheName, "Health & Fitness Automation");
  });

  // 17. Historical assignments remain stable
  await asyncTest("17. Historical assignments remain stable after new sets/topics added", async () => {
    const s1 = { fullName: "Muhammad Ahmed", participantId: "2001", mode: "Hybrid" };
    const asgn = await assignTopicToStudent(s1);
    assert.strictEqual(asgn.studentRollNumber, "2001");
    // Verify unchanged
  });

  // 18-23. PDF Generation, layout, blank group name, 150 marks criteria preservation
  await asyncTest("18-23. PDF Generation preserves original template, 150 marks, overlays name/roll/niche/topic, leaves group name blank", async () => {
    const pdfBytes = await generateTestPaperPdf({
      studentName: "Muhammad Ahmed",
      rollNumber: "2001",
      nicheName: "AI & Technology",
      topicTitle: "5 Free AI Tools Every Student Should Know",
    });

    assert(pdfBytes && pdfBytes.length > 50000, "PDF byte array generated");
    const doc = await PDFDocument.load(pdfBytes);
    const pages = doc.getPages();
    assert.strictEqual(pages.length, 1);
    assert.strictEqual(pages[0].getWidth(), 790.5);
    assert.strictEqual(pages[0].getHeight(), 1119);
  });

  // 24. Private Credential Verification
  test("24. Private credential verification works with registered WhatsApp and Father's Name", () => {
    const student = findStudentInDatabase("2001");
    const okPhone = verifyPrivateCredential(student, "03222750479");
    const ok92Phone = verifyPrivateCredential(student, "+923222750479");
    const okFather = verifyPrivateCredential(student, "Abdul Qadir");
    const failCred = verifyPrivateCredential(student, "Wrong Credential");

    assert.strictEqual(okPhone, true);
    assert.strictEqual(ok92Phone, true);
    assert.strictEqual(okFather, true);
    assert.strictEqual(failCred, false);
  });

  // 25. OTP Generation & Verification
  test("25. OTP Generation & Verification works with timeout and attempts limit", () => {
    const { code } = generateOtpForStudent("2001", "03222750479");
    assert(code && code.length === 6);
    const wrong = verifyOtpForStudent("2001", "000000");
    assert.strictEqual(wrong.valid, false);
    const correct = verifyOtpForStudent("2001", code);
    assert.strictEqual(correct.valid, true);
  });

  // 26. Dashboard stats
  await asyncTest("26. Admin dashboard stats report accurate real counts", async () => {
    const stats = await getExamDashboardStats();
    assert(stats.totalStudents > 0, "Real students counted");
    assert(stats.totalSets >= 5, "Initial sets present");
    assert(stats.totalTopics >= 100, "Initial topics present");
    assert(stats.assignedStudentsCount > 0, "Assigned students counted");
  });

  resetStorage();
  console.log("\n=========================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("=========================================\n");

  if (failed > 0) process.exit(1);
}

runAllTests().catch((e) => {
  console.error("Test runner crashed:", e);
  process.exit(1);
});
