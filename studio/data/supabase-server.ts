import { createServerClient } from '@supabase/ssr'
import { Database } from '../packages/api-types/types/database'

export default function useSupabaseServer(context: any) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => context.req.cookies[name],
        set: (name: string, value: string, options: any) => {
          context.res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`)
        },
        remove: (name: string, options: any) => {
          context.res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)
        },
      },
    }
  )
}