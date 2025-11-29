"use client"

import type { Subject } from "@/types/student"
import { Card } from "@/components/ui/card"

interface SubjectListProps {
  subjects: Subject[]
  selectedSubject: Subject | null
  onSelectSubject: (subject: Subject) => void
}

export default function SubjectList({ subjects, selectedSubject, onSelectSubject }: SubjectListProps) {
  const activeSubjects = subjects.filter((s) => s.status === "active")
  const completedSubjects = subjects.filter((s) => s.status === "completed")

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600 bg-green-50"
    if (grade >= 7) return "text-blue-600 bg-blue-50"
    if (grade >= 5) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getGradeLabel = (grade: number) => {
    if (grade >= 9) return "Excelente"
    if (grade >= 7) return "Bom"
    if (grade >= 5) return "Regular"
    return "Insuficiente"
  }

  return (
    <div className="space-y-6">
      {/* Disciplinas Ativas */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Disciplinas Ativas</h3>
            <p className="text-sm text-muted-foreground">{activeSubjects.length} em andamento</p>
          </div>
        </div>

        <div className="space-y-3">
          {activeSubjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedSubject?.id === subject.id
                  ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-lg mb-1">{subject.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Prof. {subject.professor}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-3 py-1 rounded-full font-bold text-sm ${getGradeColor(subject.grade)}`}>
                    {subject.grade.toFixed(1)}
                  </div>
                  <span className="text-xs text-muted-foreground">{getGradeLabel(subject.grade)}</span>
                </div>
              </div>

              {selectedSubject?.id === subject.id && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso:</span>
                    <span className="font-semibold text-foreground">Em andamento</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${(subject.grade / 10) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Disciplinas Concluídas */}
      {completedSubjects.length > 0 && (
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Disciplinas Concluídas</h3>
              <p className="text-sm text-muted-foreground">{completedSubjects.length} finalizadas</p>
            </div>
          </div>

          <div className="space-y-3">
            {completedSubjects.map((subject) => (
              <div key={subject.id} className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{subject.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Prof. {subject.professor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${getGradeColor(subject.grade)}`}>
                      {subject.grade.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Concluída</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
