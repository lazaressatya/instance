export const metadata = {
  title: "Employee Management",
  description: "Next.js MongoDB Project"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
