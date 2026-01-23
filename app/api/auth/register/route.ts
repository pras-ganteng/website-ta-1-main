import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://absensholat-api.vercel.app/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // The API expects the data at root level
    const transformedBody = body;

    const backendEndpoint = "/auth/register";

    const response = await fetch(`${API_BASE_URL}${backendEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedBody),
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // If not JSON, return the text content as an error
      const text = await response.text();
      return NextResponse.json(
        { message: `API returned non-JSON response: ${text.substring(0, 100)}...` },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend API error:", data);
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}