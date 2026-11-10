/*
  Admin handbook: Exotel admin + CRM for the platform owner (Senthil).
  Section: { id, title, summary, topics: [...] }
  Topic:   { id, title, intro, img?, video?, steps: [], tip?, warn?, teach?, table? }
  Quizzes for this handbook are in ADMIN_QUIZZES at the bottom.
*/
(function () {
  const I = (n) => "assets/img/" + n;

  const SECTIONS = [
    /* ------------------------------------------------------------ */
    {
      id: "role",
      title: "Start here",
      summary: "What you own, who comes to you, and how Exotel and the CRM fit together.",
      topics: [
        {
          id: "your-role",
          title: "Your role",
          intro: "You are the single point of contact for Exotel and the CRM for every school counsellor.",
          steps: [
            "<b>Exotel:</b> you manage all counsellor accounts, groups, flows and numbers.",
            "<b>CRM:</b> you train counsellors and answer their questions. You <b>view</b> the CRM; you do not change settings or data without Dr Jay's OK.",
            "<b>Escalation:</b> counsellor → you → Dr Jay. Try to solve it first, then escalate with details (counsellor, lead ID, screenshot, time).",
            "<b>First 10-15 days:</b> every request is done together with Dr Jay on a live call with screen sharing.",
            "<b>Goal:</b> fully on your own within 1-2 months."
          ],
          tip: "Keep a simple log of every request you handle (date, counsellor, issue, fix). It becomes your own FAQ."
        },
        {
          id: "how-it-fits",
          title: "How a call works (the big picture)",
          intro: "One picture to remember. Every counsellor has their own Exotel number, flow and group.",
          extra: "callmap",
          steps: [
            "The counsellor clicks <b>Call</b> on a lead in the CRM.",
            "Exotel first rings the counsellor's <b>personal SIM</b> (the bridge). They pick up.",
            "Exotel then dials the parent from the counsellor's <b>official Exotel number</b>.",
            "The parent only ever sees the <b>official Exotel number</b>. The personal number is never shown.",
            "The call is recorded and logged in Exotel and in the CRM."
          ],
          tip: "Official number = what the parent sees. Personal SIM = where the counsellor picks up."
        },
        {
          id: "inbound",
          title: "When a parent calls back (inbound)",
          intro: "If a parent calls an official Exotel number, the call goes to the central counsellor team.",
          steps: [
            "Inbound calls ring the <b>Inbound</b> group: the central counsellor team in the Mumbai office.",
            "If everyone is busy, the parent hears the <b>voicemail</b>.",
            "Counsellors on leave are taken out of the Inbound group (see <b>Leave and return</b>)."
          ]
        },
        {
          id: "crm-vs-erp",
          title: "What goes in the CRM, and what does not",
          intro: "The CRM is for admissions only: from the first enquiry to the fee payment.",
          steps: [
            "<b>In the CRM:</b> leads, calls, notes, visits, application, fees, discounts, enrolment.",
            "<b>Not in the CRM:</b> anything after admission (coordinator reports, academic records). That goes to the ERP, <b>MyClassboard</b>.",
            "Counsellors can edit lead details in the CRM (grade, date of birth, curriculum, academic year)."
          ],
          warn: "If a coordinator sends feedback about a joined student, it belongs in MyClassboard, not the CRM."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: "exotel",
      title: "Exotel admin",
      summary: "Add a counsellor, give them a group, a flow and a number, and handle spam numbers and leave.",
      topics: [
        {
          id: "portal",
          title: "Find your way around Exotel",
          intro: "Log in at my.in.exotel.com with the admin login Dr Jay shares with you. Everything you need is in the left menu.",
          img: { src: I("exo-appbazaar.jpg"), caption: "The left menu. You will mostly use Inbox, Co-workers and Groups, App Bazaar and ExoPhones." },
          steps: [
            "<b>Inbox:</b> every call, with time, outcome and recording.",
            "<b>Co-workers and Groups:</b> the people (counsellors) and their groups.",
            "<b>App Bazaar:</b> the call flows, one per counsellor (\"Gems Outbound &lt;name&gt;\").",
            "<b>ExoPhones:</b> the official numbers and which flow each one uses.",
            "<b>Co-worker Activity Log:</b> who changed what."
          ],
          warn: "Never share the admin login. Counsellors use their own Exotel logins."
        },
        {
          id: "checklist",
          title: "New counsellor: the 6-step checklist",
          intro: "Every new counsellor goes through the same six steps. Do them in this order.",
          extra: "newuser",
          steps: [
            "<b>1. Add the person</b> in Co-workers and Groups.",
            "<b>2. Verify their number:</b> they give a missed call from their personal SIM.",
            "<b>3. Create their group</b> (one person, named after them).",
            "<b>4. Duplicate a flow</b> in App Bazaar, rename it, point it to their group.",
            "<b>5. Give the flow an official number</b> in ExoPhones.",
            "<b>6. CRM telephony setup</b> (with Dr Jay), so Call works in the CRM."
          ],
          tip: "Keep this checklist open on a second screen the first few times."
        },
        {
          id: "add-user",
          title: "Step 1: Add the counsellor",
          intro: "Manage → Co-workers and Groups → INVITE.",
          img: { src: I("exo-invite.jpg"), caption: "1 INVITE, 2 the counsellor's personal SIM number, 3 the note about verification." },
          steps: [
            "Click <b>Co-workers and Groups</b> in the left menu.",
            "Click <b>INVITE</b> (top, next to My co-workers).",
            "Type <b>First name</b>, <b>Last name</b> and their <b>GEMS email</b>.",
            "In <b>Mobile or Land-line Number</b>, type their <b>personal SIM number</b>. This is the phone that rings when they make or get a call.",
            "Leave Role as <b>User</b>. Click <b>ADD</b>."
          ],
          warn: "Each extra user costs credits every month. Only add real counsellors, and remove people who leave."
        },
        {
          id: "verify",
          title: "Step 2: Verify the number",
          intro: "Exotel will not ring a number until it is verified.",
          steps: [
            "Ask the counsellor to give a <b>missed call</b> from their personal SIM to <b>080 4863 6969</b>.",
            "Or choose <b>Get a verification call</b> from Exotel.",
            "Refresh Co-workers. Their number should show <b>ON</b> (green). <b>UNVERIFIED</b> (red) means not done yet."
          ],
          tip: "Do this while you are on the call with them, so you can check it at once."
        },
        {
          id: "group",
          title: "Step 3: Create their group",
          intro: "Each counsellor has a one-person group named after them. The flow rings this group.",
          img: { src: I("exo-groups.jpg"), caption: "1 ADD a group, 2 a group card (click it to see who is in it)." },
          steps: [
            "In Co-workers and Groups, click <b>ADD</b> next to Groups.",
            "Name the group after the counsellor (for example their first name).",
            "Drag the counsellor's card into the group, or click the people icon on their card and pick the group.",
            "Click the group to check: <b>Total Users: 1</b>, and it is the right person."
          ]
        },
        {
          id: "flow",
          title: "Step 4: Make their call flow",
          intro: "Don't build a flow from zero. Copy an existing one and change two things: the name and the group.",
          img: { src: I("exo-appbazaar.jpg"), caption: "1 App Bazaar, 2 the Duplicate icon on any working \"Gems Outbound\" flow." },
          steps: [
            "Click <b>App Bazaar</b>. You see the list of <b>Gems Outbound &lt;name&gt;</b> flows.",
            "On any working flow, click the <b>Duplicate</b> icon (the middle icon under Action).",
            "Name it <b>Gems Outbound &lt;counsellor name&gt;</b>. Click <b>OK</b>.",
            "Open the new flow (pencil icon) to edit it (next topic)."
          ]
        },
        {
          id: "flow-name",
          title: "Name the copied flow",
          intro: "The Duplicate Flow box asks only for a name.",
          img: { src: I("exo-duplicate.jpg"), caption: "Type Gems Outbound followed by the counsellor's name, then OK." },
          steps: [
            "Always start with <b>Gems Outbound</b>, then the counsellor's full name.",
            "Counsellors find their flow in Exotel by searching <b>gems outbound + their name</b>, so the name must be exact."
          ]
        },
        {
          id: "dial-whom",
          title: "Point the flow to their group",
          intro: "Inside the flow, the Connect box decides who gets the call.",
          img: { src: I("exo-dialwhom.jpg"), caption: "Connect → Dial Whom → Dial a user or group. Pick the counsellor's own group." },
          steps: [
            "In the flow, click the <b>Connect</b> box.",
            "Scroll to <b>Dial Whom</b> → <b>Dial a user or group</b>.",
            "Search and pick the <b>counsellor's own group</b> (from Step 3).",
            "Leave everything else as it was copied (recording, music on hold, CRM pop-up URL).",
            "Click <b>SAVE</b> at the top right."
          ],
          warn: "Do not change the Create popup URL. It is what links Exotel calls to the CRM."
        },
        {
          id: "number",
          title: "Step 5: Give the flow an official number",
          intro: "ExoPhones lists all official numbers. Each counsellor gets one.",
          img: { src: I("exo-numbers.jpg"), caption: "1 ExoPhones, 2 the Installed App box on a free number: pick the counsellor's flow." },
          steps: [
            "Click <b>ExoPhones</b>.",
            "Find a <b>free</b> number (no flow attached, or one you are re-using).",
            "Click its <b>Installed App</b> box and pick <b>Gems Outbound &lt;counsellor name&gt;</b>.",
            "Note the number down. This is the counsellor's <b>official Exotel number</b>."
          ],
          tip: "27 numbers are provisioned and about 25 are in use. If you run out, email Exotel to request more."
        },
        {
          id: "send-to-jay",
          title: "Step 6: Ask for the CRM login",
          intro: "CRM users are created by Dr Jay from the back end. You send one email with the details.",
          extra: "emailtemplate",
          steps: [
            "Email Dr Jay with the six details in the template below.",
            "The email is picked up and the CRM user is created, then you get a confirmation.",
            "Then do the <b>CRM telephony setup</b> (in the CRM admin section) so Call works for them."
          ]
        },
        {
          id: "counsellor-setup",
          title: "Counsellor's own one-time Exotel setup",
          intro: "On their first day, each counsellor sets their own flow and number in Exotel once. Check it with your own eyes.",
          img: { src: I("exotel-advanced.jpg"), caption: "CALL → Advanced → Through (their flow) and From (their number)." },
          steps: [
            "Counsellor logs in to Exotel with their GEMS email (Forgot password the first time).",
            "Click <b>CALL</b> → <b>Advanced +</b>.",
            "<b>Through:</b> search <b>gems outbound + their name</b>.",
            "<b>From:</b> their own official Exotel number.",
            "Make a <b>test call</b> to your own phone. Check the number you see is their official number."
          ],
          warn: "Wrong Through or From = their calls are recorded against someone else. Always verify on screen share."
        },
        {
          id: "spam",
          title: "Number marked as spam: swap it",
          intro: "If parents see a counsellor's number as spam, give them a new one. It takes one step.",
          steps: [
            "Go to <b>ExoPhones</b>.",
            "On the old number, remove the counsellor's flow from <b>Installed App</b>.",
            "On a free number, pick the counsellor's flow in <b>Installed App</b>.",
            "Tell the counsellor their new number and ask them to re-select <b>From</b> in CALL → Advanced.",
            "Tell Dr Jay the new number so the CRM telephony record is updated."
          ],
          tip: "Need more numbers? Email Exotel support to request them."
        },
        {
          id: "leave",
          title: "Leave and return",
          intro: "A counsellor on leave should not get inbound calls.",
          steps: [
            "Open <b>Co-workers and Groups</b> and click the <b>Inbound</b> group.",
            "Remove the counsellor (the ✕ next to their name).",
            "Put a reminder for their return date. Add them back to Inbound that day.",
            "Tip: set a phone reminder for the return date so nobody stays out of Inbound by mistake."
          ]
        },
        {
          id: "inbox",
          title: "Check calls in the Inbox",
          intro: "When a counsellor says \"my call didn't work\", look in the Inbox first.",
          steps: [
            "Click <b>Inbox</b>. Search by number or name.",
            "<b>Call was successful:</b> both sides spoke. Play the recording if needed.",
            "<b>Client unanswered / Client hung-up before connecting:</b> the counsellor did not pick up their own phone.",
            "<b>No user answered:</b> an inbound call nobody picked up.",
            "Check the <b>ExoPhone</b> column shows the counsellor's own number."
          ]
        },
        {
          id: "leaver",
          title: "Someone leaves GEMS",
          intro: "Close their access the same day.",
          steps: [
            "Remove them from every group, including Inbound.",
            "Free their ExoPhone (remove the flow) so it can be re-used.",
            "Delete the co-worker (trash icon on their card).",
            "Email Dr Jay so the CRM user is disabled and their leads are moved."
          ],
          warn: "Their leads must be reassigned in the CRM. Never leave leads on a person who has gone."
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: "crm",
      title: "CRM admin",
      summary: "Telephony setup, checking a counsellor is ready, the sales flow and common problems.",
      topics: [
        {
          id: "crm-login",
          title: "The CRM in one minute",
          intro: "gemseducation.m.frappe.cloud/crm. Log in with your GEMS email.",
          img: { src: I("crm-lead-top.jpg"), caption: "A lead: tabs across the top, status and Start Application top right, call and email icons on the right." },
          steps: [
            "<b>Enquiries</b> = leads (families not yet applying).",
            "<b>Applications</b> = families who started the application.",
            "<b>Public views</b> on the left are shared lists every counsellor uses.",
            "Each counsellor sees only their own campus leads."
          ],
          warn: "View only. Do not change leads, settings or views without Dr Jay's OK."
        },
        {
          id: "telephony",
          title: "CRM telephony setup (per counsellor)",
          intro: "This links the counsellor's CRM user to Exotel, so the Call button rings their phone. Done after the Exotel steps.",
          img: { src: I("crm-agent-list.jpg"), caption: "Search → CRM Telephony Agent → Add CRM Telephony Agent." },
          steps: [
            "In the CRM desk, search <b>CRM Telephony Agent</b>.",
            "Click <b>+ Add CRM Telephony Agent</b>.",
            "Pick the counsellor's <b>user</b>.",
            "Fill the fields shown in the next topic, then <b>Save</b>."
          ],
          warn: "For now, do this together with Dr Jay on a call."
        },
        {
          id: "telephony-fields",
          title: "Telephony agent: the fields",
          intro: "Four things must be right.",
          img: { src: I("crm-agent-form.jpg"), caption: "1 Default Medium Exotel, 2 Device Phone, 3 Exotel Number, 4 personal number marked Primary." },
          steps: [
            "<b>Default Medium:</b> Exotel.",
            "<b>Device:</b> Phone (always Phone).",
            "<b>Exotel Number:</b> the counsellor's official Exotel number (from ExoPhones).",
            "<b>Phone Numbers:</b> add their personal SIM and tick <b>Is Primary</b>.",
            "Save. Ask the counsellor to click Call on a test lead to confirm."
          ]
        },
        {
          id: "ready-check",
          title: "Is this counsellor ready? (5 checks)",
          intro: "Before training, check these five things.",
          steps: [
            "Exotel co-worker exists and number shows <b>ON</b>.",
            "Their one-person group exists with only them in it.",
            "Their <b>Gems Outbound</b> flow dials their group and has an ExoPhone.",
            "CRM login works and they see their campus leads.",
            "CRM telephony agent: Exotel, Phone, right Exotel number, personal number Primary."
          ],
          tip: "Your first task: cross-check Dr Jay's counsellor list (name, school, Exotel number) against what is live in Exotel."
        },
        {
          id: "journey",
          title: "The sales flow: from enquiry to enrolment",
          intro: "Every family moves through the same stages. Learn the order; teach the order.",
          extra: "journey",
          steps: [
            "<b>Enquiry stages:</b> New → Contacted → Visit Scheduled → Visit Done.",
            "<b>Start Application</b> turns the enquiry into an Application.",
            "<b>Application stages:</b> Application Submitted → Application Fee Paid → Documents Submitted → Admission Letter Released → Blocking Fee Paid → Enrolled.",
            "Fees and discounts are entered in the <b>Data tab</b>. Discounts go for approval.",
            "Ends: <b>Junk</b> or <b>Lost</b> (enquiry), <b>Waitlisted, Rejected, Withdrawn</b> (application)."
          ]
        },
        {
          id: "statuses",
          title: "What each status means",
          intro: "Use this table when a counsellor asks \"which status do I pick?\"",
          extra: "statustable",
          steps: []
        },
        {
          id: "views",
          title: "Quick views counsellors use",
          intro: "Public views on the left of Enquiries. Each one is a ready-made list.",
          extra: "viewstable",
          steps: []
        },
        {
          id: "problems",
          title: "Common problems and what to do",
          intro: "Most questions are one of these.",
          extra: "faq",
          steps: []
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: "training",
      title: "Running a training",
      summary: "How to run a one-to-one counsellor session on Teams.",
      topics: [
        {
          id: "session",
          title: "A one-to-one session, step by step",
          intro: "One counsellor at a time, one school at a time. About 15 counsellors in total.",
          steps: [
            "<b>Before:</b> run the 5 readiness checks. Have a test lead ready.",
            "<b>Start:</b> Teams call, share your screen, open the <b>Train a counsellor</b> tab.",
            "<b>Exotel:</b> they share their screen and do the one-time setup. You check Through and From.",
            "<b>Test calls:</b> they call a test lead from the CRM; your phone or Dr Jay's rings.",
            "<b>CRM flow:</b> go module by module. Ask the question on each step.",
            "<b>Quiz:</b> end with the module quizzes, on their screen.",
            "<b>After:</b> email a short summary (what was covered, test call result, what to fix). Then move to the next counsellor."
          ],
          tip: "First session: Thursday, Soumya (Kochi). Dr Jay joins the first few sessions; then you lead alone."
        },
        {
          id: "screen-share",
          title: "Using the training tab on screen share",
          intro: "The Train a counsellor tab is made for screen sharing.",
          steps: [
            "Click <b>Full screen</b> so only the lesson shows.",
            "Use the <b>→</b> and <b>←</b> keys (or Next / Back) to move.",
            "Each step: play the clip, read the steps aloud, then ask the question at the bottom.",
            "Let the counsellor answer first. Click <b>Show answer</b> after."
          ]
        },
        {
          id: "email-summary",
          title: "Training summary email (template)",
          intro: "Send this after every session.",
          extra: "trainingemail",
          steps: []
        }
      ]
    }
  ];

  const STATUS_TABLE = [
    ["New", "Enquiry", "Nobody has spoken to the family yet. Call quickly."],
    ["Contacted", "Enquiry", "A real conversation happened. Set by itself when the call is logged as \"Spoke to parent\"."],
    ["Visit Scheduled", "Enquiry", "A school visit is booked with a date and time."],
    ["Visit Done", "Enquiry", "The family came for the visit."],
    ["Junk", "Enquiry (end)", "Not a real enquiry: wrong number, job seeker, test, duplicate. Reason needed."],
    ["Lost", "Enquiry (end)", "A real family who will not join (other school, fees, distance). Reason needed."],
    ["Application Submitted", "Application", "Start Application was clicked. Family is applying."],
    ["Application Fee Paid", "Application", "Application fee received. Amount entered in the pop-up."],
    ["Documents Submitted", "Application", "All documents checked."],
    ["Admission Letter Released", "Application", "Offer / admission letter given."],
    ["Blocking Fee Paid", "Application", "Seat blocked with the blocking fee."],
    ["Enrolled", "Application (won)", "Admission done."],
    ["Waitlisted", "Application", "No seat now; on the waiting list."],
    ["Rejected", "Application (end)", "School could not offer a seat."],
    ["Withdrawn", "Application (end)", "Family pulled out. Lost reason needed."]
  ];

  const VIEWS_TABLE = [
    ["Fresh leads", "My New leads still waiting for a first response.", "First thing every morning"],
    ["Leads not called", "My New leads with no call attempt yet.", "Clear it every day"],
    ["DNP Leads", "My leads whose last call was \"Did not pick up\".", "Call again at a different time"],
    ["Today's followup", "My tasks due today.", "Work through all of them"],
    ["Hot & Warm Leads", "Leads marked Hot or Warm.", "Push to visit / application"],
    ["Visits today", "Visits booked for today.", "Confirm in the morning"],
    ["Visit Scheduled", "Leads with a visit booked.", "Remind the day before"],
    ["Visit Completed", "Leads who visited.", "Push to application"],
    ["Visit No show", "Booked visit date passed, family did not come.", "Rebook the visit"],
    ["Application Submitted", "Applications at the first stage.", "Chase the application fee"]
  ];

  const FAQ = [
    ["\"My call is not connecting.\"", "Check Exotel Inbox. \"Client unanswered\" = they did not pick up their own phone. Check their number shows ON and the CRM telephony agent has the right numbers."],
    ["\"Parent sees a different number.\"", "Their From in CALL → Advanced is wrong, or the flow is on another ExoPhone. Fix From; check ExoPhones."],
    ["\"Parents say my number shows spam.\"", "Swap the ExoPhone (Exotel admin → Number marked as spam)."],
    ["\"My call does not show on the lead's Calls tab.\"", "Known CRM issue: Exotel calls are not linking to leads by themselves. Tell Dr Jay with the lead ID; the calls are linked in bulk."],
    ["\"My note went on the wrong lead.\"", "Happens when two calls overlap. Send Dr Jay the lead ID and time; do not delete anything."],
    ["\"I can't see a lead.\"", "Counsellors see only their campus. Check the campus on the lead with Dr Jay."],
    ["\"I can't log in to the CRM.\"", "Check they use their GEMS email. If still stuck, email Dr Jay to reset."],
    ["\"Coordinator feedback / marks / reports?\"", "Not CRM. That goes to MyClassboard (ERP)."]
  ];

  const EMAIL_TEMPLATE = `To: Dr Jay Vora
Subject: New CRM user: <First name> <Last name>

First name:
Last name:
GEMS email:
Personal mobile number:
Exotel official number:
School / campus:`;

  const TRAINING_EMAIL = `Subject: CRM + Exotel training done: <Counsellor>, <School>

Date and time:
Covered: Exotel setup, CRM home and views, calling and logging, lead details, visits, application and fees
Exotel check: Through = Gems Outbound <name>, From = <number>  (verified on screen)
Test call from CRM: worked / did not work (what happened)
Quiz scores:
To fix / follow up:
Next session:`;

  const ADMIN_QUIZZES = [
    {
      id: "admin-exotel",
      title: "Exotel admin quiz",
      summary: "Adding counsellors, groups, flows, numbers, spam and leave.",
      questions: [
        { type: "order", q: "Put the new-counsellor steps in order.", items: ["Add the co-worker (INVITE)", "Counsellor gives a missed call to verify", "Create their one-person group", "Duplicate a Gems Outbound flow and point it to the group", "Attach an ExoPhone to the flow", "CRM telephony setup"], explain: "Person, verify, group, flow, number, CRM." },
        { type: "single", q: "In INVITE, which number goes in \"Mobile or Land-line Number\"?", options: ["The counsellor's personal SIM", "Their official Exotel number", "The school landline"], answer: 0, explain: "The personal SIM is where Exotel rings the counsellor." },
        { type: "single", q: "Which number does the parent see?", options: ["The official Exotel number", "The counsellor's personal SIM", "080 4863 6969"], answer: 0, explain: "Parents only ever see the official Exotel number." },
        { type: "single", q: "How does a new counsellor verify their number?", options: ["Missed call from their personal SIM to 080 4863 6969", "Email Exotel", "Nothing is needed"], answer: 0, explain: "A missed call (or a verification call) verifies the number." },
        { type: "single", q: "How many people are in a counsellor's own group?", options: ["One: only that counsellor", "The whole school team", "Everyone in the Inbound team"], answer: 0, explain: "One person, named after them." },
        { type: "single", q: "Best way to make a new counsellor's flow?", options: ["Duplicate a working Gems Outbound flow and change name + group", "Build a new flow from zero", "Edit someone else's flow"], answer: 0, explain: "Duplicate, rename, point to the new group, save." },
        { type: "single", q: "Inside the flow, where do you choose who gets the call?", options: ["Connect → Dial Whom → Dial a user or group", "Greeting", "Create popup URL"], answer: 0, explain: "Dial Whom decides which group rings." },
        { type: "single", q: "Where do you attach an official number to a flow?", options: ["ExoPhones → Installed App", "Co-workers → INVITE", "Inbox"], answer: 0, explain: "ExoPhones lists the numbers; pick the flow in Installed App." },
        { type: "single", q: "A counsellor's number is showing as spam to parents. What do you do?", options: ["Move their flow to a free ExoPhone, tell them and Dr Jay the new number", "Delete the counsellor", "Ask them to use their personal phone"], answer: 0, explain: "Swap the number in ExoPhones, then update From and the CRM." },
        { type: "single", q: "A counsellor goes on leave for a week. What do you change?", options: ["Remove them from the Inbound group, add back on return", "Delete their flow", "Nothing"], answer: 0, explain: "Out of Inbound while away; back in when they return." },
        { type: "single", q: "Where do inbound calls (parents calling back) go?", options: ["The Inbound group: central team in Mumbai, voicemail if busy", "The counsellor's personal SIM always", "Nowhere"], answer: 0, explain: "Inbound goes to the central counsellor team." },
        { type: "single", q: "Inbox shows \"Client unanswered\". What does it mean?", options: ["The counsellor did not pick up their own phone", "The parent did not pick up", "The number is spam"], answer: 0, explain: "Exotel rings the counsellor first; client = the counsellor's leg." },
        { type: "multi", q: "In the counsellor's own Exotel setup (CALL → Advanced), which two must be right? Select both.", options: ["Through = Gems Outbound + their name", "From = their own official number", "Role = Admin", "Group = Inbound"], answer: [0, 1], explain: "Through and From. Always check them on screen share." },
        { type: "single", q: "Running out of official numbers?", options: ["Email Exotel to request more", "Re-use a working counsellor's number", "Use personal numbers"], answer: 0, explain: "27 are provisioned; ask Exotel for more." }
      ]
    },
    {
      id: "admin-crm",
      title: "CRM admin and sales flow quiz",
      summary: "Telephony setup, statuses, views and who does what.",
      questions: [
        { type: "single", q: "Who creates a new CRM user?", options: ["Dr Jay, from the back end, after your email", "The counsellor themselves", "You, in the CRM settings"], answer: 0, explain: "You email the six details; the user is created and confirmed back." },
        { type: "multi", q: "Which details go in the new-user email? Select all.", options: ["First and last name", "GEMS email", "Personal mobile", "Exotel number", "School / campus", "Date of birth"], answer: [0, 1, 2, 3, 4], explain: "Name, email, personal number, Exotel number, campus." },
        { type: "single", q: "In the CRM telephony agent, what is Device?", options: ["Phone", "Computer", "Browser"], answer: 0, explain: "Always Phone." },
        { type: "single", q: "Which phone number is marked Primary in the telephony agent?", options: ["The counsellor's personal SIM", "The school landline", "Dr Jay's number"], answer: 0, explain: "Personal SIM, Is Primary ticked; Exotel Number holds the official number." },
        { type: "order", q: "Put the enquiry stages in order.", items: ["New", "Contacted", "Visit Scheduled", "Visit Done"], explain: "New → Contacted → Visit Scheduled → Visit Done." },
        { type: "order", q: "Put the application stages in order.", items: ["Application Submitted", "Application Fee Paid", "Documents Submitted", "Admission Letter Released", "Blocking Fee Paid", "Enrolled"], explain: "This is the order every application follows." },
        { type: "single", q: "A family is a real enquiry but chose another school. Status?", options: ["Lost", "Junk", "Contacted"], answer: 0, explain: "Real family who won't join = Lost, with a reason." },
        { type: "single", q: "The number belongs to someone looking for a job. Status?", options: ["Junk", "Lost", "New"], answer: 0, explain: "Not a real enquiry = Junk." },
        { type: "single", q: "What moves a lead from New to Contacted?", options: ["Logging the call as \"Spoke to parent\"", "Opening the lead", "Calling and nobody answers"], answer: 0, explain: "Only a real conversation makes it Contacted." },
        { type: "single", q: "Which view shows a counsellor's New leads not yet called?", options: ["Leads not called", "Visit Completed", "Hot & Warm Leads"], answer: 0, explain: "Leads not called." },
        { type: "single", q: "Which view shows leads whose last call was not picked up?", options: ["DNP Leads", "Fresh leads", "Visits today"], answer: 0, explain: "DNP = Did Not Pick up." },
        { type: "single", q: "A coordinator wants to log a joined student's term feedback. Where?", options: ["MyClassboard (ERP)", "The CRM lead notes", "Exotel"], answer: 0, explain: "The CRM is for admissions only." },
        { type: "single", q: "A counsellor's Exotel call is not on the lead's Calls tab. What do you do?", options: ["Tell Dr Jay with the lead ID (known linking issue)", "Ask them to call again", "Create a new lead"], answer: 0, explain: "Exotel calls are linked in bulk until the fix is live." },
        { type: "single", q: "Can you change CRM settings or data on your own right now?", options: ["No, view only until Dr Jay approves", "Yes, anything", "Only statuses"], answer: 0, explain: "View only for now." }
      ]
    }
  ];

  window.GTA_ADMIN = { SECTIONS, STATUS_TABLE, VIEWS_TABLE, FAQ, EMAIL_TEMPLATE, TRAINING_EMAIL, ADMIN_QUIZZES };
})();
