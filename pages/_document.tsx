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
      <link rel="icon" href="/icons/man.svg" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
