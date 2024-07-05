export const IS_PLATFORM = process.env.NEXT_PUBLIC_IS_PLATFORM === 'false'
//export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const IS_PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'test'
