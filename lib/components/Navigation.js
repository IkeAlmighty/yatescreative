import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "./Menu";

export default function Navigation({ props }) {
  const router = useRouter();
  const _props = props || {
    items: [
      {
        text: "Book Appointment",
        link: "/booking",
      },
      {
        text: "Portfolio",
        link: "/portfolio",
      },
      {
        text: "Contact",
        link: "/contact",
      },

      {
        text: "Poetry",
        link: "/poems",
      },
    ],
    logo: { text: "Yates Creative" },
  };
  return (
    <div className="w-full fixed top-0 left-0 p-1 md:p-0 bg-slate-100">
      <Link href="/" className="inline-block">
        <a className="text-2xl fixed top-3.5 left-3.5 md:top-[17px] font-underdog font-semibold">
          {_props.logo.text}
        </a>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden float-right md:inline-block">
        {_props.items.map((item) => {
          // used to highlight active page in tailwindcss
          const rootSlug = router.pathname.split("/")[1];

          return (
            <Link key={item.link} href={item.link}>
              {/* render links, highlight the active one */}
              <a
                className={`inline-block py-5 px-6 hover:bg-amber-50 ${
                  rootSlug === item.link.split("/")[1] ? "bg-amber-50" : ""
                }`}
              >
                {item.text}
              </a>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu */}
      <div className="inline-block float-right md:hidden">
        {/* menu button: */}
        <Menu>
          {_props.items.map((item) => (
            <Link key={item.link} href={item.link}>
              <a className="block px-6 py-3 text-right hover:bg-amber-200">
                {item.text}
              </a>
            </Link>
          ))}
        </Menu>
      </div>
    </div>
  );
}
