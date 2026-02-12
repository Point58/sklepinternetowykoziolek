import { createClient } from "./server";

export async function getUserRole(userId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("getUserRole error:", error.message, "for user:", userId);
  }

  return data?.role ?? null;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === "admin";
}
