
import Link from "next/link";

import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    href: "https://x.com",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-6 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BookOpen className="size-6" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Book<span className="text-primary">Nook</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              Discover your next favorite book, explore new
              stories, and build your personal reading
              collection with BookNook.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@booknook.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  support@booknook.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +880 1234-567890
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-6 text-muted-foreground">
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              About BookNook
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              A welcoming space for book lovers. Find
              interesting reads, manage your collection,
              and keep track of the books you borrow.
            </p>

            <Link
              href="/books"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Explore Books
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Made with ❤️ for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
