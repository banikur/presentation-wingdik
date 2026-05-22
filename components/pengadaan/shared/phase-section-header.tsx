type PhaseSectionHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
};

export function PhaseSectionHeader({title, subtitle }: PhaseSectionHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl font-bold text-[#F8FAFC] md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-white/70 md:text-base">{subtitle}</p>
    </div>
  );
}
