import { http, HttpResponse } from "msw";

// every request you're gonna mock, you need a handler for it, the handler is going to intercept that request and is going to return a mock response
// that happens inside the resolver function, as a second arg which is a callback fun
export const handlers = [
  http.get("/api/users", (resolver) => {
    console.log(resolver);
    return HttpResponse.json([
      {
        id: 1,
        name: "Omar",
      },
    ]);
  }),
];
