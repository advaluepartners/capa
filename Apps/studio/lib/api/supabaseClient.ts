import { createClient } from '@supabase/supabase-js'

// Always create a read-only client, regardless of platform.
const readOnly = createClient(process.env.READ_ONLY_URL ?? '', process.env.READ_ONLY_API_KEY ?? '')
const readOnlyErrMessage = new Error('This client is for read-only actions. Use readWrite instead.')

// Overwrite functions for `readOnly` to enforce read-only behavior.
// Define a common function to override modification methods.
const throwReadOnlyError = () => {
  throw readOnlyErrMessage
};

// Overwrite modification methods for all tables.
['insert', 'delete', 'update'].forEach(method => {
  readOnly.from('').prototype[method] = throwReadOnlyError;
});

// Overwrite RPC calls to prevent execution of stored procedures that may alter data.
readOnly.rpc = throwReadOnlyError;

export { readOnly }


// import { createClient } from '@supabase/supabase-js'
// import { IS_PLATFORM } from '../constants'

// let readOnly: any

// if (IS_PLATFORM) {
//   readOnly = createClient(process.env.READ_ONLY_URL ?? '', process.env.READ_ONLY_API_KEY ?? '')
//   const readOnlyErrMessage = Error('This client is for read-only actions. Use readWrite instead.')

//   // overwrites function calls
//   // for readOnly
//   readOnly.from('').insert = () => {
//     throw readOnlyErrMessage
//   }
//   readOnly.from('').delete = () => {
//     throw readOnlyErrMessage
//   }
//   readOnly.from('').update = () => {
//     throw readOnlyErrMessage
//   }
//   readOnly.rpc = () => {
//     throw readOnlyErrMessage
//   }
// }

// export { readOnly }
