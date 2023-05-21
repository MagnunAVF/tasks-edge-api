import { Context } from "hono";

export function checkHealth(c: Context) {
    return c.text('OK');
}