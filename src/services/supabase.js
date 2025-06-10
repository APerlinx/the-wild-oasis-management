import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://heeokwtwjdqwobgqtwvr.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZW9rd3R3amRxd29iZ3F0d3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzY1NzgsImV4cCI6MjA2NDk1MjU3OH0.rvmWfwlLLCiCHpQ6b0YYu2w9MV2etJSLPg5T_4G9LOw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
