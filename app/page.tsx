import { createClient } from "@/app/lib/supabase/server";
import { isAdmin } from "@/app/lib/supabase/roles";
import HomeClient from "./HomeClient";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userIsAdmin = user ? await isAdmin(user.id) : false;

  return <HomeClient user={user ? { email: user.email ?? null, isAdmin: userIsAdmin } : null} />;
}
