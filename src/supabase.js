import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://iidpjrogkphcpinpyptq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZHBqcm9na3BoY3BpbnB5cHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTIzMDUsImV4cCI6MjA1ODM4ODMwNX0.H4h8ol3X4osuLs5tAtcBETUa2ujngWMOSeNLRiPgI6I"

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default supabase;