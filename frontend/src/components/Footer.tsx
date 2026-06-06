"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Camera, Globe } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative z-10 bg-[#0a291f] dark:bg-[#0c0b0a] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-serif text-accent mb-6">Vikas Residency</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Experience the spiritual essence of Varanasi while enjoying premium comfort. Your home away from home near the holy ghats.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/rooms" className="hover:text-accent transition-colors">Our Rooms</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Travel Blog</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Top SEO Pages */}
          <div>
            <h3 className="text-xl font-bold mb-6">Explore Varanasi</h3>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/homestay-near-ghat" className="hover:text-accent transition-colors">Homestay near Ghats</Link></li>
              <li><Link href="/budget-homestay-varanasi" className="hover:text-accent transition-colors">Budget Homestay Varanasi</Link></li>
              <li><Link href="/family-homestay-varanasi" className="hover:text-accent transition-colors">Family Homestay in Kashi</Link></li>
              <li><Link href="/location" className="hover:text-accent transition-colors">How to Reach</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <a href="https://maps.google.com/?cid=1451854382510599188" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  D57/48A-4, Sonia Rd, Maulvibagh, Jahumandi, Varanasi, UP 221010
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-accent shrink-0 mt-1" size={20} />
                <div className="flex flex-col">
                  <a href="tel:+919795756509" className="hover:text-accent transition-colors">+91 97957 56509</a>
                  <a href="tel:+918318635270" className="hover:text-accent transition-colors mt-1">+91 83186 35270</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <a href="mailto:vikasresidency384@gmail.com" className="hover:text-accent transition-colors">vikasresidency384@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50 flex flex-col md:flex-row justify-between items-center">
          <p 
            className="cursor-pointer select-none"
            onDoubleClick={() => router.push('/admin')}
            title="Double click for admin access"
          >
            © {new Date().getFullYear()} Vikas Residency. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
