const MESSAGES = [
  "Summer 2026 — back your nation",
  "Free worldwide shipping over $150",
  "Easy 30-day returns",
];

/** Thin rotating trust strip above the header — a staple of jersey retailers. */
export function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="announce__track">
        {MESSAGES.map((m) => (
          <span key={m} className="announce__item">
            {m}
          </span>
        ))}
        {/* duplicated for seamless marquee on small screens */}
        {MESSAGES.map((m) => (
          <span key={`${m}-dup`} className="announce__item" aria-hidden>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
