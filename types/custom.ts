import type { NextPage } from 'next'

export type NextPageWithCustomProps<P = {}, IP = P> = NextPage<P, IP> & {
  isRequireAuth: boolean
}