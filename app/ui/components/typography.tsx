export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1
      className={`${className} text-4xl font-extrabold leading-[3rem] tracking-tight lg:text-5xl lg:leading-[4rem]`}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <h2
      className={`${className} text-3xl font-semibold tracking-tight`}
      id={id}
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
    <h3 className={`${className} text-2xl font-semibold tracking-tight`}>
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
    <h4 className={`${className} text-xl font-semibold tracking-tight`}>
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
  return <p className={`${className} text-base leading-7`}>{children}</p>
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
