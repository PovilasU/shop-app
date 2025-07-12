import React from "react";

type Props = {
  gitUrl: string;
  linkedinUrl: string;
};

const Footer: React.FC<Props> = ({ gitUrl, linkedinUrl }) => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Povilas . All rights reserved.</p>

        <div className="mt-3 sm:mt-0 flex space-x-6">
          {/* GitHub Link */}
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition font-medium flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.304.76-1.604-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.522.117-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.05.138 3 .404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.654.242 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.81 1.103.81 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.21.698.825.58C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition font-medium flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.355V9h3.414v1.561h.047c.476-.9 1.635-1.852 3.365-1.852 3.6 0 4.27 2.368 4.27 5.452v6.291zM5.337 7.433a2.06 2.06 0 1 1 0-4.119 2.06 2.06 0 0 1 0 4.119zM7.119 20.452H3.556V9h3.563v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.224.792 24 1.771 24h20.451C23.206 24 24 23.224 24 22.271V1.728C24 .774 23.206 0 22.225 0z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
