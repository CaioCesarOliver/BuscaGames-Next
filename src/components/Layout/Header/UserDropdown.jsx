"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, ChevronsUpDown, LogOut, LayoutDashboard } from "lucide-react";

export function UserDropdown() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGoToProfile = () => {
    router.push("/login");
  };

  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 py-2"
        >
          <Avatar className="h-6 w-6">
            <div className="flex items-center justify-center w-full h-full">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start text-xs leading-tight">
            <span className="font-medium">{session.user.name}</span>
            <span className="text-muted-foreground text-[10px]">
              {session.user.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-md">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <div className="flex items-center justify-center w-full h-full">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{session.user.name}</span>
              <span className="truncate text-xs">{session.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleGoToProfile}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Ir para Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}