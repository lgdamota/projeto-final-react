export interface Subject {
  id: number
  name: string
  grade: number
  professor: string
  status: "active" | "completed"
}

export interface Student {
  id: number
  name: string
  email: string
  role: string
  region: string
  avatar: string
  enrollmentDate: string
  subjects: Subject[]
}
