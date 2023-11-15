// Interface to create links for the NavBar from,
// where name and url are arrays of the same length n
// and for each index, i, where 0 <= i < n, 
// url[i] is associated with name[i] to render on the Navbar
interface LinkData {
    name: string[]
    url: string[]
}

export type { LinkData }