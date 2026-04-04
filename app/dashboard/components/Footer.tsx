export default function Footer() {
  const year = new Date().getFullYear(); // Año dinámico

  return (
    <footer className="mt-auto pt-8 pb-4 text-center">
      <div className="border-t border-zinc-800/50 pt-6">
        <p className="text-xs text-zinc-500 font-medium">
          &copy; {year} Plataforma de Analítica Territorial.
        </p>
      </div>
    </footer>
  );
}