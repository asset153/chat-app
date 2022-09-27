import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_APP_PROJECT_URL,
  import.meta.env.VITE_APP_PUBLIC_ANON_KEY
);

export { supabase };
