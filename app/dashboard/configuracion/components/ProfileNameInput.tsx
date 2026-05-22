// app/dashboard/configuracion/components/ProfileNameInput.tsx
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProfileNameInput({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Nombre del perfil
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej: Expansión Valle, Perfil Conservador..."
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950/60 px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-blue-500 focus:outline-none shadow-sm dark:shadow-none"
      />
    </div>
  );
}