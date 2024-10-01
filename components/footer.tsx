function Footer() {
  return (
    <footer className="w-app mt-8 text-sm">
      <div className="mb-5 h-[1px] w-1/3 bg-gradient-to-r from-white/5 from-10% via-white/20 via-70% to-white/5" />

      <p>
        <span className="opacity-75">Created by</span>{' '}
        <a
          href="https://github.com/EduardIonescu"
          target="_blank"
          className="border-b-[1px] border-transparent font-medium transition-colors duration-200 hover:border-white/80"
        >
          Eduard
        </a>
        <span className="opacity-75">.</span>
      </p>
      <p>
        <span className="opacity-75"> Source code on </span>
        <a
          href="https://github.com/EduardIonescu/meditate"
          target="_blank"
          className="border-b-[1px] border-transparent font-medium transition-colors duration-200 hover:border-white/80"
        >
          Github
        </a>
        <span className="opacity-75">.</span>
      </p>
    </footer>
  );
}

export default Footer;
