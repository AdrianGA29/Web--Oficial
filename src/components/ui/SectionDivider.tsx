type Props = {
  className?: string;
};

export function SectionDivider({ className = "" }: Props) {
  return (
    <div
      className={`h-px w-full bg-border-subtle ${className}`}
      aria-hidden="true"
    />
  );
}
