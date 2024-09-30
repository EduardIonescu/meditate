import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="relative mb-3 h-9 w-9">
        <Image
          src="/icons/meditate-icon.webp"
          fill
          sizes="100%"
          alt=""
          aria-hidden
          className="animate-[spin_45s_linear_infinite] invert-[25%]"
        />
      </div>
      <h1 className="text-3xl">Meditate</h1>
      <p className="mb-12 opacity-75">Online breathing exercises tool.</p>
    </header>
  );
}

export default Header;
