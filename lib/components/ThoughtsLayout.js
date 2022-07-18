import Navigation from "./Navigation";

export default function ThoughtsLayout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="my-40 m-1 max-w-xl mx-auto blue-href">{children}</div>
    </div>
  );
}
