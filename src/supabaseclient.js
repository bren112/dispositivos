import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tlloofzbovrygcxpxdhb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbG9vZnpib3ZyeWdjeHB4ZGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTMxODEsImV4cCI6MjA0MTgyOTE4MX0.AXnkxzkgrMDaWw_QzaDmCIJJzfa98gX6GbRL13SxExE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
