import { NextRequest, NextResponse } from "next/server";
import { cmsStore } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, serviceInterest, industryInterest, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const lead = cmsStore.submitLead({
      name,
      email,
      phone,
      company,
      serviceInterest,
      industryInterest,
      budget,
      timeline,
      message,
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const leads = cmsStore.getLeads();
  return NextResponse.json({ leads });
}
