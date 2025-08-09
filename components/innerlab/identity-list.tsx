"use client";

import { useInnerLab } from "@/context/innerlab-context";
import { InnerLab } from "./index";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import type { Identity } from "@/types";

interface IdentityListProps {
  predefinedIdentities: Identity[];
  onClose: () => void;
}

export function IdentityList({ predefinedIdentities, onClose }: IdentityListProps) {
  const { identities } = useInnerLab();
  const allIdentities = [...predefinedIdentities, ...identities];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Identidad Creativa
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allIdentities.map((identity) => (
          <InnerLab.Option key={identity.name} identity={identity} />
        ))}
      </div>
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/custom-identity">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            <PlusCircle className="w-5 h-5" />
            Crear Nueva Identidad
          </button>
        </Link>
      </div>
    </div>
  );
}