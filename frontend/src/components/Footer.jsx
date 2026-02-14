import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // Footer container
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-6">
      
      {/* Wrapper container to center content */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* ===================== */}
        {/* Top Section - Links   */}
        {/* ===================== */}
        {/* Responsive grid layout for footer links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">

          {/* Navigation Links */}
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>

          <Link to="/privacy" className="hover:text-blue-500">
            Privacy Policy
          </Link>

          <Link to="/terms" className="hover:text-blue-500">
            Terms of Service
          </Link>

          <Link to="/help" className="hover:text-blue-500">
            Help
          </Link>

          <Link to="/developers" className="hover:text-blue-500">
            Developers
          </Link>

          <Link to="/careers" className="hover:text-blue-500">
            Careers
          </Link>

          <Link to="/advertising" className="hover:text-blue-500">
            Advertising
          </Link>
        </div>

        {/* ===================== */}
        {/* Bottom Section - Copyright */}
        {/* ===================== */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          
          {/* Automatically updates year */}
          <p>
            © {new Date().getFullYear()} MyTube. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-6">
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Top Section - Links */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
//           <Link to="/about" className="hover:text-blue-500">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-blue-500">
//             Contact
//           </Link>
//           <Link to="/privacy" className="hover:text-blue-500">
//             Privacy Policy
//           </Link>
//           <Link to="/terms" className="hover:text-blue-500">
//             Terms of Service
//           </Link>
//           <Link to="/help" className="hover:text-blue-500">
//             Help
//           </Link>
//           <Link to="/developers" className="hover:text-blue-500">
//             Developers
//           </Link>
//           <Link to="/careers" className="hover:text-blue-500">
//             Careers
//           </Link>
//           <Link to="/advertising" className="hover:text-blue-500">
//             Advertising
//           </Link>
//         </div>

//         {/* Bottom Section - CopyRight */}
//         <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
//           <p>© {new Date().getFullYear()} MyTube. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
