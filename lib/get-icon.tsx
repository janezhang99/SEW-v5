import {
  Package,
  Laptop,
  Users,
  Map,
  Home,
  Megaphone,
  GraduationCap,
  Heart,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

type IconName =
  | "Package"
  | "Laptop"
  | "Users"
  | "Map"
  | "Home"
  | "Megaphone"
  | "GraduationCap"
  | "Heart"
  | "MoreHorizontal"

const iconMap: Record<IconName, LucideIcon> = {
  Package,
  Laptop,
  Users,
  Map,
  Home,
  Megaphone,
  GraduationCap,
  Heart,
  MoreHorizontal,
}

/**
 * Get a Lucide icon component by name
 * @param name The name of the icon
 * @returns The icon component
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] || MoreHorizontal
}
