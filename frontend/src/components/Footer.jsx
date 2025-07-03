import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 px-6 md:px-16 lg:px-24 xl:px-32 pt-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-300 pb-10">
        {/* Logo and Description */}
        <div className="max-w-md">
         <div className="flex items-center space-x-2">
  <img className="w-10 md:w-10" src={assets.yarn} alt="Crochet Logo" />
  <span className="text-xl font-bold text-emerald-400">Crochet.</span>
</div>

          <p className="mt-4 text-sm md:text-base leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-500">Crochet By Aka</span> — where every thread tells a story. From cozy wearables to handmade home decor, our creations are crafted with love and attention to detail.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-[55%]">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold text-gray-800 mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:underline transition-all duration-200 hover:text-indigo-500"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <p className="text-center text-xs md:text-sm text-gray-500 mt-6 mb-4">
        © {new Date().getFullYear()} Crochet By Aka. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
