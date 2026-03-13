import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CircleArrowOutUpRight,
  Clock,
  Video,
  BarChart,
  CheckCircle2,
  ChevronDown,
  Quote,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Music2
} from "lucide-react";

import Button from "../components/generals/Button";


// NUEVAS IMPORTACIONES PARA LOS LOGOS DEL HERO
import b1 from "../assets/img/b1.jpg";
import b2 from "../assets/img/b2.png";

import s1 from "../assets/img/s1.png"; // Facebook
import s2 from "../assets/img/s2.png"; // Instagram
import s3 from "../assets/img/s3.png"; // LinkedIn
import s4 from "../assets/img/s4.png"; // Youtube
import s5 from "../assets/img/s5.png"; // TikTok

// Imágenes principales
import Banner from "../assets/img/Banner.png";
import logo from "../assets/img/logook.png";
import logB from "../assets/img/logB.png";
// Fondos y secciones
import bgFeatures from "../assets/img/Banner2.png";
import medicosExperiencia from "../assets/img/Banner3.png";

import pieImage from "../assets/img/pie.png";

// Logos de certificación
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";
import img5 from "../assets/img/img5.jpg";
import img6 from "../assets/img/img6.jpg";

import l1 from "../assets/img/l1.png";
import l2 from "../assets/img/l2.png";
import l3 from "../assets/img/l3.png";

// Instructores
import dr1 from "../assets/img/dr1.webp";
import dr2 from "../assets/img/dr2.avif";
import dr3 from "../assets/img/dr3.avif";


import olaF from "../assets/img/fondoOla.png";

// Logo instructor
import logoDrVigo from "../assets/img/parche.jpg";
/* --- SUB-COMPONENTES AUXILIARES --- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col items-center text-center border-b-4 border-transparent hover:border-[#2DAAAD] transition-all group">
    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-[#132391] mb-4">{title}</h3>
    <p className="text-[#132391] leading-relaxed text-sm font-montserrat">{desc}</p>
  </div>
);

const TestimonialCard = ({ data, isActive, onClick }) => {
  const { name, role, text, imageUrl } = data;

  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-500 ease-in-out cursor-pointer flex flex-col p-8 rounded-[2.5rem] bg-white shadow-2xl border border-gray-100
        ${isActive
          ? 'z-20 scale-100 opacity-100 w-full md:w-[450px]'
          : 'z-10 scale-90 opacity-40 w-full md:w-[350px] hidden md:flex'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-left">
          <h4 className="text-[#132391] font-bold text-xl leading-tight">{name}</h4>
          <p className="text-gray-400 text-sm font-medium">{role}</p>
        </div>
        {!isActive && <Quote size={32} className="text-[#2DAAAD] opacity-40 rotate-180" />}
      </div>

      {/* Imagen (Solo si está activa) */}
      {isActive && (
        <div className="relative mb-6 rounded-2xl overflow-hidden h-48 bg-[#132391]">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132391] to-transparent p-6 flex justify-between items-end">
            <div className="text-left">
              <p className="text-white font-bold text-lg leading-none">{name}</p>
              <p className="text-white text-[10px] opacity-70 uppercase mt-1">{role}</p>
            </div>
            <Quote size={24} className="text-[#2DAAAD] rotate-180" />
          </div>
        </div>
      )}

      {/* Texto */}
      <p className={`text-left text-gray-600 leading-relaxed italic transition-all
        ${isActive ? 'text-base' : 'text-sm line-clamp-3'}`}>
        "{text}"
      </p>
    </div>
  );
};


const CourseCard = ({ tag, title, subtitle, level, desc, price, imageUrl }) => (
  <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full text-left">
    {/* Imagen y Etiqueta */}
    <div className="h-52 relative overflow-hidden bg-[#132391]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
      />
      {tag && (
        <span className="absolute top-4 left-4 bg-[#2DAAAD] text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest font-montserrat shadow-lg">
          {tag}
        </span>
      )}
    </div>

    {/* Contenido */}
    <div className="p-8 flex flex-col flex-1">
      {/* Título: Raleway Bold Azul */}
      <h3 className="font-raleway text-2xl font-bold text-[#132391] mb-1 tracking-tight">
        {title}
      </h3>

      {/* Subtítulo: Montserrat SemiBold */}
      <p className="font-montserrat text-[10px] font-semibold text-[#2DAAAD] mb-4 uppercase tracking-[0.2em]">
        {subtitle}
      </p>

      {/* Info rápida: Montserrat Medium */}
      <div className="flex gap-4 text-[11px] text-[#132391] mb-6 font-medium font-montserrat opacity-80">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#2DAAAD]" /> 5 horas</span>
        <span className="flex items-center gap-1.5"><Video size={14} className="text-[#2DAAAD]" /> 8 videos</span>
        <span className="flex items-center gap-1.5"><BarChart size={14} className="text-[#2DAAAD]" /> {level}</span>
      </div>

      {/* Descripción: Montserrat Regular/Medium Azul */}
      <p className="font-montserrat text-[#132391] text-sm mb-8 line-clamp-3 leading-relaxed font-medium opacity-90">
        {desc}
      </p>

      {/* Footer de la Card */}
      <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
        <button className="font-montserrat text-[#132391] font-extrabold text-sm flex items-center gap-2 hover:text-[#2DAAAD] transition-all group/btn uppercase tracking-wider">
          Saber más

          <CircleArrowOutUpRight size={18} className="transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
        </button>

        {price && (
          <span className="font-montserrat text-xl font-black text-[#132391]">
            {price}
          </span>
        )}
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const testimonials = [
    { name: "José Luis Ramírez", role: "Médico General", imageUrl: "https://tecscience.tec.mx/es/wp-content/uploads/sites/8/2024/12/medicina-de-precision.jpg", text: "El curso superó mis expectativas. El contenido es claro, los materiales descargables me ayudaron mucho y poder estudiar a mi ritmo fue clave. Además, contar con un certificado oficial le da un gran valor a mi formación." },
    { name: "Miguel Angel García", role: "Médico", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJe8hd0UD9atSeY9D7ERBm0J4XzUlR3Ob_ag&s", text: "El curso gratuito me motivó a seguir con otros programas. Los contenidos están bien estructurados y los certificados tienen un gran respaldo." },
    { name: "Carmen Torres", role: "Médica General", imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070", text: "El curso superó mis expectativas. La metodología es clara y práctica, ideal para aplicar en situaciones reales. Me dio mucha más seguridad en la atención prehospitalaria." }
  ];

  return (
    <div className="font-montserrat text-gray-900 bg-white">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <img src={logo} alt="Medicina Crítica" className="h-10 " />
        <div className="flex gap-4">
          {/* Botón con contorno (border) añadido */}
          <Button
            variant="outline"
            className="border border-[#132391] text-[#132391] px-4 py-2 rounded-md"
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </Button>
          <Button variant="primary" className="bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2" onClick={() => navigate('/register')}>
            Registrarse <CircleArrowOutUpRight size={18} />
          </Button>
        </div>
      </nav>


      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#132391] text-white min-h-[600px] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${Banner})`, backgroundSize: '100%', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}>

        <div className="container mx-auto px-8 relative z-10 text-left">
          <div className="max-w-2xl">
            <span className="bg-[#2DAAAD] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
              Cursos online creados por especialistas
            </span>

            <h1 className="font-raleway text-5xl  mt-6 leading-tight">
              Tu capacitación puede salvar vidas: empieza gratis con REACT® I
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-xl leading-relaxed">
              Regístrate y accede sin costo a nuestro curso REACT® I, diseñado para brindar conocimientos esenciales en atención crítica prehospitalaria.
            </p>

            <Button
              onClick={() => navigate('/register')}
              className="mt-8 px-8 py-4 bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2 text-lg font-bold border border-white/20"
            >
              Inscríbete gratis y certifícate <CircleArrowOutUpRight size={20} />
            </Button>

            {/* --- LOGOS DEBAJO DEL BOTÓN (b1 y b2) --- */}
            <div className="mt-10 flex gap-4 items-center">
              <div className="bg-white p-2 rounded-lg h-14 w-32 flex items-center justify-center shadow-md">
                <img src={b1} alt="Certificación 1" className="h-full object-contain" />
              </div>
              <div className="bg-white p-2 rounded-lg h-14 w-32 flex items-center justify-center shadow-md">
                <img src={b2} alt="Certificación 2" className="h-full object-contain" />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* --- BENEFICIOS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#132391] mb-16 text-center font-raleway mx-auto max-w-4xl">
            Tu desarrollo profesional en salud, en un solo lugar
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FeatureCard
              icon={<img src={l1} alt="Especialistas" className="w-16 h-16 object-contain" />}
              title="Aprende de especialistas"
              desc="Contenidos creados por médicos y profesionales de la salud con experiencia real en emergencias."
            />
            <FeatureCard
              icon={<img src={l2} alt="Certificados" className="w-16 h-16 object-contain" />}
              title="Certificados con respaldo"
              desc="Todos los cursos incluyen certificado digital, y algunos cuentan con aval del colegio de médicos y organizaciones reconocidas."
            />
            <FeatureCard
              icon={<img src={l3} alt="A tu ritmo" className="w-16 h-16 object-contain" />}
              title="Capacitación a tu ritmo"
              desc="Estudia a tu manera. Retoma clases en línea desde tu celular, tablet o computadora y avanza según tu propio ritmo."
            />
          </div>
        </div>
      </section>

      {/* --- VIDEO CARACTERÍSTICAS --- */}
      <section className="relative min-h-[600px] flex items-center bg-cover bg-center py-20 overflow-hidden" style={{ backgroundImage: `url(${bgFeatures})` }}>
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-left">
          <div className="text-white">
            <h2 className="text-5xl lg:text-7xl font-normal text-white leading-[1.1] mb-8 text-left tracking-tight font-raleway">
              Características que <br className="hidden lg:block" />
              marcan la diferencia
            </h2>
            <p className="text-lg lg:text-xl text-blue-100/90 font-montserrat leading-relaxed max-w-2xl">
              Nuestros cursos están diseñados para ser accesibles, completos y flexibles.
            </p>
            <br></br>
            <ul className="grid gap-y-4 mb-10 text-left">
              {["Material educativo descargable", "Clases en video disponibles 24/7 por 30 días", "Examen online para evaluar tu progreso", "Certificado digital inmediato", "Contenido estructurado por niveles de complejidad", "Primer curso gratuito al registrarte"].map((feature, index) => (
                <li key={index} className="flex items-center gap-3"><CheckCircle2 className="text-white w-5 h-5" />{feature}</li>
              ))}
            </ul>
            <Button
              onClick={() => navigate('/register')}
              // Clases actualizadas: bg oscuro, redondeado completo, flex para alinear, gap para separar.
              className="bg-[#132391] hover:bg-[#2DAAAD] px-8 py-4 rounded-full flex items-center gap-3 transition-colors text-lg font-bold font-montserrat"
            >
              Regístrate de manera gratuita
              {/* Contenedor blanco para la flecha */}
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                {/* Icono de flecha en azul oscuro */}
                <CircleArrowOutUpRight size={20} className="text-[#132391]" />
              </div>
            </Button>          </div>
          <div className="relative flex justify-center lg:justify-end w-full p-4">
            <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/GyFpY5bB1CU"
                title="Video"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUESTROS CURSOS --- */}
      <section className="py-24 bg-white text-left">
        <div className="container mx-auto px-8">
          {/* Encabezado y Filtros */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              {/* Título en azul */}
              <h2 className="text-5xl font-bold text-[#132391] mb-4 text-left font-raleway">Nuestro cursos</h2>
              {/* Texto descriptivo principal en azul */}
              <p className="text-[#132391] text-lg text-left font-montserrat">
                Encuentra el curso ideal para tu nivel de experiencia. Desde programas básicos para el
                público general hasta capacitaciones avanzadas para profesionales de la salud.
              </p>
            </div>

            {/* Filtros con texto en azul */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#132391]/30 rounded-lg text-[#132391] hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium">Nivel</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#132391]/30 rounded-lg text-[#132391] hover:bg-blue-50 transition-colors">
                <span className="text-sm font-medium">Categoría</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>

          {/* Grid de Cursos - Asegúrate de que el componente CourseCard reciba o use la clase text-[#132391] */}
          <div className="font-montserrat grid lg:grid-cols-3 md:grid-cols-2 gap-10 text-left text-[#132391]">

            <CourseCard
              tag="Gratuito"
              title="REACT® - I"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Básico"
              imageUrl="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070"
              desc="Aprende a actuar con seguridad y eficacia en la estabilización temprana de pacientes críticos en ambulancias, empresas, aeropuertos, industrias y eventos masivos."
              textColor="text-[#132391]"
              titleFont="font-raleway"
              bodyFont="font-montserrat"
            />

            <CourseCard
              title="REACT® - II"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Intermedio"
              price="$00,00"
              imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047"
              desc="Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión, seguridad y liderazgo."
              textColor="text-[#132391]"
              titleFont="font-raleway"
              bodyFont="font-montserrat"
            />

            <CourseCard
              title="REACT® - III"
              subtitle="Respuesta efectiva en atención crítica y traslados"
              level="Avanzado"
              price="$00,00"
              imageUrl="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932"
              desc="Prepárate para llevar tus habilidades al siguiente nivel y enfrentar emergencias con mayor precisión, seguridad y liderazgo."
              textColor="text-[#132391]"
              titleFont="font-raleway"
              bodyFont="font-montserrat"
            />


          </div>
        </div>
      </section>

      {/* --- NOSOTROS --- */}
      <section className="relative min-h-[600px] flex items-center bg-cover bg-center py-20" style={{ backgroundImage: `url(${medicosExperiencia})` }}>
        <div className="container mx-auto px-8 relative z-10 flex justify-end text-left">
          <div className="lg:w-1/2 text-left">
            <span className="text-[#2DAAAD] font-bold text-xs uppercase tracking-widest block text-left">Nosotros</span>

            <h2 className="font-raleway text-4xl lg:text-5xl  text-[#132391] mt-4 mb-8 text-left leading-tight tracking-tight">
              Calidad respaldada por nuestra experiencia en salud
            </h2>
            <p className="text-[#132391] text-lg mb-12 text-left">
              Medicina Crítica se distingue por su experiencia y compromiso en la formación de personal capacitado en seguridad y salud ocupacional. Contamos con un equipo multidisciplinario de profesionales altamente calificados, programas actualizados y metodologías de enseñanza efectivas que garantizan una capacitación de calidad.
            </p>
            <div className="flex items-center justify-center gap-12 pt-8 border-t border-gray-200 text-left font-outfit">

              <div className="flex flex-col items-center">
                <span className="text-5xl  text-[#132391]">+ 3</span>
                <span className="text-[#132391] text-sm font-medium">
                  Años de experiencia
                </span>
              </div>

              {/* separador */}
              <div className="h-16 w-[1px] bg-[#132391]"></div>

              <div className="flex flex-col items-center">
                <span className="text-5xl  text-[#132391]">100</span>
                <span className="text-[#132391] text-sm font-medium">
                  Capacitaciones
                </span>
              </div>

              {/* separador */}
              <div className="h-16 w-[1px] bg-[#132391]"></div>

              <div className="flex flex-col items-center">
                <span className="text-5xl  text-[#132391]">+ 3</span>
                <span className="text-[#132391] text-sm font-medium">
                  Años de experiencia
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* --- TESTIMONIOS --- */}
      {/* --- NAVEGACIÓN (DOTS) --- */}
      <section className="py-20 text-[#132391] overflow-hidden">
        <div className="container mx-auto px-4 text-[#132391]">
          <h2 className="font-raleway text-4xl md:text-5xl text-[#132391] mb-16 text-center">
            Experiencias de quienes ya se capacitaron
          </h2>

          {/* Contenedor de Cards */}
          <div className=" flex flex-row justify-center text-[#132391] items-center gap-2 md:gap-0 max-w-7xl mx-auto">
            {testimonials.map((t, index) => (
              <TestimonialCard
                key={index}
                data={t}
                isActive={activeTestimonial === index}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>

          {/* Botones de Navegación (Dots) */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all duration-300 rounded-full ${activeTestimonial === i
                  ? 'w-10 h-3 bg-[#2DAAAD]'
                  : 'w-3 h-3 bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* --- RESPALDO INTERNACIONAL (Banda Azul) --- */}
      <section className="bg-[#1e61a6] py-16 text-white text-left w-full">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-10 lg:gap-16 max-w-7xl">

          {/* Lado Izquierdo: Logotipo en recuadro blanco */}
          <div className="md:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-white p-5 rounded-xl shadow-xl max-w-[280px]">
              <img
                src={logoDrVigo}
                alt="Centro de Entrenamiento Internacional Dr. Vigo RCP"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Lado Derecho: Texto Informativo */}
          <div className="md:w-2/3 text-left">
            <p className="text-lg lg:text-[22px] leading-relaxed font-normal opacity-95">
              Nuestros instructores, profesionales médicos especialistas Emergenciólogos e intensivistas están acreditados y capacitados por la <span className="font-bold">American Heart Association</span> a través del centro de entrenamiento internacional autorizado <span className="font-bold">Dr. Vigo RCP</span>
            </p>
          </div>

        </div>
      </section>

      {/* --- INSTRUCTORES --- */}
      <section className="py-24 bg-white text-left">
        <div className="container mx-auto px-8">
          <p className="text-[#2DAAAD] font-semibold text-sm mb-6 uppercase">
            INSTRUCTORES
          </p>
          <h2 className="font-raleway text-4xl lg:text-6xl  text-[#132391] mb-20 text-left leading-tight tracking-tight">
            Formación impartida por especialistas en medicina y emergencias
          </h2>
          <div className="grid md:grid-cols-3 gap-16 text-left">
            {[dr1, dr2, dr3].map((img, i) => (
              <div key={i} className="flex flex-col items-start group font-montserrat">
                <img
                  src={img}
                  alt="Instructor"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:border-[#2DAAAD] mb-8"
                />
                <h3 className="text-2xl font-bold font-montserrat text-[#132391] mb-1">Dr. Yeison Benites</h3>
                <p className="text-[#2DAAAD] font-semibold text-sm mb-6 uppercase">
                  Médico emergenciólogo
                </p>

                {/* Texto ahora en azul [#132391] */}
                <p className="text-[#132391] text-sm leading-relaxed text-left font-montserrat opacity-90">
                  Médico emergenciólogo y fundador de Medicina Crítica, con experiencia en atención prehospitalaria y gestión de emergencias. Su propósito es formar y acompañar a personas y profesionales para que puedan responder con eficacia y humanidad en los momentos más críticos.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: CERTIFICACIÓN CON RESPALDO (FondoT.png al 100%) --- */}
      <section
        className="w-full relative overflow-hidden flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${olaF})`,
          backgroundSize: '100% 100%', // Fondo a tamaño completo
          backgroundPosition: 'center',
          minHeight: '950px',
          paddingTop: '280px', // Centrado optimizado del texto
          paddingBottom: '100px'
        }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <h2 className="font-raleway text-[#132391] text-5xl lg:text-7xl  mb-10 text-center tracking-tight">
            Certificación con respaldo
          </h2>

          {/* Texto ahora en azul [#132391] */}
          <p className="font-montserrat text-[#132391] text-lg lg:text-xl mb-28 max-w-4xl mx-auto text-center font-medium leading-relaxed opacity-90">
            Al completar cada curso recibirás un certificado con el respaldo de entidades de salud,
            que validan tu aprendizaje y fortalecen tu trayectoria profesional.
          </p>

          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 lg:gap-6 w-full max-w-6xl text-center">
            {[img1, img2, img3, img4, img5, img6].map((logoImg, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex-1 min-w-[150px] max-w-[200px] h-32 lg:h-36 flex items-center justify-center transform hover:-translate-y-3 transition-all duration-500"
              >
                <img src={logoImg} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>


      <div className="w-full flex relative z-10 -mt-[2px] -mb-[2px]">
        <img
          src={pieImage}
          alt="Pie"
          className="w-full h-auto object-cover block"
        />
      </div>

      {/* --- FOOTER FINAL --- */}
      {/* El z-20 asegura que, al ser jalado hacia arriba, el footer quede por encima de la imagen tapando cualquier borde extraño */}
      <footer className="bg-[#132391] pt-16 pb-12 text-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <img src={logB} alt="Logo Medicina Crítica" className="h-20 brightness-0 invert block" />
          </div>
          {/* Separador */}
          <div className="border-t border-white/20 mb-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            {/* Texto de Copyright */}
            <div className="text-sm opacity-80 flex flex-wrap justify-center gap-2">
              <p>Copyright © 2025 Medicina Crítica. Todos los derechos reservados</p>
              <span className="hidden md:inline">•</span>
              <a href="/terminos" className="hover:text-cyan-400 transition-colors">Términos y condiciones</a>

            </div>
            <div className="flex items-center gap-6 justify-center md:justify-end">
              {/* Facebook */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={s1} alt="Facebook" className="h-6 w-auto" />
              </a>

              {/* Instagram */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={s2} alt="Instagram" className="h-6 w-auto" />
              </a>

              {/* LinkedIn */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={s3} alt="LinkedIn" className="h-6 w-auto" />
              </a>

              {/* TikTok */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={s5} alt="TikTok" className="h-6 w-auto" />
              </a>

              {/* Youtube */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={s4} alt="Youtube" className="h-6 w-auto" />
              </a>
            </div>


          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;