import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { EventCountdownBanner } from "@/components/po2/EventCountdownBanner";
import { WelcomeGate } from "@/components/po2/WelcomeGate";
import { WhatsAppFloat } from "@/components/po2/WhatsAppFloat";
import { PO2_EMAIL, PO2_INSTAGRAM_URL, PO2_LINKEDIN_URL, PO2_PHONE_DISPLAY } from "@/lib/contact";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B" },
      {
        name: "description",
        content: "Assessoria de prospecção ativa B2B com método, inteligência e previsibilidade.",
      },
      { name: "author", content: "PO2 — Matheus Staruck" },
      {
        property: "og:title",
        content: "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B",
      },
      {
        property: "og:description",
        content: "Assessoria de prospecção ativa B2B com método, inteligência e previsibilidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "PO2 — Prospecção de Ouro 2.0 | Assessoria de Prospecção B2B",
      },
      {
        name: "twitter:description",
        content: "Assessoria de prospecção ativa B2B com método, inteligência e previsibilidade.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ef50bc12-88bb-4b38-9497-f9d231af99ea",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ef50bc12-88bb-4b38-9497-f9d231af99ea",
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "PO2 — Prospecção de Ouro 2.0",
          alternateName: "PO2",
          description:
            "Assessoria de prospecção ativa B2B com método, inteligência e previsibilidade — ICP, cadência multicanal, cold call consultiva e gestão de indicadores. Sediada em Porto Alegre, Rio Grande do Sul.",
          url: "https://www.prospeccaoodeouropo2.com/",
          telephone: `+55${PO2_PHONE_DISPLAY.replace(/[^\d]/g, "")}`,
          email: PO2_EMAIL,
          areaServed: [
            { "@type": "City", name: "Porto Alegre" },
            { "@type": "State", name: "Rio Grande do Sul" },
            { "@type": "Country", name: "Brasil" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Porto Alegre",
            addressRegion: "RS",
            addressCountry: "BR",
          },
          founder: {
            "@type": "Person",
            name: "Matheus Staruck",
            jobTitle: "Founder & CEO",
            worksFor: { "@type": "Organization", name: "PO2 — Prospecção de Ouro 2.0" },
            knowsAbout: [
              "Prospecção B2B",
              "Outbound",
              "Inbound",
              "BDR",
              "SDR",
              "Vendas consultivas",
              "Gestão comercial",
            ],
            sameAs: [PO2_LINKEDIN_URL],
          },
          knowsAbout: [
            "Assessoria de prospecção B2B",
            "Consultoria de vendas",
            "Mentoria de prospecção",
            "Estruturação de time comercial",
            "BDR",
            "SDR",
            "Inside Sales",
            "Outbound",
            "Inbound",
          ],
          sameAs: [PO2_LINKEDIN_URL, PO2_INSTAGRAM_URL],
        },
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "llms.txt", href: "/llms.txt" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif&display=swap",
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=AW-18373667171",
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18373667171');`,
      },
      {
        children: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6a7f4d2ab9f7e2000c6d443b"})},
document.head.appendChild(o)}initApollo();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <WelcomeGate />
      <EventCountdownBanner />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <WhatsAppFloat />
      <Toaster theme="dark" position="top-center" richColors />
    </QueryClientProvider>
  );
}
