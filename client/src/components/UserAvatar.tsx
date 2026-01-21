import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Generate initials from name (e.g., "João Gabriel" → "JG")
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Generate consistent color from name hash
function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-cyan-500",
    "bg-teal-500",
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

export function UserAvatar({ name, avatarUrl, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  const displayName = name || "U";
  const initials = getInitials(displayName);
  const bgColor = getColorFromName(displayName);

  if (avatarUrl) {
    return (
      <div
        className={cn(
          "rounded-full border border-border flex items-center justify-center overflow-hidden shadow-sm",
          sizeClasses[size],
          className
        )}
      >
        <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full border border-border flex items-center justify-center text-white font-bold shadow-sm",
        sizeClasses[size],
        bgColor,
        className
      )}
    >
      {initials}
    </div>
  );
}
