import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What furniturepos.com collects and what it does with it.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
        <div className="prose-fos mt-8 text-muted">
          <p>
            This site is the public front door for Furniture OS. It collects as little as it can.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Demo requests.</strong> What you type into the form is emailed to the Furniture OS
              team so we can prepare a walkthrough. We keep it in our inbox and use it for nothing else.
            </li>
            <li>
              <strong>Analytics.</strong> Anonymous page-view counts with no cookies and no
              cross-site tracking.
            </li>
            <li>
              <strong>Your welcome-dialog choice.</strong> Stored in your own browser so we don&apos;t ask
              again. It never leaves your device.
            </li>
          </ul>
          <h2>What we don&apos;t do</h2>
          <ul>
            <li>No newsletters unless you ask for one.</li>
            <li>No selling or sharing of contact details.</li>
            <li>No advertising pixels.</li>
          </ul>
          <p>
            Questions about the app itself, including how customer data is handled inside Furniture
            OS, are answered on your first call with us. Use the demo form to reach the team.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
