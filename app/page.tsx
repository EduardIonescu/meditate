import MeditateBox from '@/components/meditateBox';

export default function Home() {
  return (
    <main className="flex justify-center py-24 font-[family-name:var(--font-geist-mono)]">
      <section className="w-[450px]">
        <h1 className="text-3xl">Meditate</h1>
        <p className="mb-12 opacity-75">Online breathing exercises tool.</p>

        <MeditateBox />
      </section>
    </main>
  );
}
