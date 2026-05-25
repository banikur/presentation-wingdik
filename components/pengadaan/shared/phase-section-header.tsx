type PhaseSectionHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
};

export function PhaseSectionHeader({ title, subtitle }: PhaseSectionHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl font-bold text-app-text md:text-3xl">{title}</h2>
      <p className="mt-2 text-base text-app-text-muted md:text-lg">{subtitle}</p>
    </div>
  );
}
