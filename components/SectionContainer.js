export default function SectionContainer({
  as: Component = "section",
  className = "",
  children,
  id
}) {
  return (
    <Component id={id} className={className}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">{children}</div>
    </Component>
  );
}
