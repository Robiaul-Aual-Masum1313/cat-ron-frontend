
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import {
  BookOpen,
  Home,
  Library,
  Plus,
  BookMarked,
  Bookmark,
  Menu,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "@/lib/auth-client";

// --------------------
// Types
// --------------------


interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

// --------------------
// Temporary Auth Data
// Replace with your actual authentication context
// --------------------



// --------------------
// Navigation Links
// --------------------

const publicLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "All Books",
    href: "/books",
    icon: Library,
  },
];

const privateLinks: NavLink[] = [
  {
    name: "Add Book",
    href: "/add-book",
    icon: Plus,
  },
  {
    name: "My Books",
    href: "/my-books",
    icon: BookMarked,
  },
  {
    name: "My Borrows",
    href: "/my-borrows",
    icon: Bookmark,
  },
];

// --------------------
// Navbar Component
// --------------------

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const {data:session} = useSession()
  const sessionUser = session?.user
  let isLoggedIn = false;
  if(sessionUser){
    isLoggedIn = true;
  }else{
    isLoggedIn = false
  }
  const handleSignOut = async () => {
    await signOut({
      fetchOptions:{
        onSuccess: () => {
          router.push('/login')
        }
      }
    })
  }


  const navLinks = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  // Check active route
  const isActive = (href: string) => {
    return href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="size-6" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Book<span className="text-primary">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <DropdownMenu>
              {/* Dropdown Trigger */}
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full px-2"
                  />
                }
              >
                <Avatar className="size-9">
                  <AvatarImage
                    src={sessionUser?.image as string}
                    alt={sessionUser?.name}
                  />

                  <AvatarFallback>
                    {sessionUser?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm font-medium">
                  {sessionUser?.name}
                </span>

                <ChevronDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>

              {/* Dropdown Content */}
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p>{sessionUser?.name}</p>

                    <p className="text-xs font-normal text-muted-foreground">
                      {sessionUser?.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                  >
                    <UserRound className="mr-2 size-4" />
                    My Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  variant="destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>

              <Button
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          >
            {/* Sheet Trigger */}
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[300px] flex-col sm:w-[350px]"
            >
              {/* Mobile Logo */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <BookOpen className="size-7 text-primary" />

                <span className="text-xl font-bold">
                  Book<span className="text-primary">Nook</span>
                </span>
              </Link>

              <Separator />

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Authentication */}
              <div className="mt-auto space-y-4">
                <Separator />

                {isLoggedIn ? (
                  <>
                    {/* User Information */}
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={sessionUser?.image as string}
                          alt={sessionUser?.name}
                        />

                        <AvatarFallback>
                          {sessionUser?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {sessionUser?.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {sessionUser?.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push("/profile");
                      }}
                    >
                      <UserRound className="mr-2 size-4" />
                      My Profile
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push("/login");
                      }}
                    >
                      Login
                    </Button>

                    <Button
                      onClick={() => {
                        setMobileOpen(false);
                        router.push("/register");
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
