export const metadata = {
  title: "My Next.js App",
  description: "Simple Next.js application"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
