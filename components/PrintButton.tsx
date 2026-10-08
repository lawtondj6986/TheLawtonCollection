"use client";

export function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center gap-2 border border-navy px-5 font-semibold text-navy hover:bg-navy hover:text-salt print:hidden"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8">
        <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}
