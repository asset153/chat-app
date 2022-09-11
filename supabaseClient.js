import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pnrtkfwncheonnnnpqkm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucnRrZnduY2hlb25ubm5wcWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI5MDM5NzgsImV4cCI6MTk3ODQ3OTk3OH0.bCjdKANEdJcUshNjsteEDHBO0tXn4-9CCed22kT6Hos"
);

export { supabase };
