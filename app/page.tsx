import Footer from '@/components/footer';
import Header from '@/components/header';
import MeditateBox from '@/components/meditateBox';
import RandomText from '@/components/randomText';

export default function Home() {
  return (
    <main className="flex justify-center py-24 font-[family-name:var(--font-geist-mono)]">
      <section className="w-[450px]">
        <Header />
        <MeditateBox />
        <RandomText />
        <Footer />
      </section>
    </main>
  );
}
