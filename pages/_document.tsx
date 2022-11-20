import { Html, Head, Main, NextScript } from 'next/document'

/**
 * App metadata
 */

export default function Document() {
  return (
    <Html>
      <Head />
      <title>BM Project</title>
      <meta name="description" content="Project for course BM" />
      <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0"></meta>
      <link rel="icon" href="/icons/humanm.svg" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
