import { prisma } from "../prisma";

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
  const credits = await resetCreditsIfNeeded(userId);

  if (credits.balance <= 0) {
    throw new Error("No credits remaining");
  }

  return prisma.credit.update({
    where: {
      userId,
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