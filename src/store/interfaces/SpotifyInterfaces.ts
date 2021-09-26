export interface UserData {
  country: string,
  display_name: string,
  email: string,
  external_urls: {
    spotify: string
  },
  followers: {
    href: string[],
    total: number
  },
  href: string,
  id: string,
  images: UserProfileImage[]
}

export interface UserProfileImage {
  height: number,
  width: number,
  url: string
}
