export function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={`page-shell page-enter ${className}`}>{children}</main>;
}
