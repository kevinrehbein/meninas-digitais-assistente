import Image from "next/image";

type BrandMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function BrandMark({ size = 44, className = "", priority = false }: BrandMarkProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/logo-md.svg"
        alt="Logo do Programa Meninas Digitais"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </span>
  );
}
