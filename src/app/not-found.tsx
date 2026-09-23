import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#120905] px-4 py-16 text-center select-none">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#1C100A] border border-[#8C593B]/40 shadow-2xl flex flex-col items-center">
        {/* Kullhad Icon Graphic */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D96B27] to-[#8C593B] flex items-center justify-center text-3xl shadow-lg mb-4 text-[#FAF6F0]">
          ☕
        </div>

        {/* High-Contrast 404 Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#D96B27]/20 border border-[#D96B27]/50 text-[#D96B27] font-black text-sm tracking-wider uppercase mb-3">
          Error 404
        </span>

        {/* Clear readable heading */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#FAF6F0] mb-2 font-heading tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm text-[#D4C5B9] font-medium leading-relaxed mb-6">
          The link or invoice you are searching for might be unavailable or moved. Let's get you back on track with a hot cup of Chai!
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl bg-[#6F432A] hover:bg-[#5A3520] text-[#FAF6F0] font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 border border-[#8C593B]/60"
          >
            🏠 Return Home
          </Link>
          <Link
            href="/check-bill"
            className="flex-1 py-3 px-4 rounded-xl bg-[#D96B27] hover:bg-[#C05818] text-[#FAF6F0] font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            🧾 Check Bill & Khata
          </Link>
        </div>

        {/* Contact Assistance */}
        <p className="mt-6 text-xs text-[#98877D]">
          Need help? Call store desk at{' '}
          <a href="tel:+919310112564" className="text-[#D96B27] hover:underline font-bold">
            +91 93101 12564
          </a>
        </p>
      </div>
    </div>
  );
}
