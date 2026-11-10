/* Extra counsellor modules added for the academy: finding leads, lead details and status meanings.
   They are inserted after "Your CRM home". Same format as content.js. */
(function () {
  const I = (n) => "assets/img/" + n;
  const C = window.GCT_CONTENT;

  const FIND = {
    id: "find",
    title: "Finding your leads: views and filters",
    summary: "Quick views, quick filters, the Filter button, sorting and search.",
    minutes: 10,
    lessons: [
      {
        id: "views",
        title: "Quick views: your ready-made lists",
        intro: "Watch: on the left of Enquiries, under Public Views, are lists made for you.",
        video: "e1-your-list",
        steps: [
          "<b>Fresh leads:</b> your New leads waiting for a first response.",
          "<b>Leads not called:</b> your New leads with no call yet.",
          "<b>DNP Leads:</b> last call was \"Did not pick up\". Try again at another time.",
          "<b>Today's followup:</b> your tasks due today.",
          "<b>Hot &amp; Warm Leads, Visits today, Visit Scheduled, Visit Completed, Visit No show</b>."
        ],
        remember: "Morning order: Fresh leads → Leads not called → Today's followup → DNP Leads.",
        check: { type: "single", q: "Your last call to a parent was not picked up. Which view will show this lead?", options: ["DNP Leads", "Visit Completed", "Fresh leads"], answer: 0, explain: "DNP = Did Not Pick up." }
      },
      {
        id: "quick-filters",
        title: "Quick filters at the top",
        intro: "Above the list are small boxes. Pick a value to narrow the list at once.",
        steps: [
          "<b>Status:</b> for example only <b>New</b>, or only <b>Visit Scheduled</b>.",
          "<b>Intent:</b> Hot, Warm or Cold.",
          "<b>Campus</b> and <b>Grade applied</b>.",
          "<b>Calls made:</b> how many calls are already logged.",
          "Clear a box to remove that filter."
        ],
        check: { type: "single", q: "You want only your Hot leads. What do you do?", options: ["Pick Hot in the Intent quick filter", "Scroll and look for them", "Ask your manager"], answer: 0, explain: "The Intent box at the top filters the list." }
      },
      {
        id: "filter-button",
        title: "The Filter button, Sort and Columns",
        intro: "For anything the quick boxes can't do.",
        steps: [
          "Click <b>Filter</b> → <b>+ Add filter</b> → choose a field (for example Source = Meta) → choose the value.",
          "Click <b>Sort</b> (or Created On) to change the order, for example newest first.",
          "Click <b>Columns</b> to show or hide columns.",
          "Click the <b>✕</b> next to Filter to clear all filters.",
          "Use <b>Search</b> (top left) to find a family by name or phone number."
        ],
        warn: "If the list looks empty or short, a filter is probably still on. Clear it first.",
        check: { type: "single", q: "Your list suddenly shows only 3 leads. What is the most likely reason?", options: ["A filter is still switched on", "Leads were deleted", "The CRM is broken"], answer: 0, explain: "Check and clear filters first." }
      }
    ],
    bank: [
      { type: "single", q: "Which view shows your New leads with no call yet?", options: ["Leads not called", "Visit Completed", "Hot & Warm Leads"], answer: 0, explain: "Leads not called." },
      { type: "single", q: "Which view shows your tasks due today?", options: ["Today's followup", "Fresh leads", "Visit Scheduled"], answer: 0, explain: "Today's followup lists tasks due today." },
      { type: "single", q: "A family booked a visit for yesterday and did not come. Which view?", options: ["Visit No show", "Visit Completed", "Fresh leads"], answer: 0, explain: "Visit No show: the visit date passed, still Visit Scheduled." },
      { type: "single", q: "How do you find a family when the parent calls you and gives their number?", options: ["Search box, type the number", "Scroll the whole list", "Create a new lead"], answer: 0, explain: "Search by number or name. Never create a duplicate." },
      { type: "single", q: "Where do you pick Hot, Warm or Cold to filter the list?", options: ["The Intent quick filter", "The Columns button", "The status button"], answer: 0, explain: "Intent quick filter at the top." },
      { type: "single", q: "How do you remove all filters?", options: ["Click the ✕ next to Filter", "Log out", "Refresh the page 5 times"], answer: 0, explain: "The ✕ clears the filters." },
      { type: "order", q: "Put the morning routine in order.", items: ["Fresh leads", "Leads not called", "Today's followup", "DNP Leads"], explain: "New families first, then follow-ups, then retries." },
      { type: "single", q: "You want to see only leads from Meta. What do you use?", options: ["Filter → Add filter → Source = Meta", "Sort", "Columns"], answer: 0, explain: "The Filter button can filter any field." }
    ]
  };

  const DETAILS = {
    id: "lead-info",
    title: "Lead details and what each status means",
    summary: "Fill the family's details, choose the right call outcome, and know every status.",
    minutes: 12,
    lessons: [
      {
        id: "fill",
        title: "Fill the lead information",
        intro: "Watch: the details on the right and in the Data tab. Fill them during or right after the first call.",
        video: "e2-inside-enquiry",
        image: { src: I("crm-lead-header.jpg"), alt: "Lead page", caption: "Details on the right; more in the Data tab." },
        steps: [
          "<b>Grade applied for</b> (Pre-KG to Grade 12).",
          "<b>Date of birth</b> of the child (decides the right grade).",
          "<b>Curriculum:</b> CBSE, IB, Cambridge IGCSE, ICSE or Montessori.",
          "<b>Academic year:</b> 2027-28 or 2028-29.",
          "<b>Next contact</b> date, so you remember to follow up.",
          "Fix the parent's name, email or number if the parent corrects you."
        ],
        remember: "A lead with grade, DOB and year filled is a lead the school can act on.",
        check: { type: "multi", q: "Which details should you fill after the first call? Select all.", options: ["Grade applied for", "Child's date of birth", "Academic year", "Curriculum", "The parent's salary"], answer: [0, 1, 2, 3], explain: "Grade, DOB, year and curriculum. Never ask for things we don't need." }
      },
      {
        id: "outcomes",
        title: "Call outcomes: pick the true one",
        intro: "After every call, the pop-up asks what happened. Pick what really happened.",
        steps: [
          "<b>Spoke to parent:</b> a real conversation. The lead moves to <b>Contacted</b> by itself.",
          "<b>Asked for follow-up:</b> the parent asked you to call again. Add a task.",
          "<b>Call back later:</b> busy now. Add a task for the time they gave.",
          "<b>Did not pick up:</b> no answer. The lead shows in <b>DNP Leads</b>.",
          "<b>Wrong number:</b> the number is not this family. Usually ends as Junk."
        ],
        warn: "Never pick \"Spoke to parent\" if you didn't. It changes the status and the reports.",
        check: { type: "single", q: "The phone rang and nobody answered. Which outcome?", options: ["Did not pick up", "Spoke to parent", "Asked for follow-up"], answer: 0, explain: "No answer = Did not pick up." }
      },
      {
        id: "enquiry-status",
        title: "Enquiry statuses",
        intro: "An enquiry is always in one of these.",
        extra: "stages",
        steps: [
          "<b>New:</b> nobody has spoken to the family yet.",
          "<b>Contacted:</b> you had a real conversation.",
          "<b>Visit Scheduled:</b> a school visit is booked.",
          "<b>Visit Done:</b> the family came.",
          "<b>Junk:</b> not a real enquiry (wrong number, job seeker, test).",
          "<b>Lost:</b> a real family who will not join (reason needed)."
        ],
        check: { type: "single", q: "You spoke to the parent and booked a visit for Saturday. Status?", options: ["Visit Scheduled", "Visit Done", "New"], answer: 0, explain: "Booked = Visit Scheduled. It becomes Visit Done after they come." }
      },
      {
        id: "application-status",
        title: "Application statuses",
        intro: "After Start Application, the family moves through these.",
        extra: "appstages",
        steps: [
          "<b>Application Submitted:</b> application started.",
          "<b>Application Fee Paid:</b> fee received (enter the amount in the pop-up).",
          "<b>Documents Submitted:</b> documents checked.",
          "<b>Admission Letter Released:</b> offer given.",
          "<b>Blocking Fee Paid:</b> seat blocked.",
          "<b>Enrolled:</b> admission done.",
          "Other ends: <b>Waitlisted</b>, <b>Rejected</b>, <b>Withdrawn</b>."
        ],
        check: { type: "single", q: "The family paid to hold the seat after getting the admission letter. Status?", options: ["Blocking Fee Paid", "Application Fee Paid", "Enrolled"], answer: 0, explain: "Holding the seat = Blocking Fee Paid." }
      }
    ],
    bank: [
      { type: "single", q: "You spoke to the parent for 5 minutes. Which outcome?", options: ["Spoke to parent", "Call back later", "Did not pick up"], answer: 0, explain: "A real conversation = Spoke to parent." },
      { type: "single", q: "What happens to the status when you log \"Spoke to parent\" on a New lead?", options: ["It becomes Contacted by itself", "It stays New", "It becomes Lost"], answer: 0, explain: "The CRM moves it to Contacted." },
      { type: "single", q: "The parent says \"call me after 6 pm\". Which outcome?", options: ["Call back later (and add a task)", "Spoke to parent", "Wrong number"], answer: 0, explain: "Call back later, plus a task for 6 pm." },
      { type: "single", q: "Which academic years can you pick?", options: ["2027-28 or 2028-29", "Any year", "Only 2026-27"], answer: 0, explain: "2027-28 and 2028-29." },
      { type: "single", q: "Why fill the child's date of birth?", options: ["It decides the right grade", "It is not needed", "For birthday wishes only"], answer: 0, explain: "DOB decides grade eligibility." },
      { type: "order", q: "Put the enquiry statuses in order.", items: ["New", "Contacted", "Visit Scheduled", "Visit Done"], explain: "New → Contacted → Visit Scheduled → Visit Done." },
      { type: "order", q: "Put the application statuses in order.", items: ["Application Submitted", "Application Fee Paid", "Documents Submitted", "Admission Letter Released", "Blocking Fee Paid", "Enrolled"], explain: "This is the order every application follows." },
      { type: "single", q: "The caller wanted a teaching job. Status?", options: ["Junk", "Lost", "Contacted"], answer: 0, explain: "Not an admission enquiry = Junk." },
      { type: "single", q: "A real family chose another school. Status?", options: ["Lost", "Junk", "Visit Done"], answer: 0, explain: "Real family who won't join = Lost." },
      { type: "single", q: "Where do you set the next follow-up date?", options: ["Next contact on the lead (and a task)", "In my diary", "In Exotel"], answer: 0, explain: "Next contact and a task keep the follow-up in the CRM." }
    ]
  };

  const i = C.MODULES.findIndex((m) => m.id === "crm-basics");
  C.MODULES.splice(i + 1, 0, FIND, DETAILS);
})();
