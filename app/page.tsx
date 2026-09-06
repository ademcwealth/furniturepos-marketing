import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { Hero } from "@/components/sections/hero";
import { Problem, TrustStrip } from "@/components/sections/trust-and-problem";
import { AiSection } from "@/components/sections/ai";
import { Modules } from "@/components/sections/modules";
import { HowItWorks, MultiBrand, Security } from "@/components/sections/how-and-trust";
import { BlogStrip, DemoCta, Faq } from "@/components/sections/faq-and-cta";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <div className="flex flex-1 flex-col">
      <WelcomeDialog />
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <AiSection />
        <Modules />
        <HowItWorks />
        <Security />
        <MultiBrand />
        <Faq />
        <BlogStrip posts={posts} />
        <DemoCta />
      </main>
      <SiteFooter />
    </div>
  );
}
