const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-700 font-footer text-white flex justify-between items-center py-2 px-4 fixed bottom-0 w-full">
      <p className="text-left">Designed and developed by Devraj Joshi with 💓</p>
      <p className="text-right">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
