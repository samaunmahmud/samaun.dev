import type { JSX } from 'react'
import type { SocialKey } from '../../data/types'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MailIcon, type IconProps } from './Icons'

export const socialIcon: Record<SocialKey, (p: IconProps) => JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  email: MailIcon,
}
