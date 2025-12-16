"use client";

import { useCountUp } from "@/hooks/useCountUp";

function ClientHappy() {
  const happyClients = useCountUp(120);
  const projectsCompleted = useCountUp(180);
  const experienceYears = useCountUp(2);
  const countriesServed = useCountUp(8);

  const stats = [
    {
      counter: happyClients,
      label: "Happy Clients",
    },
    {
      counter: projectsCompleted,
      label: "Projects Completed",
    },
    {
      counter: experienceYears,
      label: "Years of Experience",
    },
    {
      counter: countriesServed,
      label: "Countries Served",
    },
  ];

  return (
    <section
      className="text-(--text-primary) w-full py-20 px-4"
      style={{
        backgroundImage: "url('/countup.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "container"
      }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by clients around the world
          </h2>
          <p className="text-(--text-muted) text-lg">
            We build dependable and scalable digital products designed to
            support long-term business growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div
              key={item.label}
              ref={item.counter.ref}
              className="flex flex-col items-center justify-center bg-(--bg-primary) rounded-2xl p-8 border border-(--border-primary) transition hover:shadow-lg"
            >
              <div className="text-4xl font-bold text-(--text-tertiary)">
                {item.counter.value} +
              </div>
              <div className="mt-2 text-lg text-center text-(--text-muted)">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientHappy;
