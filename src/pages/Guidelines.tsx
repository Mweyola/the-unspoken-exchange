import { Header } from "@/components/layout/Header";

const Guidelines = () => (
  <div className="min-h-screen">
    <Header />
    <main className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Community</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold">Community Guidelines</h1>
        <p className="text-muted-foreground">
          Users ask questions and interact at their own risk. Moderators may not catch everything immediately.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Core Principles</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Purpose: This space exists for candid, difficult, or sensitive questions. Curiosity is welcome; harassment is not.</li>
          <li>Respect: Speak about people, cultures, and identities with care. No slurs, personal attacks, or demeaning stereotypes.</li>
          <li>Impact first: If your question involves a group or culture, frame it factually and avoid loaded or hostile language.</li>
          <li>Consent &amp; privacy: Don&apos;t share private info (yours or others&apos;). No doxxing or targeted callouts.</li>
          <li>Safety: Threats, hate speech, incitement, or encouragement of harm are not allowed.</li>
          <li>Quality of dialogue: Ask in good faith and be open to corrections. Disagreement is fine; bad-faith baiting is not.</li>
          <li>At your own risk: Users interact at their own risk; moderators may remove posts or restrict accounts that violate these rules.</li>
          <li>Self-moderation: If you see harmful content, report it. Help keep discussions constructive.</li>
        </ul>
      </section>
    </main>
  </div>
);

export default Guidelines;
