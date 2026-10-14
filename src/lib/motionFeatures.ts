// Motion's animation engine, split into its own chunk so the page can paint before it arrives.
// domMax (not domAnimation) because the navbar's active pill uses layoutId.
export { domMax as default } from 'motion/react'
