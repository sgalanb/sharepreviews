export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1
      className={`${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`${className} scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4
      className={`${className} scroll-m-20 text-xl font-semibold tracking-tight`}
    >
      {children}
    </h4>
  )
}

export function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`${className} leading-7 [&:not(:first-child)]:mt-6`}>
      {children}
    </p>
  )
}

export function TypographyMuted({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`${className} text-sm text-muted-foreground`}>{children}</p>
  )
}
