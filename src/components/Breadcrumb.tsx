import { Link } from "react-router-dom";
interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="text-sm text-neutral-900 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">

            {item.path ? (
              <Link
                to={item.path}
                onClick={item.onClick}
                className="hover:text-black transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black font-medium">
                {item.label}
              </span>
            )}

            {i < items.length - 1 && (
              <span className="text-neutral-400">/</span>
            )}

          </div>
        ))}
      </div>
    </nav>
  );
}