"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: number;
  nameBn: string;
  icon: string;
  slug?: string;
};

const CategoryLink = ({ category }: { category: Category }) => {
  const pathname = usePathname();

  const href = `/category/${category.slug || category.id}`;

  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`py-1.75 px-3.75 rounded-lg cursor-pointer transition-colors ${
          isActive
            ? "bg-[#05893E] text-white"
            : "hover:bg-base-300"
        }`}
      >
        {category.icon} {category.nameBn}
      </Link>
    </li>
  );
};

export default CategoryLink;