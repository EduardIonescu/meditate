import Footer from '@/components/footer';
import Header from '@/components/header';
import MeditateBox from '@/components/meditateBox';
import RandomText from '@/components/randomText';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <MeditateBox />
        <RandomText />
      </main>
      <Footer />
    </>
  );
}
