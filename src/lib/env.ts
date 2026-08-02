import { z } from "zod";

const optionalUrl = z
  .preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().url().optional(),
  );

const optionalString = z
  .string()
  .trim()
  .min(1)
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalSecret = z
  .string()
  .trim()
  .min(32)
  .optional()
  .or(z.literal("").transform(() => undefined));

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .trim()
    .url()
    .default("http://localhost:3000"),

  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,

  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalString,
});

const serverEnvSchema = clientEnvSchema.extend({
  SUPABASE_SECRET_KEY: optionalString,
  LEAD_RATE_LIMIT_SECRET: optionalSecret,
  OPENAI_API_KEY: optionalString,
  RESEND_API_KEY: optionalString,

  NOTIFICATION_EMAIL: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

function formatEnvironmentError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
}

export function getClientEnv() {
  const parsedClientEnv = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });

  if (!parsedClientEnv.success) {
    throw new Error(
      `Invalid public environment variables:\n${formatEnvironmentError(
        parsedClientEnv.error,
      )}`,
    );
  }

  return Object.freeze(parsedClientEnv.data);
}

export function getServerEnv() {
  const parsedServerEnv = serverEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    LEAD_RATE_LIMIT_SECRET: process.env.LEAD_RATE_LIMIT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
  });

  if (!parsedServerEnv.success) {
    throw new Error(
      `Invalid server environment variables:\n${formatEnvironmentError(
        parsedServerEnv.error,
      )}`,
    );
  }

  return Object.freeze(parsedServerEnv.data);
}

export function getLeadRateLimitSecret() {
  const secret = process.env.LEAD_RATE_LIMIT_SECRET?.trim();

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("LEAD_RATE_LIMIT_SECRET is required in production.");
  }

  return "development-only-lead-rate-limit-secret";
}
