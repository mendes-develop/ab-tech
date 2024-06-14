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
  cookies().set('user_id', combineName(data))
}

export async function getCookieUserId() {
  return cookies().get('user_id')
}

export async function deleteCookie() {
  cookies().delete('user_id')
}