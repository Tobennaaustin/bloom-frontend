interface LogoProps {
  size?: number
  showText?: boolean
  textColor?: string
}

export function BloomLogo({
  size = 32,
  showText = true,
  textColor = "text-[#222]",
}: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Icon: stylised leaf/bloom mark */}
      <img
        width={size}
        height={size}
        src="/image.png"
      />

      {showText && (
        <span className={`font-bold text-xl tracking-tight ${textColor}`}>
          Bloom
        </span>
      )}
    </div>
  );
}
