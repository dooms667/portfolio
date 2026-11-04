import Link from 'next/link';
import { PROJECTS } from '../../data/projects';
import BrutalistCard from '../../components/BrutalistCard';

export default function PixelsPage() {
  const pixelsProjects = PROJECTS.filter((p) => p.category === 'pixels');

  return (
    <main className="min-h-screen p-4 md:p-12">
      <div className="flex justify-between items-center mb-8 border-b-4 border-[#f4f4f0] pb-4">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">/// PIXELS ARCHIVE</h1>
        <Link 
          href="/" 
          className="border-4 border-[var(--text-raw)] px-4 py-2 hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] font-black text-sm tracking-widest transition-none uppercase shadow-[4px_4px_0px_0px_var(--text-raw)]"
        >
          [X] BACK
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pixelsProjects.map((project) => (
          <BrutalistCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}