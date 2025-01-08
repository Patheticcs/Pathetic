import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} /> {/* This renders your pages */}
      <Analytics /> {/* This tracks visitors */}
    </>
  );
}

export default MyApp;
