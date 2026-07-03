'use client';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="px-6 lg:px-10 pb-20 pt-20 lg:pb-28"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Giant email link — Buzzworthy footer style */}
      <div className="overflow-hidden mb-12">
        <a
          href="mailto:harsh@semiquantum.live"
          className="footer-big-link"
          style={{ fontSize: 'clamp(2rem, 8vw, 8rem)' }}
        >
          HARSH@SEMIQUANTUM.LIVE
        </a>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/20">
          © {year} Harsh Jha — All rights reserved
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="mask-link text-[11px] font-mono uppercase tracking-widest"
            data-text="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
            className="mask-link text-[11px] font-mono uppercase tracking-widest"
            data-text="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="/resume" target="_blank" rel="noopener noreferrer"
            className="mask-link text-[11px] font-mono uppercase tracking-widest"
            data-text="Resume"
          >
            Resume
          </a>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
            All Systems Online
          </div>
        </div>
      </div>
    </footer>
  );
}
