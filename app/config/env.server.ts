import { z } from "zod";

const schema = z.object({
  APP_NAME: z.string().min(1).default("Lojinha Importados"),
  HOME_REDIRECT_LINK: z.string().min(1).default("/lista"),
  GOOGLE_SHEETS_URL: z.string().min(1),
});

type ENV = z.infer<typeof schema>;

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}

export const getEnv = () => schema.parse(process.env);

/**
 * All the Env variables that will be available to application's client-side.
 * @example
 * ["APP_NAME"]
 */
export const publicEnvVars: string[] = ["APP_NAME"];
