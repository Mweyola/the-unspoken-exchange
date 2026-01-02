import { Header } from "@/components/layout/Header";

const Privacy = () => (
  <div className="min-h-screen">
    <Header />
    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Privacy</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
        <p className="text-muted-foreground">
          This policy explains how we handle information on Unfiltered. By using the site, you agree to these practices.
          We aim to respect privacy while keeping the community safe.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">What we collect</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Account and profile details you provide (e.g., display name, contact info, profile text).</li>
          <li>Content you post (questions, answers, listings, messages) including any personal data you choose to share.</li>
          <li>Usage data: pages visited, features used, timestamps, and basic device/technical data (browser, OS, IP-derived region).</li>
          <li>Communications with us (support requests, reports) and moderation signals (flags, actions taken).</li>
          <li>Cookies or similar technologies to maintain sessions, preferences, and basic analytics.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">How we use information</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Operate, maintain, and improve the site and its safety systems.</li>
          <li>Provide core features (accounts, posting, search, notifications, marketplace listings).</li>
          <li>Detect, investigate, and prevent fraud, abuse, harassment, and security incidents.</li>
          <li>Moderate content to enforce community guidelines and legal requirements.</li>
          <li>Respond to support requests and user reports.</li>
          <li>Comply with applicable laws or enforce our terms, including cooperating with lawful requests.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Sharing and disclosure</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Public content you post may be visible to others; avoid sharing sensitive information.</li>
          <li>Service providers may process data on our behalf (hosting, analytics, security) under confidentiality obligations.</li>
          <li>We may share information to comply with legal obligations or protect rights, safety, and property of users or the service.</li>
          <li>In a merger, acquisition, or transfer, data may be transferred under equivalent protections.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Your choices and responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Control what you share publicly; do not post private data you do not want exposed.</li>
          <li>You may request access, correction, or deletion of personal data where legally applicable.</li>
          <li>Cookies can be managed through your browser settings; some features may require cookies to function.</li>
          <li>Use reporting tools to flag harmful content; moderators may take action consistent with the guidelines.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Data retention and security</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>We retain data as needed to operate the service, comply with law, resolve disputes, and enforce terms.</li>
          <li>We use reasonable technical and organizational measures to protect data, but no system is 100% secure.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Children</h2>
        <p className="text-muted-foreground">
          The service is not directed to children under 13 (or older where local law requires). Do not use the site if you
          are under the applicable age threshold.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Changes</h2>
        <p className="text-muted-foreground">
          We may update this policy. Continued use after changes means you accept the revised policy. Material changes
          will be communicated through the site or other reasonable means.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          If you have questions about this policy or your data rights, contact the site administrator or support channel
          provided in the app.
        </p>
      </section>
    </main>
  </div>
);

export default Privacy;
