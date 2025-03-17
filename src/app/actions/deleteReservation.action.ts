"use server";

import { Reservation } from "@/types";
import { cookies } from "next/headers";

export type ApiResponse = {
  data?: Reservation | Reservation[];
  error?: string;
  status?: number;
};

export async function deleteReservation(id: string): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { error: "Autenticação necessária", status: 401 };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Falha ao excluir reserva",
        status: response.status,
      };
    }

    return { status: response.status };
  } catch (error) {
    console.error("Erro na exclusão:", error);
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
}