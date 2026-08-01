import Image from "next/image";

const ratioMap = {
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  cinematic: "aspect-[21/9]"
};

export function PhotoPlaceholder({
  label = "GÖRSEL ALANI",
  title,
  ratio = "wide",
  index,
  className = "",
  helperText = "Seçili proje görsel alanı"
}) {
  return (
    <div
      className={`premium-panel premium-hover relative overflow-hidden rounded-[2rem] border border-[#E5E5E5] bg-[#F7F7F5] ${ratioMap[ratio]} ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_49.7%,rgba(17,17,17,0.14)_49.9%,transparent_50.1%,transparent_100%)]" />
      <div className="absolute left-5 top-5 h-10 w-10 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm sm:left-6 sm:top-6" />
      <div className="absolute bottom-5 right-5 h-14 w-14 rounded-full border border-black/8 bg-black/[0.03] sm:bottom-6 sm:right-6" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-black/50">
              {label}
            </p>
            {title ? (
              <p className="mt-3 max-w-sm text-lg font-medium leading-tight text-black/82 sm:text-xl">
                {title}
              </p>
            ) : null}
          </div>
          {index ? (
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-black/35">
              {index}
            </span>
          ) : null}
        </div>
        <div className="max-w-xs">
          <div className="mb-3 h-px w-16 bg-black/12" />
          <p className="text-sm leading-6 text-black/48">{helperText}</p>
        </div>
      </div>
    </div>
  );
}

export function PublicImageFallback({
  ratio = "wide",
  className = ""
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-[#111111] ${ratioMap[ratio]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProjectImageSlot({
  project,
  ratio = "wide",
  className = ""
}) {
  const hasImage = Boolean(project.coverImage);
  const textOnDark = true;

  return (
    <div
      className={`group premium-panel premium-hover relative overflow-hidden rounded-[2rem] border border-[#E5E5E5] ${ratioMap[ratio]} ${className}`}
    >
      {hasImage ? (
        <>
          {/* Replace PhotoPlaceholder fallback automatically when real project photo is ready. */}
          <Image
            src={project.coverImage}
            alt={project.coverAlt || `${project.name} kapak görseli`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/10 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#111111]" />
      )}

      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 sm:p-6 ${
          textOnDark ? "text-white" : "text-black"
        }`}
      >
        <div>
          <p
            className={`text-[0.7rem] uppercase tracking-[0.26em] ${
              textOnDark ? "text-white/62" : "text-black/42"
            }`}
          >
            {project.scope}
          </p>
          <h3 className="mt-2 text-2xl font-medium sm:text-[2rem]">{project.name}</h3>
          <p
            className={`mt-1 text-sm sm:text-base ${
              textOnDark ? "text-white/72" : "text-black/58"
            }`}
          >
            {project.location}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] ${
            textOnDark
              ? "border border-white/16 bg-black/35 text-white/76"
              : "border border-black/10 bg-white/88 text-black/62"
          }`}
        >
          {project.status}
        </span>
      </div>
    </div>
  );
}

export function DetailPhotoGrid({ projectName = "Proje" }) {
  const items = [
    ["ÖNCESİ", `${projectName} / Öncesi`],
    ["UYGULAMA", `${projectName} / Uygulama`],
    ["DETAY", `${projectName} / Detay`],
    ["TESLİM", `${projectName} / Teslim`]
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(([index, title]) => (
        <PhotoPlaceholder key={index} index={index} title={title} ratio="wide" />
      ))}
    </div>
  );
}
