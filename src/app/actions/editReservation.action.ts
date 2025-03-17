"use server";

import { Reservation } from "@/types";
import { cookies } from "next/headers";

export type ApiResponse = {
  data?: Reservation | Reservation[];
  error?: string;
  status?: number;
};

export async function editReservation(
  id: string,
  reservation: Partial<Reservation>
): Promise<ApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { error: "Autenticação necessária", status: 401 };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "Falha ao atualizar reserva",
        status: response.status,
      };
    }

    return { data, status: response.status };
  } catch (error) {
    console.error("Erro na edição:", error);
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
}
