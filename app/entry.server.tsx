/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.server
 */

import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { getEnv } from "config/env.server";
import createEmotionCache from "styles/createEmotionCache";
import ServerStyleContext from "styles/server.context";
import theme from "themes";

global.ENV = getEnv();

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const Components = () => (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme()}>
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Render the component to a string.
    const html = renderToString(
      <ServerStyleContext.Provider value={null}>
        <Components />
      </ServerStyleContext.Provider>
    );

    // Grab the CSS from emotion
    const { styles } = extractCriticalToChunks(html);

    const markup = (
      <ServerStyleContext.Provider value={styles}>
        <Components />
      </ServerStyleContext.Provider>
    );

    const { pipe, abort } = renderToPipeableStream(markup, {
      onAllReady() {
        const body = new PassThrough();

        responseHeaders.set("Content-Type", "text/html");

        resolve(
          new Response(body, {
            headers: responseHeaders,
            status: responseStatusCode,
          })
        );

        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        responseStatusCode = 500;
        console.error(error);
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const Components = () => (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme()}>
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Render the component to a string.
    const html = renderToString(
      <ServerStyleContext.Provider value={null}>
        <Components />
      </ServerStyleContext.Provider>
    );

    // Grab the CSS from emotion
    const { styles } = extractCriticalToChunks(html);

    const markup = (
      <ServerStyleContext.Provider value={styles}>
        <Components />
      </ServerStyleContext.Provider>
    );

    const { pipe, abort } = renderToPipeableStream(markup, {
      onShellReady() {
        const body = new PassThrough();

        responseHeaders.set("Content-Type", "text/html");

        resolve(
          new Response(body, {
            headers: responseHeaders,
            status: responseStatusCode,
          })
        );

        pipe(body);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
}
