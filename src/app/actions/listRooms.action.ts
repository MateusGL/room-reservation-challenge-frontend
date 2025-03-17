"use server";

import { Room } from "@/types";
import { cookies } from "next/headers";

export type ApiResponse = {
  data?: Room[];
  error?: string;
  status?: number;
};

export async function listRooms(): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        error: "Autenticação necessária",
        status: 401,
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // cache: "no-store"
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Erro ao buscar salas",
        status: response.status,
      };
    }

    const data: Room[] = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
}
