"use client";

import { useState, useEffect } from "react";
import StudentDetails from "@/components/student-details";
import SubjectList from "@/components/subject-list";
import StudentForm from "@/components/student-form";
import type { Student, Subject } from "@/types/student";

export default function StudentInterface() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect para carregar dados iniciais
  useEffect(() => {
    // Simulando carregamento de dados da API
    const loadStudents = async () => {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockStudents: Student[] = [
        {
          id: 1,
          name: "Ahri",
          email: "ahri@runeterra.edu",
          role: "Mage",
          region: "Ionia",
          avatar: "/newahri-icon.jpg",
          enrollmentDate: "2024-01-15",
          subjects: [
            {
              id: 1,
              name: "Magia Arcana",
              grade: 9.5,
              professor: "Ryze",
              status: "active",
            },
            {
              id: 2,
              name: "Controle de Energia",
              grade: 8.8,
              professor: "Syndra",
              status: "active",
            },
            {
              id: 3,
              name: "História de Runeterra",
              grade: 9.2,
              professor: "Zilean",
              status: "completed",
            },
          ],
        },
        {
          id: 2,
          name: "Yasuo",
          email: "yasuo@runeterra.edu",
          role: "Warrior",
          region: "Ionia",
          avatar: "/yasuo-icon.jpg",
          enrollmentDate: "2024-02-20",
          subjects: [
            {
              id: 4,
              name: "Técnicas de Combate",
              grade: 9.8,
              professor: "Master Yi",
              status: "active",
            },
            {
              id: 5,
              name: "Meditação e Foco",
              grade: 7.5,
              professor: "Lee Sin",
              status: "active",
            },
            {
              id: 6,
              name: "Código de Honra",
              grade: 8.0,
              professor: "Shen",
              status: "completed",
            },
          ],
        },
        {
          id: 3,
          name: "Lux",
          email: "lux@runeterra.edu",
          role: "Mage",
          region: "Demacia",
          avatar: "/luxnew-icon.jpeg",
          enrollmentDate: "2024-01-10",
          subjects: [
            {
              id: 7,
              name: "Magia da Luz",
              grade: 10.0,
              professor: "Kayle",
              status: "active",
            },
            {
              id: 8,
              name: "Ética Mágica",
              grade: 9.7,
              professor: "Morgana",
              status: "active",
            },
            {
              id: 9,
              name: "Política de Demacia",
              grade: 8.5,
              professor: "Garen",
              status: "completed",
            },
          ],
        },
      ];

      setStudents(mockStudents);
      setSelectedStudent(mockStudents[0]);
    };

    loadStudents();
  }, []);

  // useEffect para salvar alterações (simulado)
  useEffect(() => {
    if (selectedStudent) {
      console.log("[v0] Student data updated:", selectedStudent);
      // Aqui você poderia fazer uma chamada à API para salvar
    }
  }, [selectedStudent]);

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setSelectedStudent(updatedStudent);
    setIsEditing(false);
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setSelectedSubject(null);
    setIsEditing(false);
  };

  if (!selectedStudent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">
            Carregando estudantes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Academia de Runeterra
          </h1>
          <p className="text-muted-foreground mt-1">
            Sistema de Gerenciamento de Estudantes
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seletor de Estudantes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Selecionar Estudante:
          </label>
          <div className="flex gap-3 flex-wrap">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedStudent.id === student.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-white text-foreground hover:shadow-md hover:scale-102"
                }`}
              >
                {student.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detalhes do Estudante */}
          <div className="lg:col-span-1">
            <StudentDetails
              student={selectedStudent}
              onEdit={() => setIsEditing(true)}
            />
          </div>

          {/* Lista de Disciplinas */}
          <div className="lg:col-span-2">
            <SubjectList
              subjects={selectedStudent.subjects}
              selectedSubject={selectedSubject}
              onSelectSubject={handleSelectSubject}
            />
          </div>
        </div>

        {/* Formulário de Edição */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Editar Estudante
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <StudentForm
                  student={selectedStudent}
                  onSave={handleUpdateStudent}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
