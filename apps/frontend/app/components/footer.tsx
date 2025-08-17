import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-16 border-t border-neutral-800 text-center text-sm text-neutral-400">
      <p>
        Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold text-white">Praver Bajaj</span>
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a
          href="https://github.com/praverbajaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://twitter.com/praver_bajaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Twitter className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
