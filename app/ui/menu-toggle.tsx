import { motion } from 'framer-motion'

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void
  isOpen: boolean
}) => (
  <motion.button
    onClick={toggle}
    initial={false}
    animate={isOpen ? 'open' : 'closed'}
    className="flex h-14 w-14 items-center justify-center pr-1"
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        variants={{
          closed: { d: 'M 2 8 L 22 8' },
          open: { d: 'M 3 21 L 21 3' },
        }}
        className="stroke-black dark:stroke-white"
      />
      <Path
        variants={{
          closed: { d: 'M 2 18 L 22 18' },
          open: { d: 'M 3 3 L 21 21' },
        }}
        className="stroke-black dark:stroke-white"
      />
    </svg>
  </motion.button>
)
