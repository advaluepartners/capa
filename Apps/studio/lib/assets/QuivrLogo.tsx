import Image from "next/image";

interface QuivrLogoProps {
  size: number;
  color?: "white" | "black" | "primary" | "accent";
}

export const QuivrLogo = ({
  size,
  color = "white",
}: QuivrLogoProps): JSX.Element => {
  let src = "https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcyMTE0NDE0MSwiZXhwIjoxNzUyNjgwMTQxfQ.j_1xpfB8EYwlUWTZnJUEDV9LG_TMoFXOhUqIBFS-Pv4&t=2024-07-16T15%3A35%3A41.781Z";
  if (color === "primary") {
    src = "https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcyMTE0NDE0MSwiZXhwIjoxNzUyNjgwMTQxfQ.j_1xpfB8EYwlUWTZnJUEDV9LG_TMoFXOhUqIBFS-Pv4&t=2024-07-16T15%3A35%3A41.781Z";
  } else if (color === "accent") {
    src = "https://vfstiltjrbndziotcluh.supabase.co/storage/v1/object/sign/advalue/advaluelogo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHZhbHVlL2FkdmFsdWVsb2dvLnBuZyIsImlhdCI6MTcyMTE0NDE0MSwiZXhwIjoxNzUyNjgwMTQxfQ.j_1xpfB8EYwlUWTZnJUEDV9LG_TMoFXOhUqIBFS-Pv4&t=2024-07-16T15%3A35%3A41.781Z";
  }

  const filter = color === "black" ? "invert(1)" : "none";

  return (
    <Image
      src={src}
      alt="Quivr Logo"
      width={size}
      height={size}
      style={{ filter }}
    />
  );
};
