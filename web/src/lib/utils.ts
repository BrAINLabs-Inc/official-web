import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Initials from a team member's name, ignoring honorifics like "Dr." or "Mr.". */
export function memberInitials(r: { member: { first_name: string; second_name: string } }) {
  const first = r.member.first_name.replace(/^(Dr|Mr|Ms|Mrs|Prof)\.\s*/, '');
  return `${first[0] ?? ''}${r.member.second_name[0] ?? ''}`;
}
