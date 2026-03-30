import axios from "axios";

const emailApi = axios.create({
  baseURL: process.env.EMAIL_APP_URL || "http://localhost:3001",
  timeout: 10000,
});

export async function getEmailsForContact(contactId: string) {
  try {
    const { data } = await emailApi.get(`/api/emails`, {
      params: { contactId },
    });
    return data;
  } catch {
    return { emails: [], error: "Email service unavailable" };
  }
}

export async function getEmailAnalytics() {
  try {
    const { data } = await emailApi.get(`/api/analytics`);
    return data;
  } catch {
    return {
      totalEmails: 0,
      totalSent: 0,
      totalOpened: 0,
      totalCampaigns: 0,
      error: "Email service unavailable",
    };
  }
}
