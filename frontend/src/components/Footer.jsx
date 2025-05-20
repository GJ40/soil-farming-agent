import React from 'react';

function Footer() {
    return (
        <footer className="bg-green-700 text-white mt-10">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                {/* Left Section */}
                <p className="text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} Soil Farming Agent. All rights reserved.
                </p>

                {/* Right Section */}
                <div className="mt-4 md:mt-0 space-x-4">
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/#about" className="hover:underline">
                        About
                    </a>
                    <a href="/#contact" className="hover:underline">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
