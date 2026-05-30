""
import React from 'react';

export const metadata = {
  title: 'About - NexusFlow',
  description: 'Learn more about NexusFlow and how we connect teams, tools, and workflows.',
};

const AboutPage = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '860px', margin: '0 auto' }}>
      <h1>About NexusFlow</h1>
      <p>
        NexusFlow brings teams, processes, and data together in one connected workspace.
        Our platform helps you align on priorities, automate repetitive tasks, and ship faster.
      </p>
      <section>
        <h2>Our mission</h2>
        <p>
          We build tools that reduce friction, increase visibility, and empower teams to
          collaborate effectively across every stage of the product lifecycle.
        </p>
      </section>
      <section>
        <h2>What we do</h2>
        <ul>
          <li>Integrate your workflows across tools and platforms</li>
          <li>Provide real-time insights and reporting</li>
          <li>Help teams stay focused on outcomes</li>
        </ul>
      </section>
    </main>
  );
};

export default AboutPage;
