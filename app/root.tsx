import { withEmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import pick from "lodash.pick";
import type { ReactNode } from "react";
import { useContext, useEffect } from "react";
import { publicEnvVars } from "config/env.server";
import ClientStyleContext from "styles/ClientStyleContext";
import styles from "styles/global.css";
import ServerStyleContext from "styles/server.context";
import theme from "themes";
import { pageTitle } from "utils/formatters";

export const loader: LoaderFunction = () => {
  // Loading public variables into the application frontend.
  return json({
    ENV: pick(ENV, publicEnvVars),
  });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: pageTitle("Lista de Produtos"),
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://unicons.iconscout.com/release/v3.0.0/css/line.css",
  },
  {
    rel: "stylesheet",
    href: styles,
  },
];

interface DocumentProps {
  children: ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);
    const serverStyleData = useContext(ServerStyleContext);
    const { ENV } = useLoaderData<typeof loader>();

    // Only executed on client
    useEffect(() => {
      // re-link sheet container

      // eslint-disable-next-line no-param-reassign
      emotionCache.sheet.container = document.head;

      // re-inject tags
      const { tags } = emotionCache.sheet;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });

      // reset cache to re-apply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="pt">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <ThemeProvider theme={theme()}>
          <body>
            {children}
            <ScrollRestoration />

            {/* Including selected env variables to client-side */}
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(ENV)}`,
              }}
            />

            <Scripts />
            <LiveReload />
          </body>
        </ThemeProvider>
      </html>
    );
  }
);

const App = () => {
  return (
    <Document>
      <Outlet />
    </Document>
  );
};

export default App;
