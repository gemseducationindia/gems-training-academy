/*
  12 Nov 2026 CRM meeting: fees and discounts at enquiry stage, the approval route,
  the commitment email, and recording payments by hand until MyClassBoard is linked.
  Loaded after content.js, content-extra.js and admin.js; patches them in place.
*/
(function () {
  const C = window.GCT_CONTENT;
  const A = window.GTA_ADMIN;
  const mod = (id) => C.MODULES.find((m) => m.id === id);
  const lesson = (m, id) => m.lessons.find((l) => l.id === id);
  const after = (m, id, ...ls) => { const i = m.lessons.findIndex((l) => l.id === id); m.lessons.splice(i + 1, 0, ...ls); };
  const before = (m, id, ...ls) => { const i = m.lessons.findIndex((l) => l.id === id); m.lessons.splice(i, 0, ...ls); };

  /* ---------- Your CRM home: how leads arrive ---------- */
  const basics = mod("crm-basics");
  const arrive = basics && lesson(basics, "arrive");
  if (arrive) arrive.steps = [
    "Leads from <b>Meta, Google, the website, QR codes, WhatsApp, billboards and events</b> come straight into the CRM.",
    "The <b>central team</b> calls first and qualifies the family. Then the lead is handed to the <b>school counsellors</b>, shared out equally (round robin).",
    "Every new lead starts with the status <b>New</b>. It stays an <b>Enquiry</b> until you start the application. Then it becomes an <b>Application</b>."
  ];

  /* ---------- After the visit: fees, discount and approval ---------- */
  const fin = mod("financials");
  fin.summary = "After Visit Done, while it is still an enquiry: enter all three fees with discount and reason, the discount goes to the principal then finance, then the commitment email. Must be 100% right.";
  fin.minutes = 25;

  const order = lesson(fin, "order");
  Object.assign(order, {
    title: "What happens after the visit",
    intro: "Watch the whole journey once: one family from Visit Done to Enrolled. The same film is in the Lead Journey Video tab.",
    video: "lead-journey",
    steps: [
      "Status is <b>Visit Done</b>. The lead is still an <b>enquiry</b>. This is when the money is agreed.",
      "Check the child: <b>grade, curriculum and academic year</b>. They decide which fees load.",
      "Data tab → <b>Fees</b>: enter the discount and reason for <b>all three fees in one go</b>: application fee, blocking fee and tuition.",
      "The discount goes for <b>approval</b>: school principal first, then finance.",
      "Start the application while approval is pending. Once approved, send the <b>commitment email</b>.",
      "Payments come through MyClassBoard. Record each one in the CRM <b>by hand</b> until the two systems are linked."
    ],
    warn: "Never add or change a discount after Start Application. Never use Microsoft Forms for an enrolment: everything goes in the CRM.",
    check: { type: "order", q: "Put the journey in order.", items: ["Visit Done", "Enter all three fees with reasons", "Approval: principal, then finance", "Commitment email to the parent", "Record each payment", "Enrolled"], explain: "Visit Done → fees → approval → commitment email → payments → Enrolled. The application can be started while approval is pending." }
  });

  const why = lesson(fin, "why");
  Object.assign(why, {
    intro: "Visits can carry a small error. Money cannot: these are the amounts GEMS commits to the parent.",
    steps: [
      "The discount and its reason go in the <b>Data</b> tab <b>at enquiry stage</b>, before Start Application.",
      "Later, when a payment comes in, the pop-up asks for the <b>exact amount received</b>.",
      "The two must tell the same story: the amount received equals the <b>Net</b> in the Data tab."
    ],
    warn: "Wrong numbers here mean wrong revenue reports for the whole of GEMS, and a wrong promise to a parent. Be 100% accurate.",
    check: { type: "single", q: "When do you enter the discount?", options: ["At enquiry stage, before Start Application", "After the blocking fee is paid", "At enrolment"], answer: 0, explain: "Enquiry stage, all three fees in one go." }
  });

  const tuition = lesson(fin, "tuition");
  Object.assign(tuition, {
    title: "Enter all three fees in one go",
    intro: "Watch: application fee, blocking fee and tuition, each with its discount and reason.",
    video: "j1-all-three-fees",
    steps: [
      "Open the enquiry → <b>Data</b> tab → <b>Fees</b>. There is one row for every fee.",
      "Check <b>Published</b> is this year's fee for the right grade. If it looks wrong (an old figure), stop and tell the CRM admin before you save.",
      "<b>Application fee:</b> no discount? Leave it at ₹0.",
      "<b>Blocking fee:</b> type the rupees off in <b>Discount</b>, then pick the <b>Reason</b>.",
      "<b>Tuition:</b> type the rupees off (for example 10% of tuition), then pick the <b>Reason</b>.",
      "Each row with a discount now says <b>Waiting</b>. Do all three now, while it is an enquiry."
    ],
    remember: "Two children = two leads. The sibling discount goes on the child who gets it, in that child's own lead. Leave the compulsory rows ticked in Take.",
    check: { type: "hotspot", q: "Tap where you choose the discount Reason for the Tuition row.", img: "assets/img/crm-fee-grid-crop.jpg", box: [69.5, 53, 82, 61], explain: "The Reason column, on the same row as the discount." }
  });

  after(fin, "blocking",
    {
      id: "approval",
      title: "Who approves your discount",
      intro: "Watch: a discount is not yours to give. Two people have to agree.",
      video: "j2-approval-route",
      steps: [
        "Open <b>Discount approvals</b> under the fees. One line per fee per approver.",
        "<b>Level 1: the school principal.</b> Then <b>Level 2: finance</b>. Any one of the finance team can answer.",
        "<b>Coimbatore</b> has no principal, so its discounts go straight to finance.",
        "While it waits, the row says <b>Waiting</b>, then <b>With finance</b>. The <b>Net does not move</b>: the family still owes the full price.",
        "Only when finance approves does the Net come down. Then you can send the commitment email."
      ],
      remember: "Parent asks for more later? A bigger discount is a fresh decision: it goes for approval again.",
      check: { type: "single", q: "The principal has approved the tuition discount, but finance has not. What does the family owe?", options: ["Still the full published tuition", "The discounted tuition", "Nothing yet"], answer: 0, explain: "The Net only comes down when both have approved." }
    },
    {
      id: "approver",
      title: "What the approver sees",
      intro: "Watch: the same family, from the principal's and finance's side.",
      video: "approver-view",
      steps: [
        "The approver opens the family. At the top: <b>Approve</b> or <b>Reject</b> for each fee waiting on them.",
        "<b>Reject</b> asks for a reason. The counsellor sees it on the lead.",
        "After the principal approves, the row says <b>With finance</b>. After finance approves, the price comes down.",
        "Every decision is kept in the history: who decided, what, and when."
      ],
      check: { type: "single", q: "Who approves first?", options: ["The school principal (finance first in Coimbatore)", "Finance, always", "The counsellor"], answer: 0, explain: "Level 1 principal, Level 2 finance. Coimbatore goes straight to finance." }
    },
    {
      id: "commitment",
      title: "Send the commitment email",
      intro: "Watch: once the discount is approved, confirm the exact amounts to the parent.",
      video: "j3-commitment-email",
      steps: [
        "Wait until <b>both</b> approvals are in and the Net has come down.",
        "Open <b>Emails</b> → <b>New Email</b> on the family's record.",
        "Write the exact amounts: <b>application fee, blocking fee and tuition</b> for the year. Use the commitment template once it is in the CRM.",
        "This is what the family has agreed to pay, and nothing else. Check every number against the Net before you send."
      ],
      warn: "Never send it before approval: the amounts may still change.",
      check: { type: "single", q: "When do you send the commitment email?", options: ["After the discount is approved", "Right after the visit", "After enrolment"], answer: 0, explain: "Only approved amounts are promised to the parent." }
    }
  );

  const practice = lesson(fin, "practice");
  Object.assign(practice, {
    steps: [
      "Published: application <b>₹5,000</b>, blocking <b>₹30,000</b>, tuition <b>₹1,20,000</b>.",
      "Application fee: no discount → Net <b>₹5,000</b>.",
      "Blocking fee: ₹15,000 off (management decision) → Net <b>₹15,000</b>.",
      "Tuition: 10% sibling → 1,20,000 × 10 ÷ 100 = <b>₹12,000</b> off → Net <b>₹1,08,000</b>."
    ],
    check: { type: "number", q: "Tuition is ₹1,50,000 with a 10% sibling discount. What discount (₹) do you enter?", answer: 15000, prefix: "₹", explain: "1,50,000 × 10 ÷ 100 = ₹15,000, with reason Sibling." }
  });

  fin.bank.push(
    { type: "single", q: "Who approves a discount at most campuses?", options: ["The principal, then finance", "Only the counsellor", "The parent"], answer: 0, explain: "Level 1 principal, Level 2 finance." },
    { type: "single", q: "Where do Coimbatore discounts go?", options: ["Straight to finance", "To the principal only", "Nowhere, no approval"], answer: 0, explain: "Coimbatore has no principal, so finance decides." },
    { type: "single", q: "The family wants a bigger discount after it was approved. What happens?", options: ["The new amount goes for approval again", "It saves straight away", "You change the Net by hand"], answer: 0, explain: "A fresh discount is a fresh decision." },
    { type: "single", q: "Two siblings are joining. How many leads?", options: ["Two, one per child", "One for the family", "None, use a form"], answer: 0, explain: "One lead per child. The sibling discount goes on the child who gets it." },
    { type: "single", q: "A family wants to enrol. Do you use the Microsoft Form?", options: ["No, everything goes in the CRM", "Yes, then the CRM", "Only for siblings"], answer: 0, explain: "No Microsoft Forms. The CRM is the record." },
    { type: "multi", q: "Which fees get a discount and reason checked at enquiry stage? Select all.", options: ["Application fee", "Blocking fee", "Tuition", "Transport only"], answer: [0, 1, 2], explain: "All three, in one go, even when a discount is ₹0." }
  );

  /* ---------- Application to enrolment ---------- */
  const app = mod("application");
  const start = lesson(app, "start");
  if (start) start.remember = "One family, one live record per child. The discount must already be in the Data tab: you can start the application while the approval is pending, but never add a discount after this point.";

  before(app, "appfee", {
    id: "by-hand",
    title: "Payments: MyClassBoard and the CRM",
    intro: "Watch: until MyClassBoard and the CRM are linked, you record every payment by hand.",
    video: "j4-record-payments",
    steps: [
      "<b>MyClassBoard</b> sends the parent the payment link and the application form.",
      "When money arrives, open the application in the CRM and click the <b>status</b>.",
      "Choose the payment stage (<b>Application Fee Paid</b> or <b>Blocking Fee Paid</b>). A pop-up opens.",
      "Enter the <b>exact amount received</b>, the <b>date</b> and the <b>transaction reference</b>. Click <b>Save payment</b>."
    ],
    remember: "Once the two systems are linked, these statuses will update by themselves. Until then: click, record, save.",
    check: { type: "single", q: "The parent paid through the MyClassBoard link. What do you do in the CRM?", options: ["Choose the payment status and record amount, date and reference", "Nothing, it updates by itself", "Fill the Microsoft Form"], answer: 0, explain: "Until the link is live, every payment is recorded by hand." }
  });

  const appfee = lesson(app, "appfee");
  if (appfee) {
    appfee.warn = "The amount must equal the Net in the Data tab. If it doesn't, stop: the discount was missed or not approved.";
    appfee.check = { type: "single", q: "The pop-up shows ₹2,000, but the parent paid ₹1,500 after an approved ₹500 waiver. What do you enter?", options: ["₹1,500, the amount actually received", "₹2,000, as shown", "Leave it empty"], answer: 0, explain: "Always the exact amount received. The ₹500 waiver is already in the Data tab from enquiry stage." };
  }
  const blk = lesson(app, "blocking");
  if (blk) blk.warn = "The amount is the Net: published blocking fee minus the approved discount. The discount itself was entered at enquiry stage, never here.";
  const enr = lesson(app, "enrolled");
  if (enr) enr.steps = enr.steps.concat(["Before you mark Enrolled, check the Net amounts in the Data tab match the commitment email."]);
  const offer = lesson(app, "offer");
  if (offer) offer.remember = "This stage may be removed soon. Until then, it is still a step.";

  app.bank = app.bank.filter((q) => !/After recording a lower blocking fee/.test(q.q));
  app.bank.push(
    { type: "single", q: "Until MyClassBoard and the CRM are linked, who updates the payment statuses?", options: ["The counsellor, by hand", "MyClassBoard, automatically", "Finance"], answer: 0, explain: "Click the status, record amount, date, reference, save." },
    { type: "single", q: "Blocking fee is ₹30,000 with an approved ₹10,000 discount. What amount goes in the Blocking Fee Paid pop-up?", options: ["₹20,000", "₹30,000", "₹10,000"], answer: 0, explain: "The Net: 30,000 − 10,000." }
  );

  /* ---------- Admin handbook ---------- */
  const crm = A.SECTIONS.find((s) => s.id === "crm");
  const journey = crm && crm.topics.find((t) => t.id === "journey");
  if (journey) journey.steps = [
    "<b>Enquiry stages:</b> New → Contacted → Visit Scheduled → Visit Done.",
    "<b>After Visit Done, still an enquiry:</b> check grade, curriculum and year, then enter the discount and reason for <b>application fee, blocking fee and tuition</b>, in one go.",
    "<b>Approval:</b> Level 1 school principal, Level 2 finance. Coimbatore goes straight to finance. The Net only comes down after both approve.",
    "<b>Application, in parallel:</b> the counsellor can click <b>Start Application</b> while approval is pending. No discounts are added after this.",
    "<b>Commitment email:</b> after approval, the counsellor emails the parent the exact amounts from the CRM.",
    "<b>Payments:</b> MyClassBoard sends the payment link and form. Until MyClassBoard and the CRM are linked, each payment status is updated by hand (amount, date, reference).",
    "<b>Application stages:</b> Application Submitted → Application Fee Paid → Documents Submitted → Admission Letter Released → Blocking Fee Paid → Enrolled.",
    "Ends: <b>Junk</b> or <b>Lost</b> (enquiry), <b>Waitlisted, Rejected, Withdrawn</b> (application). No Microsoft Forms: everything in the CRM."
  ];
  if (crm && journey) {
    const i = crm.topics.indexOf(journey);
    crm.topics.splice(i + 1, 0, {
      id: "approvals",
      title: "Discount approvals: who, and how",
      intro: "The approver's side of a discount. Watch it before you train principals or answer \"why hasn't my discount gone through?\"",
      video: "approver-view",
      steps: [
        "A saved discount with a reason creates two requests: <b>School</b> (principal) and <b>Finance</b>.",
        "The approver opens the family and sees <b>Approve</b> / <b>Reject</b> for each fee at the top.",
        "Coimbatore: no principal, so finance only.",
        "Until both approve, the row says Waiting or With finance and the Net stays at the full price.",
        "A bigger discount later is a fresh request. Every decision is kept in the history."
      ],
      tip: "Stuck approvals: check Discount approvals on the lead to see which side it is waiting on, then chase that person."
    });
  }
  A.FAQ.push(
    ["\"I added the discount after starting the application.\"", "Discounts belong at enquiry stage. Note the lead ID and amounts and escalate to Dr Jay to correct it; don't try to fix past payments yourself."],
    ["\"The fee grid shows an old tuition figure.\"", "Don't save a discount on it. Note the campus, grade and the figure shown, and escalate: the fee structure needs updating by the developers."],
    ["\"Parents aren't picking up my calls.\"", "The Exotel number may be marked as spam. Check the Exotel Inbox, then swap the number (Exotel admin → Number marked as spam)."],
    ["\"The family enrolled through a Microsoft Form.\"", "Forms are no longer used. Create or update the family in the CRM with fees, discounts and payments."],
    ["\"My discount hasn't gone through.\"", "Open Discount approvals on the lead: it shows whether it is waiting on the principal or finance."]
  );
})();
