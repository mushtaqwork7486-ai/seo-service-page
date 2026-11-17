import { onRequestPost, onRequestGet } from "./functions/api/keyword-research.js";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/keyword-research") {
      if (request.method === "POST") {
        return onRequestPost({ request, env, ctx });
      }
      if (request.method === "GET") {
        return onRequestGet({ request, env, ctx });
      }
      return json({ error: "Method not allowed." }, 405);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "API endpoint not found." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
