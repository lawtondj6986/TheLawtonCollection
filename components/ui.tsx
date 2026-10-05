import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`rule ${className}`} />;
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "light" };

const buttonStyles = {
  primary:
    "bg-navy text-salt hover:bg-[#13304d] border border-navy",
  secondary:
    "border border-navy text-navy hover:bg-navy hover:text-salt",
  light:
    "border border-salt/70 text-salt hover:bg-salt hover:text-navy",
};

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center px-6 text-[0.95rem] font-semibold tracking-wide transition-colors ${buttonStyles[variant]} ${className}`}
    />
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Container className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-[2.6rem] sm:text-6xl">{title}</h1>
      <Rule className="mt-7" />
      {children ? <div className="mt-7 max-w-2xl text-lg text-ink/85">{children}</div> : null}
    </Container>
  );
}
