import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis  = Redis.fromEnv();

const rateLimiters = {
    normal: new Ratelimit({
        redis , 
        limiter: Ratelimit.slidingWindow(60,'1 m'),
        prefix: "devegenome:ratelimit:normal",
    }),

    builder: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30,"1 m"),
        prefix: "devgenome:ratelimit:builder",
    }),

    ai: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10,"1 m"),
        prefix: "devgenome:ratelimit:ai",
    }),

    heavy: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20,"1 m"),
        prefix: "devgenome:ratelimit:heavy"
    }),
};

export type RateLimitType = keyof typeof rateLimiters;

export async function checkRateLimit(
    userId: string,
    type: RateLimitType
){
    return rateLimiters[type].limit(userId);
}