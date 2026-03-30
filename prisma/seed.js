const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.resolve(__dirname, "../dev.db");
const db = new Database(dbPath);

function cuid() {
  return "c" + crypto.randomBytes(12).toString("hex");
}

const now = new Date().toISOString();

// Clear existing
db.exec("DELETE FROM Interaction; DELETE FROM Deal; DELETE FROM Contact;");

const contacts = [
  { id: cuid(), name: "Sarah Chen", email: "sarah.chen@techcorp.com", phone: "+1 (415) 555-0101", company: "TechCorp", notes: "VP of Engineering. Key decision maker.", tags: '["enterprise","vip"]' },
  { id: cuid(), name: "Marcus Johnson", email: "marcus.j@innovate.io", phone: "+1 (212) 555-0202", company: "Innovate.io", notes: "CTO. Interested in AI automation.", tags: '["startup","ai-interest"]' },
  { id: cuid(), name: "Emily Rodriguez", email: "emily.r@globalfin.com", phone: "+1 (312) 555-0303", company: "GlobalFin", notes: "Director of Operations. Budget approved for Q1.", tags: '["enterprise","finance"]' },
  { id: cuid(), name: "David Park", email: "david.park@nexusai.com", phone: "+1 (650) 555-0404", company: "NexusAI", notes: "Founder. Partnership opportunities.", tags: '["partner","ai-interest"]' },
  { id: cuid(), name: "Lisa Thompson", email: "lisa.t@retailplus.com", phone: "+1 (305) 555-0505", company: "RetailPlus", notes: "Head of Digital Transformation.", tags: '["retail","enterprise"]' },
  { id: cuid(), name: "James Wilson", email: "james.w@cloudserv.net", phone: "+1 (503) 555-0606", company: "CloudServ", notes: "Senior architect. Cloud migration.", tags: '["cloud","technical"]' },
  { id: cuid(), name: "Ana Martinez", email: "ana.m@healthtech.org", phone: "+1 (617) 555-0707", company: "HealthTech", notes: "Product Manager. Compliance required.", tags: '["healthcare","compliance"]' },
  { id: cuid(), name: "Robert Kim", email: "robert.kim@datavault.com", phone: "+1 (206) 555-0808", company: "DataVault", notes: "CEO. Fast-growing analytics company.", tags: '["analytics","vip"]' },
  { id: cuid(), name: "Priya Sharma", email: "priya.s@edulearn.com", phone: "+1 (408) 555-0909", company: "EduLearn", notes: "VP Product. EdTech sector.", tags: '["edtech","growth"]' },
  { id: cuid(), name: "Michael Brown", email: "michael.b@mfgcorp.com", phone: "+1 (713) 555-1010", company: "MfgCorp", notes: "Operations Director. Manufacturing automation.", tags: '["manufacturing","enterprise"]' },
];

const insertContact = db.prepare("INSERT INTO Contact (id, name, email, phone, company, notes, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
for (const c of contacts) {
  insertContact.run(c.id, c.name, c.email, c.phone, c.company, c.notes, c.tags, now, now);
}

const deals = [
  { title: "TechCorp Enterprise License", value: 120000, stage: "Won", ci: 0 },
  { title: "TechCorp Annual Renewal", value: 85000, stage: "Negotiation", ci: 0 },
  { title: "Innovate.io Pilot Program", value: 15000, stage: "Proposal", ci: 1 },
  { title: "GlobalFin Platform Migration", value: 250000, stage: "Qualified", ci: 2 },
  { title: "NexusAI Partnership Deal", value: 75000, stage: "Negotiation", ci: 3 },
  { title: "RetailPlus Digital Suite", value: 95000, stage: "Proposal", ci: 4 },
  { title: "CloudServ Migration Package", value: 180000, stage: "Lead", ci: 5 },
  { title: "HealthTech Compliance Module", value: 65000, stage: "Qualified", ci: 6 },
  { title: "DataVault Analytics Platform", value: 200000, stage: "Won", ci: 7 },
  { title: "DataVault Premium Support", value: 45000, stage: "Proposal", ci: 7 },
  { title: "EduLearn Learning Suite", value: 55000, stage: "Lead", ci: 8 },
  { title: "MfgCorp Automation System", value: 310000, stage: "Negotiation", ci: 9 },
  { title: "Innovate.io Full Deployment", value: 42000, stage: "Lead", ci: 1 },
  { title: "GlobalFin Data Dashboard", value: 35000, stage: "Lost", ci: 2 },
  { title: "RetailPlus POS Integration", value: 28000, stage: "Won", ci: 4 },
];

const insertDeal = db.prepare("INSERT INTO Deal (id, title, value, stage, contactId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)");
for (const d of deals) {
  insertDeal.run(cuid(), d.title, d.value, d.stage, contacts[d.ci].id, now, now);
}

const interactions = [
  { type: "email", subject: "Enterprise proposal follow-up", body: "Sent updated pricing.", ci: 0 },
  { type: "call", subject: "Discovery call", body: "Discussed requirements.", ci: 0 },
  { type: "meeting", subject: "Product demo", body: "Presented full demo.", ci: 0 },
  { type: "email", subject: "Introduction email", body: "Initial outreach.", ci: 1 },
  { type: "call", subject: "Technical discussion", body: "API capabilities deep dive.", ci: 1 },
  { type: "meeting", subject: "Budget review", body: "Q1 budget approved.", ci: 2 },
  { type: "email", subject: "Partnership proposal", body: "Sent framework doc.", ci: 3 },
  { type: "note", subject: "Internal note", body: "High potential account.", ci: 4 },
  { type: "call", subject: "Follow-up call", body: "Addressed migration concerns.", ci: 5 },
  { type: "meeting", subject: "Compliance review", body: "HIPAA review with legal.", ci: 6 },
  { type: "email", subject: "Contract negotiation", body: "Revised contract.", ci: 7 },
  { type: "call", subject: "Roadmap discussion", body: "Shared upcoming features.", ci: 8 },
  { type: "meeting", subject: "Factory visit", body: "On-site visit.", ci: 9 },
  { type: "email", subject: "Quote follow-up", body: "Detailed quote breakdown.", ci: 9 },
];

const insertInteraction = db.prepare("INSERT INTO Interaction (id, type, subject, body, contactId, createdAt) VALUES (?, ?, ?, ?, ?, ?)");
for (const i of interactions) {
  insertInteraction.run(cuid(), i.type, i.subject, i.body, contacts[i.ci].id, now);
}

console.log("CRM Seed complete: 10 contacts, 15 deals, 14 interactions.");
db.close();
