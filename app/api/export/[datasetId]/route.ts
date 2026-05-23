import { GATEWAY_URL } from "@/app/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { datasetId: string } }
) {
  const { datasetId } = params;
  const url = `${GATEWAY_URL}/api/v1/export/${datasetId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: response.status });
    }

    const blob = await response.blob();
    const headers = new Headers();
    const disposition = response.headers.get("Content-Disposition");
    if (disposition) {
      headers.set("Content-Disposition", disposition);
    }
    headers.set("Content-Type", response.headers.get("Content-Type") || "text/csv");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "BFF_ERROR",
          message: "No se pudo conectar con el servicio de exportación interno.",
        },
      },
      { status: 500 }
    );
  }
}
