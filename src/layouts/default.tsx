import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col">
      <Head />
      <main className="container w-full px-0 flex-grow pt-0">{children}</main>
    </div>
  );
}
