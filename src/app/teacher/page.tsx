import Link from "next/link";

export default function TeacherHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Classroom Manager</h1>

      <div className="grid gap-4">
        <Link href="/teacher/classrooms" className="card p-4">
          <h3 className="font-semibold">📚 Classrooms</h3>
          <p className="text-sm text-slate-600">
            Create classes, generate join codes, manage students.
          </p>
        </Link>
        <Link href="/teacher/library" className="card p-4">
          <h3 className="font-semibold">📖 Library</h3>
          <p className="text-sm text-slate-600">
            Browse texts and suggest titles to classes.
          </p>
        </Link>
        <Link href="/teacher/settings" className="card p-4">
          <h3 className="font-semibold">⚙️ Settings</h3>
          <p className="text-sm text-slate-600">
            Profile, school, and data controls.
          </p>
        </Link>
      </div>
    </div>
  );
}
