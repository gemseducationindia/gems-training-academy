/* Approver-only training (approver.html): principals / school heads and finance learn to approve discounts.
   Loaded after the other content files; replaces the module list for this page only. */
(function () {
  if (window.GTA_MODE !== "approver") return;
  const C = window.GCT_CONTENT;

  const APPROVE = {
    id: "approve",
    title: "Approving discounts",
    summary: "Your part in the admission: check each discount the counsellor asks for, then approve or reject it in the CRM.",
    minutes: 15,
    lessons: [
      {
        id: "role",
        title: "Your role: no discount without you",
        intro: "Watch: a counsellor cannot give a discount alone. Two people must agree, and you are one of them.",
        video: "j2-approval-route",
        steps: [
          "After the family visits, the counsellor enters the fees in the CRM: the <b>application fee</b>, the <b>Admission Blocking Fee</b> and the <b>tuition fee</b>.",
          "If the family is given a discount, the counsellor types the amount and picks a <b>reason</b>, such as Sibling or Management decision.",
          "Every discount then comes to you for a decision. <b>Level 1</b> is the <b>principal or school head</b>. <b>Level 2</b> is <b>finance</b>.",
          "<b>Coimbatore</b> has no principal, so its discounts go straight to finance.",
          "Until both levels approve, the family still owes the <b>full price</b>. The discounted price only appears after the last approval."
        ],
        remember: "The principal or school head decides first. Finance decides second. Nothing changes for the family until both have said yes.",
        check: { type: "single", q: "Who decides first on a discount at most schools?", options: ["The principal or school head", "Finance", "The counsellor"], answer: 0, explain: "Level 1 is the principal or school head. Level 2 is finance. Coimbatore goes straight to finance." }
      },
      {
        id: "open",
        title: "Open the family and see what was asked",
        intro: "Watch: the principal opens the family's page and sees exactly what the counsellor has asked for.",
        video: "approver-view",
        steps: [
          "Log in to the CRM with your own GEMS email and open the family the counsellor has told you about.",
          "Click the <b>Data</b> tab and scroll down to <b>Fees</b>. There is one row for each fee.",
          "On each row, read <b>Published</b> (the school's price), <b>Discount</b> (the rupees off), <b>Reason</b>, and <b>Net</b> (what the family would pay).",
          "A row waiting for you says <b>Waiting</b> in the Status column.",
          "Open <b>Discount approvals</b> under the fees. It shows one line for each fee and each level, and whose turn it is."
        ],
        remember: "Status Waiting means it is with the principal. With finance means the principal has approved and finance is next.",
        check: { type: "single", q: "Where do you see the amount and the reason for each discount?", options: ["Data tab, in the Fees rows", "In the Emails tab", "In Exotel"], answer: 0, explain: "Data tab → Fees: Published, Discount, Reason and Net on each row." }
      },
      {
        id: "check",
        title: "Check before you decide",
        intro: "Watch: this is how the counsellor fills in the three fees. Check the same things before you approve.",
        video: "j1-all-three-fees",
        steps: [
          "Is the child's <b>grade, curriculum and academic year</b> correct? A wrong grade gives a wrong price.",
          "Is <b>Published</b> this year's fee for that grade? If it looks like an old figure, do not approve. Tell the CRM admin.",
          "Does every discount have a <b>reason</b>, and does the reason make sense for this family?",
          "Is the <b>amount</b> within what your school allows? For example, a 10% sibling discount on ₹93,000 tuition is ₹9,300.",
          "Two children joining? There should be <b>one family record per child</b>, and the sibling discount sits on the child who gets it."
        ],
        warn: "If anything is unclear, reject it with a reason, or call the counsellor first. Do not approve a number you are not sure about.",
        check: { type: "number", q: "Tuition is ₹1,20,000 and the counsellor asks for a 10% sibling discount. What discount amount (₹) should you see on the tuition row?", answer: 12000, prefix: "₹", explain: "1,20,000 × 10 ÷ 100 = ₹12,000." }
      },
      {
        id: "decide",
        title: "Approve or reject",
        intro: "Watch: at the top of the family's page there are two buttons for each fee waiting on you.",
        video: "approver-view",
        steps: [
          "At the top of the page you see <b>Approve</b> and <b>Reject</b> buttons, for example <b>Approve tuition</b> and <b>Reject tuition</b>.",
          "Click <b>Approve</b> if the amount and the reason are right.",
          "Click <b>Reject</b> if they are not. The CRM asks you for a <b>reason</b>. Write it clearly, because the counsellor reads it and speaks to the parent.",
          "Decide each fee on its own. You can approve the blocking fee discount and reject the tuition discount.",
          "Every decision is saved in the history: who decided, what, and when."
        ],
        remember: "A rejection without a clear reason leaves the counsellor guessing. Always say why.",
        check: { type: "single", q: "You click Reject on the tuition discount. What does the CRM ask you for?", options: ["A reason, which the counsellor will see", "Nothing", "The parent's phone number"], answer: 0, explain: "A rejection needs a reason, so the counsellor can explain it to the family." }
      },
      {
        id: "after",
        title: "What happens after you decide",
        intro: "Watch: once both levels approve, the counsellor sends the family the exact amounts.",
        video: "j3-commitment-email",
        steps: [
          "After the <b>principal</b> approves, the row changes from Waiting to <b>With finance</b>. Finance now decides.",
          "After <b>finance</b> approves, the <b>Net</b> comes down to the discounted price.",
          "Only then does the counsellor send the parent the <b>commitment email</b> with the exact amounts. This is the school's promise.",
          "If a row is rejected, the counsellor talks to the family and may ask again with a different amount.",
          "If the family later asks for a bigger discount, it is a <b>new request</b> and comes to you again."
        ],
        remember: "The counsellor may start the application while you decide, so please answer requests the same day.",
        check: { type: "order", q: "Put the steps in order.", items: ["Counsellor enters the discount and reason", "Principal or school head approves", "Finance approves", "Counsellor sends the commitment email"], explain: "Counsellor → principal → finance → commitment email." }
      }
    ],
    bank: [
      { type: "single", q: "Who approves a discount at most schools, and in what order?", options: ["Principal or school head, then finance", "Finance, then principal", "Only the counsellor"], answer: 0, explain: "Level 1 principal or school head, Level 2 finance." },
      { type: "single", q: "Where do Coimbatore discounts go?", options: ["Straight to finance", "To the principal only", "No approval is needed"], answer: 0, explain: "Coimbatore has no principal, so finance decides." },
      { type: "single", q: "The principal has approved, but finance has not. What does the family owe?", options: ["Still the full published price", "The discounted price", "Nothing yet"], answer: 0, explain: "The Net only comes down after both approvals." },
      { type: "single", q: "A row's Status says With finance. What does it mean?", options: ["The principal has approved and finance is next", "It is rejected", "The family has paid"], answer: 0, explain: "With finance = Level 1 done, waiting on Level 2." },
      { type: "single", q: "Where do you see what the counsellor asked for?", options: ["Data tab → Fees rows, and Discount approvals", "The Emails tab", "Exotel call logs"], answer: 0, explain: "Fees rows show Published, Discount, Reason and Net. Discount approvals shows whose turn it is." },
      { type: "single", q: "The Published tuition looks like last year's figure. What do you do?", options: ["Don't approve, and tell the CRM admin", "Approve anyway", "Change the price yourself"], answer: 0, explain: "A wrong fee structure must be fixed first." },
      { type: "single", q: "A discount has no reason. What should you do?", options: ["Reject it and ask for a reason", "Approve it", "Ignore it"], answer: 0, explain: "Every discount needs a reason." },
      { type: "single", q: "You reject a discount. What must you give?", options: ["A clear reason the counsellor can explain to the parent", "Nothing", "A new price"], answer: 0, explain: "The counsellor reads your reason and speaks to the family." },
      { type: "single", q: "Can you approve one fee's discount and reject another's?", options: ["Yes, each fee is decided on its own", "No, all or nothing", "Only finance can"], answer: 0, explain: "Approve and Reject buttons are per fee." },
      { type: "single", q: "When does the counsellor send the commitment email?", options: ["After both approvals", "Before you approve", "After enrolment"], answer: 0, explain: "Only approved amounts are promised to the parent." },
      { type: "single", q: "The family asks for a bigger discount after you approved. What happens?", options: ["It comes to you again as a new request", "It saves by itself", "The counsellor changes the Net by hand"], answer: 0, explain: "A bigger discount is a fresh decision." },
      { type: "number", q: "Tuition is ₹93,000 with a 10% sibling discount. What discount (₹) should the tuition row show?", answer: 9300, prefix: "₹", explain: "93,000 × 10 ÷ 100 = ₹9,300." },
      { type: "multi", q: "What do you check before approving? Select all.", options: ["Grade, curriculum and year are right", "Published is this year's fee", "Every discount has a sensible reason", "The parent's WhatsApp photo"], answer: [0, 1, 2], explain: "Child details, the right fee, and a reason for every discount." }
    ]
  };

  C.MODULES.length = 0;
  C.MODULES.push(APPROVE);
})();
