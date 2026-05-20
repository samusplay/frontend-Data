export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 font-medium tracking-wide">
          &copy; {year} Plataforma de Analítica Territorial
        </p>
        <div className="flex items-center gap-4 text-xs text-zinc-600 font-mono">
          <span>v1.0.0</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Core System</span>
        </div>
      </div>
    </footer>
  );
}