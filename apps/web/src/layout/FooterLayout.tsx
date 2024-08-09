import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from 'react-icons/io';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Company Name</h1>
            <p className="text-sm">© 2023 All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <IoLogoTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <IoLogoFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <IoLogoInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
