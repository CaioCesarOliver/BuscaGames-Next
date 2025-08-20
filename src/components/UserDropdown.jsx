"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  UserCircle,
  LogOut,
  Settings,
  ScrollText,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";

export default function UserDropdown({ user, onLogout }) {
  const username = user?.userName || "Minha Conta";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-900 to-purple-800 transition">
        <UserCircle className="w-5 h-5" />
        <span className="hidden sm:inline capitalize">{username}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2">
        <Link href="/profile" passHref>
          <DropdownMenuItem as="a" className="cursor-pointer">
            <UserCircle className="w-4 h-4 mr-2" />
            Perfil
          </DropdownMenuItem>
        </Link>

        <Link href="/quests" passHref>
          <DropdownMenuItem as="a" className="cursor-pointer">
            <ScrollText className="w-4 h-4 mr-2" />
            Minhas Quests
          </DropdownMenuItem>
        </Link>

        <Link href="/BackOffice" passHref>
          <DropdownMenuItem as="a" className="cursor-pointer">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Backoffice
          </DropdownMenuItem>
        </Link>

        <Link href="/settings" passHref>
          <DropdownMenuItem as="a" className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
