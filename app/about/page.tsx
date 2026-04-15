import { Capabilities } from "@/components/capabilities";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";

export default function AboutPage() {
  return (
    <main className="pt-24 lg:pt-28">
      <Capabilities />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
