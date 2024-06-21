'use server'

import { cookies } from 'next/headers'

type Name = {
  firstName: string
  lastName: string
}

const parseName = (name: string) => {
  return name.replace(/\s+/g, '_').toLowerCase()
}

const combineName = (fullName: Name) => {
  return `${parseName(fullName.firstName)}_${parseName(fullName.lastName)}`
}

export async function createCookie(data: Name) {
  cookies().set('access', combineName(data))
}

export async function getCookieUserId() {
  return cookies().get('access')
}

export async function deleteCookie() {
  cookies().delete('access')
}