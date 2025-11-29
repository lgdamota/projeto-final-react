"use client";

import type { Student } from "@/types/student";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface StudentDetailsProps {
  student: Student;
  onEdit: () => void;
}

export default function StudentDetails({
  student,
  onEdit,
}: StudentDetailsProps) {
  return (
    <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          <Image
            src={student.avatar || "/placeholder.svg"}
            width={50}
            height={50}
            alt={student.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
          {/* <img        
            src={student.avatar || "/placeholder.svg"}
            alt={student.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          /> */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {student.role}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">
          {student.name}
        </h2>
        <p className="text-sm text-muted-foreground mb-2">{student.email}</p>
        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-blue-700">
            {student.region}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              ID do Estudante
            </span>
          </div>
          <p className="text-lg font-mono font-bold text-blue-700 ml-7">
            #{student.id.toString().padStart(4, "0")}
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              Data de Matrícula
            </span>
          </div>
          <p className="text-base font-medium text-indigo-700 ml-7">
            {new Date(student.enrollmentDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              Disciplinas Ativas
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-700 ml-7">
            {student.subjects.filter((s) => s.status === "active").length}
          </p>
        </div>
      </div>

      <Button
        onClick={onEdit}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Editar Informações
      </Button>
    </Card>
  );
}
