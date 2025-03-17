"use server";

import { registerSchema } from "../schemas/auth-schemas";
import { cookies } from "next/headers";

export type RegisterState = {
  fieldErrors?: Record<string, string[]>;
  serverError?: string;
  success?: boolean;
};

export async function registerUser(
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const result = registerSchema.safeParse(rawData);

    if (!result.success) {
      return {
        fieldErrors: result.error.flatten().fieldErrors,
        serverError: "",
        success: false,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      return {
        fieldErrors: {},
        serverError: errorData.message || "Erro no registro",
        success: false,
      };
    }
    
    if (responseData.access_token) {
      const cookieStore = await cookies()
      cookieStore.set("access_token", responseData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return { success: true, fieldErrors: {}, serverError: "" };
  } catch (error) {
    return {
      fieldErrors: {},
      serverError: error instanceof Error ? error.message : "Erro desconhecido",
      success: false,
    };
  }
}
