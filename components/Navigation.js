import Link from "next/link";
import Menu from "./Menu";

export default function Navigation({ props }) {
  const _props = props || {
    items: [
      {
        text: "Book Appointment",
        link: "https://calendly.com/isaacyates",
      },
      {
        text: "Thoughts",
        link: "/thoughts",
      },
      {
        text: "Portfolio",
        link: "/portfolio",
      },

      {
        text: "Poetry",
        link: "/poems",
      },
    ],
    logo: { text: "Yates Creative" },
  };
  return (
    <div className="w-full fixed top-0 left-0 p-1 md:p-0 bg-blue-200">
      <Link href="/" className="inline-block">
        <a className="text-xl fixed top-3.5 left-3.5 md:top-[18px]">
          {_props.logo.text}
        </a>
      </Link>

      <div className="hidden float-right md:inline-block">
        {_props.items.map((item) => (
          <Link key={item.link} href={item.link}>
            <a className="inline-block py-5 px-6 hover:bg-slate-400">
              {item.text}
            </a>
          </Link>
        ))}
      </div>

      <div className="inline-block float-right md:hidden">
        {/* menu button: */}
        <Menu>
          {_props.items.map((item) => (
            <Link key={item.link} href={item.link}>
              <a className="block px-6 py-3 text-right">{item.text}</a>
            </Link>
          ))}
        </Menu>
      </div>
    </div>
  );
}
