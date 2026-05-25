declare const React: unknown;

type ButtonProps = {
  onClick: () => void;
  label?: string;
};

export function Button({ onClick, label = "Click me" }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {label}
    </button>
  );
}
