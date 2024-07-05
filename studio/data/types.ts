import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../packages/api-types/types/database'

export type TypedSupabaseClient = SupabaseClient<Database>