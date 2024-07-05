import { useQueryClient } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'

import { useFlag } from 'hooks'
import { BASE_PATH } from 'lib/constants'
import { auth, buildPathWithParams, getAccessToken, getReturnToPath } from 'lib/gotrue'
import { tweets } from 'shared-data'
import { Button, IconFileText } from 'ui'

type SignInLayoutProps = {
  heading: string
  subheading: string
  showDisclaimer?: boolean
  logoLinkToMarketingSite?: boolean
}

const SignInLayout = ({
  heading,
  subheading,
  showDisclaimer = true,
  logoLinkToMarketingSite = false,
  children,
}: PropsWithChildren<SignInLayoutProps>) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { resolvedTheme } = useTheme()
  const ongoingIncident = useFlag('ongoingIncident')

  useEffect(() => {
    auth
      .initialize()
      .then(async ({ error }) => {
        if (error) {
          return
        }

        const token = await getAccessToken()

        if (token) {
          const { data, error } = await auth.mfa.getAuthenticatorAssuranceLevel()
          if (error) {
            return
          }

          if (data) {
            if (router.pathname === '/sign-in-mfa') {
              return
            }
            if (data.currentLevel !== data.nextLevel) {
              const redirectTo = buildPathWithParams('/sign-in-mfa')
              router.replace(redirectTo)
              return
            }
          }

          await queryClient.resetQueries()
          router.push(getReturnToPath())
        } else {
          const redirectTo = buildPathWithParams('/sign-in')
          router.replace(redirectTo)
          return
        }
      })
      .catch(() => {})
  }, [])

  const [quote, setQuote] = useState<{
    text: string
    url: string
    handle: string
    img_url: string
  } | null>(null)

  useEffect(() => {
    if (tweets && tweets.length > 0) {
      const randomQuote = tweets[Math.floor(Math.random() * tweets.length)]
      setQuote(randomQuote)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col flex-1 bg-alternative">
        <div
          className={`absolute top-0 w-full px-8 mx-auto sm:px-6 lg:px-8 ${
            ongoingIncident ? 'mt-14' : 'mt-6'
          }`}
        >
          <nav className="relative flex items-center justify-between sm:h-10">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href={logoLinkToMarketingSite ? 'http://localhost:3000' : '/projects'}>
                  <Image
                    src={
                      resolvedTheme?.includes('light')
                        ? `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
                        : `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
                    }
                    alt="Advalue Logo"
                    height={49}
                    width={250}
                  />
                </Link>
              </div>
            </div>

            <div className="items-center hidden space-x-3 md:ml-10 md:flex md:pr-4">
              <Button asChild type="default" icon={<IconFileText />}>
                <Link href="https://supabase.com/docs" target="_blank" rel="noreferrer">
                  Documentation
                </Link>
              </Button>
            </div>
          </nav>
        </div>

        <div className="flex flex-1">
          <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-studio border-default">
            <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
              <div className="mb-10">
                <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">{heading}</h1>
                <h2 className="text-sm text-foreground-light">{subheading}</h2>
              </div>

              {children}
            </div>

            {showDisclaimer && (
              <div className="sm:text-center">
                <p className="text-xs text-foreground-lighter sm:mx-auto sm:max-w-sm">
                  By continuing, you agree to CapitalA's{' '}
                  <Link
                    href="https://capital-a.com/terms"
                    className="underline hover:text-foreground-light"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="https://capital-a.com/privacy"
                    className="underline hover:text-foreground-light"
                  >
                    Privacy Policy
                  </Link>
                  , and to receive periodic emails with updates.
                </p>
              </div>
            )}
          </main>

          <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
            {quote !== null && (
              <div className="relative flex flex-col gap-6">
                <div className="absolute select-none -top-12 -left-11">
                  <span className="text-[160px] leading-none text-foreground-muted/30">{'“'}</span>
                </div>

                <blockquote className="z-10 max-w-lg text-3xl">{quote.text}</blockquote>

                <a
                  href={quote.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <img
                    src={`https://supabase.com${quote.img_url}`}
                    alt={quote.handle}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex flex-col">
                    <cite className="not-italic font-medium text-foreground-light whitespace-nowrap">
                      @{quote.handle}
                    </cite>
                  </div>
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}

export default SignInLayout

// import { useQueryClient } from '@tanstack/react-query'
// import { useTheme } from 'next-themes'
// import Image from 'next/legacy/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { PropsWithChildren, useEffect, useState } from 'react'

// import { useFlag } from 'hooks'
// import { BASE_PATH } from 'lib/constants'
// import { auth, buildPathWithParams, getAccessToken, getReturnToPath } from 'lib/gotrue'
// import { tweets } from 'shared-data'
// import { Button, IconFileText } from 'ui'

// type SignInLayoutProps = {
//   heading: string
//   subheading: string
//   showDisclaimer?: boolean
//   logoLinkToMarketingSite?: boolean
// }

// const SignInLayout = ({
//   heading,
//   subheading,
//   showDisclaimer = true,
//   logoLinkToMarketingSite = false,
//   children,
// }: PropsWithChildren<SignInLayoutProps>) => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   const { resolvedTheme } = useTheme()
//   const ongoingIncident = useFlag('ongoingIncident')

//   // This useEffect redirects the user to MFA if they're already halfway signed in
//   useEffect(() => {
//     auth
//       .initialize()
//       .then(async ({ error }) => {
//         if (error) {
//           // if there was a problem signing in via the url, don't redirect
//           return
//         }

//         const token = await getAccessToken()

//         if (token) {
//           const { data, error } = await auth.mfa.getAuthenticatorAssuranceLevel()
//           if (error) {
//             // if there was a problem signing in via the url, don't redirect
//             return
//           }

//           if (data) {
//             // we're already where we need to be
//             if (router.pathname === '/sign-in-mfa') {
//               return
//             }
//             if (data.currentLevel !== data.nextLevel) {
//               const redirectTo = buildPathWithParams('/sign-in-mfa')
//               router.replace(redirectTo)
//               return
//             }
//           }

//           await queryClient.resetQueries()
//           router.push(getReturnToPath())
//         } else {
//           // if the user doesn't have a token, he needs to go back to the sign-in page
//           const redirectTo = buildPathWithParams('/sign-in')
//           router.replace(redirectTo)
//           return
//         }
//       })
//       .catch(() => {}) // catch all errors thrown by auth methods
//   }, [])

//   const [quote, setQuote] = useState<{
//     text: string
//     url: string
//     handle: string
//     img_url: string
//   } | null>(null)

//   useEffect(() => {
//     if (tweets && tweets.length > 0) {
//       const randomQuote = tweets[Math.floor(Math.random() * tweets.length)]
//       setQuote(randomQuote)
//     }
//   }, [])

//   return (
//     <>
//       <div className="flex flex-col flex-1 bg-alternative">
//         <div
//           className={`absolute top-0 w-full px-8 mx-auto sm:px-6 lg:px-8 ${
//             ongoingIncident ? 'mt-14' : 'mt-6'
//           }`}
//         >
//           <nav className="relative flex items-center justify-between sm:h-10">
//             <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
//               <div className="flex items-center justify-between w-full md:w-auto">
//                 <Link href={logoLinkToMarketingSite ? 'http://localhost:8082' : '/projects'}>
//                   <Image
//                     src={
//                       resolvedTheme?.includes('dark')
//                         ? `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
//                         : `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
//                     }
//                     alt="Advalue Logo"
//                     height={24}
//                     width={120}
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="items-center hidden space-x-3 md:ml-10 md:flex md:pr-4">
//               <Button asChild type="default" icon={<IconFileText />}>
//                 <Link href="https://supabase.com/docs" target="_blank" rel="noreferrer">
//                   Documentation
//                 </Link>
//               </Button>
//             </div>
//           </nav>
//         </div>

//         <div className="flex flex-1">
//           <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-studio border-default">
//             <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
//               <div className="mb-10">
//                 <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">{heading}</h1>
//                 <h2 className="text-sm text-foreground-light">{subheading}</h2>
//               </div>

//               {children}
//             </div>

//             {showDisclaimer && (
//               <div className="sm:text-center">
//                 <p className="text-xs text-foreground-lighter sm:mx-auto sm:max-w-sm">
//                   By continuing, you agree to CapitalA's{' '}
//                   <Link
//                     href="https://capital-a.com/terms"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link
//                     href="https://capital-a.com/privacy"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Privacy Policy
//                   </Link>
//                   , and to receive periodic emails with updates.
//                 </p>
//               </div>
//             )}
//           </main>

//           <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
//             {quote !== null && (
//               <div className="relative flex flex-col gap-6">
//                 <div className="absolute select-none -top-12 -left-11">
//                   <span className="text-[160px] leading-none text-foreground-muted/30">{'“'}</span>
//                 </div>

//                 <blockquote className="z-10 max-w-lg text-3xl">{quote.text}</blockquote>

//                 <a
//                   href={quote.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-4"
//                 >
//                   <img
//                     src={`https://supabase.com${quote.img_url}`}
//                     alt={quote.handle}
//                     className="w-12 h-12 rounded-full"
//                   />

//                   <div className="flex flex-col">
//                     <cite className="not-italic font-medium text-foreground-light whitespace-nowrap">
//                       @{quote.handle}
//                     </cite>
//                   </div>
//                 </a>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignInLayout


// second commit 
// import { useQueryClient } from '@tanstack/react-query'
// import { useTheme } from 'next-themes'
// import Image from 'next/legacy/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { PropsWithChildren, useEffect, useState } from 'react'

// import { useFlag } from 'hooks'
// import { BASE_PATH } from 'lib/constants'
// import { auth, buildPathWithParams, getAccessToken, getReturnToPath } from 'lib/gotrue'
// import { tweets } from 'shared-data'
// import { Button, IconFileText } from 'ui'

// type SignInLayoutProps = {
//   heading: string
//   subheading: string
//   showDisclaimer?: boolean
//   logoLinkToMarketingSite?: boolean
// }

// const SignInLayout = ({
//   heading,
//   subheading,
//   showDisclaimer = true,
//   logoLinkToMarketingSite = false,
//   children,
// }: PropsWithChildren<SignInLayoutProps>) => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   const { resolvedTheme } = useTheme()
//   const ongoingIncident = useFlag('ongoingIncident')

//   // This useEffect redirects the user to MFA if they're already halfway signed in
//   useEffect(() => {
//     auth
//       .initialize()
//       .then(async ({ error }) => {
//         if (error) {
//           // if there was a problem signing in via the url, don't redirect
//           return
//         }

//         const token = await getAccessToken()

//         if (token) {
//           const { data, error } = await auth.mfa.getAuthenticatorAssuranceLevel()
//           if (error) {
//             // if there was a problem signing in via the url, don't redirect
//             return
//           }

//           if (data) {
//             // we're already where we need to be
//             if (router.pathname === '/sign-in-mfa') {
//               return
//             }
//             if (data.currentLevel !== data.nextLevel) {
//               const redirectTo = buildPathWithParams('/sign-in-mfa')
//               router.replace(redirectTo)
//               return
//             }
//           }

//           await queryClient.resetQueries()
//           router.push(getReturnToPath())
//         } else {
//           // if the user doesn't have a token, he needs to go back to the sign-in page
//           const redirectTo = buildPathWithParams('/sign-in')
//           router.replace(redirectTo)
//           return
//         }
//       })
//       .catch(() => {}) // catch all errors thrown by auth methods
//   }, [])

//   const [quote, setQuote] = useState<{
//     text: string
//     url: string
//     handle: string
//     img_url: string
//   } | null>(null)

//   useEffect(() => {
//     const randomQuote = tweets[Math.floor(Math.random() * tweets.length)]

//     setQuote(randomQuote)
//   }, [])

//   return (
//     <>
//       <div className="flex flex-col flex-1 bg-alternative">
//         <div
//           className={`absolute top-0 w-full px-8 mx-auto sm:px-6 lg:px-8 ${
//             ongoingIncident ? 'mt-14' : 'mt-6'
//           }`}
//         >
//           <nav className="relative flex items-center justify-between sm:h-10">
//             <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
//               <div className="flex items-center justify-between w-full md:w-auto">
//                 <Link href={logoLinkToMarketingSite ? 'http://localhost:8082' : '/projects'}>
//                   <Image
//                     src={
//                       resolvedTheme?.includes('dark')
//                         ? `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
//                         : `https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcxOTY4NTcxOSwiZXhwIjoxNzIyMjc3NzE5fQ.ovbYm8PIhiAZNWduheIjgKJ6P2IsLh-9gCTUUa6vmsk&t=2024-06-29T18%3A28%3A39.815Z`
//                     }
//                     alt="Advalue Logo"
//                     height={24}
//                     width={120}
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="items-center hidden space-x-3 md:ml-10 md:flex md:pr-4">
//               <Button asChild type="default" icon={<IconFileText />}>
//                 <Link href="https://supabase.com/docs" target="_blank" rel="noreferrer">
//                   Documentation
//                 </Link>
//               </Button>
//             </div>
//           </nav>
//         </div>

//         <div className="flex flex-1">
//           <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-studio border-default">
//             <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
//               <div className="mb-10">
//                 <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">{heading}</h1>
//                 <h2 className="text-sm text-foreground-light">{subheading}</h2>
//               </div>

//               {children}
//             </div>

//             {showDisclaimer && (
//               <div className="sm:text-center">
//                 <p className="text-xs text-foreground-lighter sm:mx-auto sm:max-w-sm">
//                   By continuing, you agree to CapitalA's{' '}
//                   <Link
//                     href="https://capital-a.com/terms"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link
//                     href="https://capital-a.com/privacy"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Privacy Policy
//                   </Link>
//                   , and to receive periodic emails with updates.
//                 </p>
//               </div>
//             )}
//           </main>

//           <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
//             {quote !== null && (
//               <div className="relative flex flex-col gap-6">
//                 <div className="absolute select-none -top-12 -left-11">
//                   <span className="text-[160px] leading-none text-foreground-muted/30">{'“'}</span>
//                 </div>

//                 <blockquote className="z-10 max-w-lg text-3xl">{quote.text}</blockquote>

//                 <a
//                   href={quote.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-4"
//                 >
//                   <img
//                     src={`https://supabase.com${quote.img_url}`}
//                     alt={quote.handle}
//                     className="w-12 h-12 rounded-full"
//                   />

//                   <div className="flex flex-col">
//                     <cite className="not-italic font-medium text-foreground-light whitespace-nowrap">
//                       @{quote.handle}
//                     </cite>
//                   </div>
//                 </a>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignInLayout

// import { useQueryClient } from '@tanstack/react-query'
// import { useTheme } from 'next-themes'
// import Image from 'next/legacy/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { PropsWithChildren, useEffect, useState } from 'react'

// import { useFlag } from 'hooks'
// import { BASE_PATH } from 'lib/constants'
// import { auth, buildPathWithParams, getAccessToken, getReturnToPath } from 'lib/gotrue'
// import { tweets } from 'shared-data'
// import { Button, IconFileText } from 'ui'

// type SignInLayoutProps = {
//   heading: string
//   subheading: string
//   showDisclaimer?: boolean
//   logoLinkToMarketingSite?: boolean
// }

// const SignInLayout = ({
//   heading,
//   subheading,
//   showDisclaimer = true,
//   logoLinkToMarketingSite = false,
//   children,
// }: PropsWithChildren<SignInLayoutProps>) => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   const { resolvedTheme } = useTheme()
//   const ongoingIncident = useFlag('ongoingIncident')

//   // This useEffect redirects the user to MFA if they're already halfway signed in
//   useEffect(() => {
//     auth
//       .initialize()
//       .then(async ({ error }) => {
//         if (error) {
//           // if there was a problem signing in via the url, don't redirect
//           return
//         }

//         const token = await getAccessToken()

//         if (token) {
//           const { data, error } = await auth.mfa.getAuthenticatorAssuranceLevel()
//           if (error) {
//             // if there was a problem signing in via the url, don't redirect
//             return
//           }

//           if (data) {
//             // we're already where we need to be
//             if (router.pathname === '/sign-in-mfa') {
//               return
//             }
//             if (data.currentLevel !== data.nextLevel) {
//               const redirectTo = buildPathWithParams('/sign-in-mfa')
//               router.replace(redirectTo)
//               return
//             }
//           }

//           await queryClient.resetQueries()
//           router.push(getReturnToPath())
//         } else {
//           // if the user doesn't have a token, he needs to go back to the sign-in page
//           const redirectTo = buildPathWithParams('/sign-in')
//           router.replace(redirectTo)
//           return
//         }
//       })
//       .catch(() => {}) // catch all errors thrown by auth methods
//   }, [])

//   const [quote, setQuote] = useState<{
//     text: string
//     url: string
//     handle: string
//     img_url: string
//   } | null>(null)

//   useEffect(() => {
//     const randomQuote = tweets[Math.floor(Math.random() * tweets.length)]

//     setQuote(randomQuote)
//   }, [])

//   return (
//     <>
//       <div className="flex flex-col flex-1 bg-alternative">
//         <div
//           className={`absolute top-0 w-full px-8 mx-auto sm:px-6 lg:px-8 ${
//             ongoingIncident ? 'mt-14' : 'mt-6'
//           }`}
//         >
//           <nav className="relative flex items-center justify-between sm:h-10">
//             <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
//               <div className="flex items-center justify-between w-full md:w-auto">
//                 <Link href={logoLinkToMarketingSite ? 'https://supabase.com' : '/projects'}>
//                   <Image
//                     src={
//                       resolvedTheme?.includes('dark')
//                         ? `${BASE_PATH}/img/supabase-dark.svg`
//                         : `${BASE_PATH}/img/supabase-light.svg`
//                     }
//                     alt="Supabase Logo"
//                     height={24}
//                     width={120}
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="items-center hidden space-x-3 md:ml-10 md:flex md:pr-4">
//               <Button asChild type="default" icon={<IconFileText />}>
//                 <Link href="https://supabase.com/docs" target="_blank" rel="noreferrer">
//                   Documentation
//                 </Link>
//               </Button>
//             </div>
//           </nav>
//         </div>

//         <div className="flex flex-1">
//           <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-studio border-default">
//             <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
//               <div className="mb-10">
//                 <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">{heading}</h1>
//                 <h2 className="text-sm text-foreground-light">{subheading}</h2>
//               </div>

//               {children}
//             </div>

//             {showDisclaimer && (
//               <div className="sm:text-center">
//                 <p className="text-xs text-foreground-lighter sm:mx-auto sm:max-w-sm">
//                   By continuing, you agree to Supabase's{' '}
//                   <Link
//                     href="https://supabase.com/terms"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link
//                     href="https://supabase.com/privacy"
//                     className="underline hover:text-foreground-light"
//                   >
//                     Privacy Policy
//                   </Link>
//                   , and to receive periodic emails with updates.
//                 </p>
//               </div>
//             )}
//           </main>

//           <aside className="flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
//             {quote !== null && (
//               <div className="relative flex flex-col gap-6">
//                 <div className="absolute select-none -top-12 -left-11">
//                   <span className="text-[160px] leading-none text-foreground-muted/30">{'“'}</span>
//                 </div>

//                 <blockquote className="z-10 max-w-lg text-3xl">{quote.text}</blockquote>

//                 <a
//                   href={quote.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-4"
//                 >
//                   <img
//                     src={`https://supabase.com${quote.img_url}`}
//                     alt={quote.handle}
//                     className="w-12 h-12 rounded-full"
//                   />

//                   <div className="flex flex-col">
//                     <cite className="not-italic font-medium text-foreground-light whitespace-nowrap">
//                       @{quote.handle}
//                     </cite>
//                   </div>
//                 </a>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignInLayout
