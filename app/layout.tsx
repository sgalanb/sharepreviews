import dynamic from 'next/dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Crisp = dynamic(() => import('./lib/crisp'))

  return (
    <html lang="en">
      <Crisp />
      <body>{children}</body>
    </html>
  )
}
