import React from 'react';
import { CircleArrowOutUpRight, Clock, Video, BarChart, CheckCircle2, ChevronDown } from 'lucide-react';
import Button from '../components/generals/Button';
import { useNavigate } from 'react-router-dom'; //

// Importación de activos locales
import Banner from '../assets/img/Banner.png';
import logo from '../assets/img/LogoBlanco.png';
import bgFeatures from '../assets/img/Banner2.png';
import medicosExperiencia from '../assets/img/Banner3.png'; // La imagen de los dos médicos

// Imágenes de instructores (Placeholders)
const drYeison = "https://via.placeholder.com/150";

/* --- SUB-COMPONENTES AUXILIARES --- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col items-center text-center border-b-4 border-transparent hover:border-[#2DAAAD] transition-all group">
    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-[#132391] mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

const CourseCard = ({ tag, title, subtitle, level, desc, price, imageUrl }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full text-left">
    {/* Imagen con Overlay */}
    <div className="h-52 relative overflow-hidden bg-[#132391]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
      />
      {tag && (
        <span className="absolute top-4 left-4 bg-[#2DAAAD] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
          {tag}
        </span>
      )}
    </div>

    {/* Contenido */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-bold text-[#132391] mb-1">{title}</h3>
      <p className="text-[10px] font-semibold text-gray-400 mb-4 uppercase tracking-widest">{subtitle}</p>

      <div className="flex gap-4 text-[11px] text-gray-500 mb-5 font-medium">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#2DAAAD]" /> 5 horas</span>
        <span className="flex items-center gap-1.5"><Video size={14} className="text-[#2DAAAD]" /> 8 videos</span>
        <span className="flex items-center gap-1.5"><BarChart size={14} className="text-[#2DAAAD]" /> {level}</span>
      </div>

      <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">{desc}</p>

      <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
        <button className="text-[#132391] font-bold text-sm flex items-center gap-2 hover:text-[#2DAAAD] transition-colors group/btn">
          Saber más <CircleArrowOutUpRight size={16} className="transition-transform group-hover/btn:-translate-y-0.5" />
        </button>
        {price && <span className="text-lg font-black text-[#132391]">{price}</span>}
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate(); //

  // Función para redirigir al Login
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Función para redirigir al Registro (opcional)
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <img src={logo} alt="Medicina Crítica" className="h-10 brightness-0" />
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-none text-[#132391] hover:text-[#2DAAAD]"
            onClick={handleLoginRedirect}
          >
            Iniciar sesión
          </Button>
          <Button variant="primary" className="bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2"
            onClick={handleRegisterRedirect}>
            Registrarse <CircleArrowOutUpRight size={18} />
          </Button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header
        className="relative bg-[#132391] text-white min-h-[600px] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: '85%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#132391] via-[#132391]/80 to-transparent"></div>
        <div className="container mx-auto px-8 relative z-10 text-left">
          <div className="max-w-2xl">
            <span className="bg-[#2DAAAD] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
              Cursos online creados por especialistas
            </span>
            <h1 className="text-5xl font-bold mt-6 leading-tight">
              Tu capacitación puede salvar vidas: empieza gratis con REACT® I
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-xl leading-relaxed">
              Regístrate y accede sin costo a nuestro curso REACT® I, diseñado para brindar conocimientos esenciales en atención crítica prehospitalaria.
            </p>
            <Button
              className="mt-8 px-8 py-4 bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2 text-lg shadow-xl border border-white/20 transition-all transform hover:scale-105 " onClick={handleRegisterRedirect}
            >
              Inscríbete gratis y certifícate <CircleArrowOutUpRight size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* --- BENEFICIOS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#132391] mb-16 text-center">Tu desarrollo profesional en salud, en un solo lugar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">🩺</div>}
              title="Aprende de especialistas"
              desc="Contenidos creados por médicos y profesionales de la salud con experiencia real en emergencias."
            />
            <FeatureCard
              icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">🏅</div>}
              title="Certificados con respaldo"
              desc="Todos los cursos incluyen certificado digital y aval del colegio de médicos y organizaciones reconocidas."
            />
            <FeatureCard
              icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">📱</div>}
              title="Capacitación a tu ritmo"
              desc="Estudia a tu manera. Retoma clases en línea desde tu celular, tablet o computadora."
            />
          </div>
        </div>
      </section>

      {/* --- VIDEO CARACTERÍSTICAS --- */}
      <section
        className="relative min-h-[600px] flex items-center bg-cover bg-center py-20 overflow-hidden"
        style={{ backgroundImage: `url(${bgFeatures})` }}
      >
        <div className="absolute inset-0 bg-[#132391]/20 lg:hidden"></div>
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-left">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Características que marcan la diferencia
            </h2>
            <ul className="grid gap-y-4 mb-10">
              {[
                "Material educativo descargable",
                "Clases en video disponibles 24/7 por 30 días",
                "Examen online para evaluar tu progreso",
                "Certificado digital inmediato",
                "Contenido estructurado por niveles de complejidad",
                "Primer curso gratuito al registrarte"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-white w-5 h-5 flex-shrink-0" />
                  <span className="text-sm lg:text-base font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-[#132391] hover:bg-[#2DAAAD] px-10 py-4 flex items-center gap-2 shadow-2xl transition-all border border-white/10" onClick={handleRegisterRedirect}>
              Regístrate de manera gratuita <CircleArrowOutUpRight size={18} />
            </Button>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white/10 relative bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Informativo" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: NUESTROS CURSOS --- */}
      <section className="py-24 bg-white text-left">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-extrabold text-[#132391] mb-4 tracking-tight">Nuestro cursos</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Encuentra el curso ideal para tu nivel de experiencia. Desde programas básicos para el público general hasta capacitaciones avanzadas para profesionales de la salud.
              </p>
            </div>

            {/* Filtros Combobox con Lucide */}
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative group w-full md:w-44">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-semibold focus:ring-2 focus:ring-[#2DAAAD] outline-none cursor-pointer">
                  <option>Nivel</option>
                  <option>Básico</option>
                  <option>Intermedio</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <BarChart size={16} className="text-gray-400" />
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>

              <div className="relative group w-full md:w-44">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-semibold focus:ring-2 focus:ring-[#2DAAAD] outline-none cursor-pointer">
                  <option>Categoría</option>
                  <option>Emergencias</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <BarChart size={16} className="text-gray-400" />
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 text-left">
            <CourseCard
              tag="Gratuito"
              title="REACT® - I"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Básico"
              imageUrl="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
              desc="Aprende a actuar con seguridad y eficacia en la estabilización temprana de pacientes críticos en ambulancias, empresas, aeropuertos e industrias."
            />
            <CourseCard
              title="REACT® - II"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Intermedio"
              price="$00,00"
              imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop"
              desc="Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión, seguridad y liderazgo técnico."
            />
            <CourseCard
              title="REACT® - III"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Avanzado"
              price="$00,00"
              imageUrl="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop"
              desc="Capacitación avanzada para profesionales que lideran la atención en momentos críticos, integrando protocolos internacionales de soporte vital."
            />
          </div>
        </div>
      </section>
      {/* --- SECCIÓN: NOSOTROS (Calidad y Experiencia con Fondo) --- */}
      <section
        className="relative min-h-[600px] flex items-center bg-cover bg-center py-20"
        style={{
          backgroundImage: `url(${medicosExperiencia})`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Capa de degradado sutil para asegurar que el texto sea legible sobre el fondo claro */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/10 lg:from-transparent lg:to-white/5"></div>

        <div className="container mx-auto px-8 relative z-10 flex justify-end">
          {/* Contenedor del texto alineado a la derecha */}
          <div className="lg:w-1/2 text-left bg-white/10 backdrop-blur-sm lg:bg-transparent p-6 rounded-2xl">
            <span className="text-[#2DAAAD] font-bold text-xs uppercase tracking-widest">
              Nosotros
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#132391] mt-4 mb-8 leading-tight">
              Calidad respaldada por nuestra experiencia en salud
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-xl">
              Medicina Crítica se distingue por su experiencia y compromiso en la formación de personal capacitado en seguridad y salud ocupacional. Contamos con un equipo multidisciplinario de profesionales altamente calificados.
            </p>

            {/* Contadores / Stats en línea horizontal */}
            <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#132391]">+ 3</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase mt-1">Años de experiencia</span>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-300"></div>

              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#132391]">100</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase mt-1">Capacitaciones</span>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-300"></div>

              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#132391]">+ 3</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase mt-1">Años de experiencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- INSTRUCTORES --- */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-8">
          <span className="text-[#2DAAAD] font-bold text-xs uppercase tracking-widest">Instructores</span>
          <h2 className="text-3xl font-bold text-[#132391] mt-4 mb-16">Formación impartida por especialistas en medicina y emergencias</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center group">
                <img src={drYeison} alt="Dr. Yeison" className="w-32 h-32 rounded-full border-4 border-white shadow-lg group-hover:border-[#2DAAAD] transition-all object-cover" />
                <h3 className="font-bold text-[#132391] text-xl mt-6">Dr. Yeison Benites</h3>
                <p className="text-[#2DAAAD] text-sm font-semibold mb-4 uppercase">Médico emergenciólogo</p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Fundador de Medicina Crítica, con experiencia en atención prehospitalaria y gestión de emergencias.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-20">
        <div className="container mx-auto px-8 text-center pb-20 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-[#132391] mt-16 mb-4">Certificación con respaldo</h2>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
            <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400 tracking-widest">AHA</div>
            <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400 tracking-widest">CMP</div>
            <div className="h-12 w-32 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400 tracking-widest">DR. VIGO</div>
          </div>
        </div>
        <div className="bg-[#132391] py-10 text-white text-center text-sm">
          <img src={logo} alt="Logo" className="h-8 mx-auto mb-6 brightness-0 invert" />
          <p className="opacity-70">Copyright © 2025 Medicina Crítica. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;