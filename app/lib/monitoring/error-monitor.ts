import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
  feature?: string;
  userId?: string;
  route?: string;
}

export function captureError(
  error: unknown,
  context?: ErrorContext
) {
  console.error(
    `[${context?.feature ?? "Application"}]`,
    error
  );

  Sentry.captureException(error, {
    tags: {
      feature: context?.feature,
      route: context?.route,
    },
    user: context?.userId
      ? { id: context.userId }
      : undefined,
  });
}