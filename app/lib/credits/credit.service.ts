import { prisma } from "../prisma";
import { UsageFeature } from "@/app/generated/prisma/enums";

const FREE_MONTHLY_CREDITS = 6;

export async function initializeCredits(userId: string) {
  const existingCredits = await prisma.credit.findUnique({
    where: {
      userId,
    },
  });

  if (existingCredits) {
    return existingCredits;
  }

  const resetAt = new Date();
  resetAt.setMonth(resetAt.getMonth() + 1);

  return prisma.credit.create({
    data: {
      userId,
      balance: FREE_MONTHLY_CREDITS,
      monthlyLimit: FREE_MONTHLY_CREDITS,
      usedThisMonth: 0,
      resetAt,
    },
  });
}

export async function resetCreditsIfNeeded(userId: string) {
  const credits = await initializeCredits(userId);

  const now = new Date();

  if (credits.resetAt > now) {
    return credits;
  }

  const nextReset = new Date(now);
  nextReset.setMonth(nextReset.getMonth() + 1);

  return prisma.credit.update({
    where: {
      userId,
    },
    data: {
      balance: credits.monthlyLimit,
      usedThisMonth: 0,
      resetAt: nextReset,
    },
  });
}

export async function getCredits(userId: string) {
  return resetCreditsIfNeeded(userId);
}

export async function hasCredits(userId: string) {
  const credits = await resetCreditsIfNeeded(userId);

  return credits.balance > 0;
}

export async function deductCredit(userId: string) {
  await resetCreditsIfNeeded(userId);

  const result = await prisma.credit.updateMany({
    where: {
      userId,
      balance: {
        gt: 0,
      },
    },
    data: {
      balance: {
        decrement: 1,
      },
      usedThisMonth: {
        increment: 1,
      },
    },
  });

  if (result.count === 0) {
    throw new Error("No credits remaining");
  }

  return prisma.credit.findUnique({
    where: {
      userId,
    },
  });
}

export async function refundCredit(userId: string) {
  const credits = await resetCreditsIfNeeded(userId);

  if (credits.usedThisMonth <= 0) {
    return credits;
  }

  return prisma.credit.update({
    where: {
      userId,
    },
    data: {
      balance: {
        increment: 1,
      },
      usedThisMonth: {
        decrement: 1,
      },
    },
  });
}

export async function createUsageLog(
  userId: string,
  feature: UsageFeature,
  creditsUsed: number = 1
) {
  return prisma.usageLog.create({
    data: {
      userId,
      feature,
      creditsUsed,
    },
  });
}