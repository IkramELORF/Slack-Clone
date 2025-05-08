import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
// J’ai mis en place une middleware d’auth basée sur Convex 
// pour restreindre l’accès aux routes de l’application. 
// Elle redirige dynamiquement selon l’état de session utilisateur,
// tout en respectant les routes publiques comme /auth. 

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (!isPublicPage(request) && (await !convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  if (isPublicPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/");
  }

});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets. (.js, .css, etc.) et /api, _next (interne à Next.js).
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};