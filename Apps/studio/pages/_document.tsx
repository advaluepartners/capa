import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { BASE_PATH } from 'lib/constants'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    const monacoEditorCssUrl = process.env.NEXT_PUBLIC_IS_PLATFORM === 'false'
      ? 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs/editor/editor.main.css'
      : `${BASE_PATH}/monaco-editor/editor/editor.main.css`

    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            data-name="vs/editor/editor.main"
            href={monacoEditorCssUrl}
          />
          <link rel="stylesheet" type="text/css" href={`${BASE_PATH}/css/fonts.css`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// /* eslint-disable @next/next/no-css-tags */
// import { BASE_PATH } from 'lib/constants'
// import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await Document.getInitialProps(ctx)

//     return initialProps
//   }

//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           {/* Workaround for https://github.com/suren-atoyan/monaco-react/issues/272 */}
//           <link
//             rel="stylesheet"
//             type="text/css"
//             data-name="vs/editor/editor.main"
//             href={
//               IS_PLATFORM
//                 ? 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs/editor/editor.main.css'
//                 : `${BASE_PATH}/monaco-editor/editor/editor.main.css`
//             }
//           />
//           <link rel="stylesheet" type="text/css" href={`${BASE_PATH}/css/fonts.css`} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument
