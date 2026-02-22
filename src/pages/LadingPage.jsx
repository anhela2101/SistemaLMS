import React, { useState } from 'react';
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
  Youtube
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/generals/Button';

// Importación de activos locales
import Banner from '../assets/img/Banner.png';
import logo from '../assets/img/LogoBlanco.png';
import bgFeatures from '../assets/img/Banner2.png';
import medicosExperiencia from '../assets/img/Banner3.png';
import logoDrVigo from '../assets/img/parche.jpg'; 
import fondoCurvo from '../assets/img/fondoT.png'; // Imagen de fondo de certificación
import pieImage from '../assets/img/pie.png'; // Imagen de pie de página

// Logos de certificación
import img1 from '../assets/img/img1.jpg'; 
import img2 from '../assets/img/img2.jpg'; 
import img3 from '../assets/img/img3.jpg'; 
import img4 from '../assets/img/img4.jpg'; 
import img5 from '../assets/img/img5.jpg'; 
import img6 from '../assets/img/img6.jpg';

// Fotos de instructores
import dr1 from '../assets/img/dr1.webp';
import dr2 from '../assets/img/dr2.avif';
import dr3 from '../assets/img/dr3.avif';

/* --- SUB-COMPONENTES AUXILIARES --- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col items-center text-center border-b-4 border-transparent hover:border-[#2DAAAD] transition-all group">
    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-[#132391] mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

const TestimonialCard = ({ data, isActive, onClick }) => {
  const { name, role, text, imageUrl } = data;
  return (
    <div
      onClick={onClick}
      className={`bg-white p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 cursor-pointer flex flex-col text-left border border-transparent
        ${isActive ? 'scale-105 z-10 border-blue-50 md:flex-[1.5]' : 'scale-95 opacity-70 md:flex-1'}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-left">
          <h4 className="text-[#132391] font-bold text-xl leading-tight">{name}</h4>
          <p className="text-gray-400 text-sm font-medium">{role}</p>
        </div>
        {!isActive && <Quote size={32} className="text-[#2DAAAD] opacity-40 transform rotate-180" />}
      </div>
      {isActive && imageUrl && (
        <div className="relative mb-6 rounded-2xl overflow-hidden h-48 bg-[#132391] animate-in fade-in zoom-in duration-700">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#132391] to-transparent flex justify-between items-end">
            <div className="text-white">
              <p className="font-bold text-lg leading-none">{name}</p>
              <p className="text-[10px] opacity-80 uppercase tracking-tighter">{role}</p>
            </div>
            <Quote size={24} className="text-[#2DAAAD] transform rotate-180" />
          </div>
        </div>
      )}
      <p className={`text-gray-600 leading-relaxed italic text-left transition-all duration-300 ${isActive ? 'text-base opacity-100' : 'text-sm opacity-60 line-clamp-3'}`}>
        "{text}"
      </p>
    </div>
  );
};

const CourseCard = ({ tag, title, subtitle, level, desc, price, imageUrl }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full text-left">
    <div className="h-52 relative overflow-hidden bg-[#132391]">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" />
      {tag && <span className="absolute top-4 left-4 bg-[#2DAAAD] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">{tag}</span>}
    </div>
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
        <button className="text-[#132391] font-bold text-sm flex items-center gap-2 hover:text-[#2DAAAD] transition-colors group/btn">Saber más <CircleArrowOutUpRight size={16} /></button>
        {price && <span className="text-lg font-black text-[#132391]">{price}</span>}
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const testimonials = [
    { name: "José Luis Ramírez", role: "Médico General", imageUrl: "https://tecscience.tec.mx/es/wp-content/uploads/sites/8/2024/12/medicina-de-precision.jpg", text: "El curso superó mis expectativas. El contenido es claro y los materiales ayudaron mucho." },
    { name: "Miguel Angel García", role: "Médico", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJe8hd0UD9atSeY9D7ERBm0J4XzUlR3Ob_ag&s", text: "Los contenidos están bien estructurados y los certificados tienen un gran respaldo profesional." },
    { name: "Carmen Torres", role: "Médica General", imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070", text: "La metodología es clara y práctica, ideal para aplicar en situaciones reales." }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <img src={logo} alt="Medicina Crítica" className="h-10 brightness-0" />
        <div className="flex gap-4">
          <Button variant="outline" className="border-none text-[#132391]" onClick={() => navigate('/login')}>Iniciar sesión</Button>
          <Button variant="primary" className="bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2" onClick={() => navigate('/register')}>Registrarse <CircleArrowOutUpRight size={18} /></Button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#132391] text-white min-h-[600px] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${Banner})`, backgroundSize: '85%', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#132391] via-[#132391]/80 to-transparent"></div>
        <div className="container mx-auto px-8 relative z-10 text-left">
          <div className="max-w-2xl">
            <span className="bg-[#2DAAAD] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Cursos online creados por especialistas</span>
            <h1 className="text-5xl font-bold mt-6 leading-tight">Tu capacitación puede salvar vidas: empieza gratis con REACT® I</h1>
            <p className="mt-6 text-lg text-blue-100 max-w-xl leading-relaxed">Regístrate y accede sin costo a nuestro curso REACT® I.</p>
            <Button onClick={() => navigate('/register')} className="mt-8 px-8 py-4 bg-[#132391] hover:bg-[#2DAAAD] flex items-center gap-2 text-lg">Inscríbete gratis y certifícate <CircleArrowOutUpRight size={20} /></Button>
          </div>
        </div>
      </header>

      {/* --- BENEFICIOS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#132391] mb-16 text-left">Tu desarrollo profesional en salud, en un solo lugar</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FeatureCard icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">🩺</div>} title="Aprende de especialistas" desc="Contenidos creados por médicos y profesionales con experiencia real." />
            <FeatureCard icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">🏅</div>} title="Certificados con respaldo" desc="Todos los cursos incluyen certificado digital y aval del colegio de médicos." />
            <FeatureCard icon={<div className="p-3 bg-cyan-50 rounded-full text-[#2DAAAD]">📱</div>} title="Capacitación a tu ritmo" desc="Estudia a tu manera. Retoma clases desde tu celular, tablet o computadora." />
          </div>
        </div>
      </section>

      {/* --- VIDEO CARACTERÍSTICAS --- */}
      <section className="relative min-h-[600px] flex items-center bg-cover bg-center py-20 overflow-hidden" style={{ backgroundImage: `url(${bgFeatures})` }}>
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-left">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-left">Características que marcan la diferencia</h2>
            <ul className="grid gap-y-4 mb-10 text-left">
              {["Material educativo descargable", "Clases en video disponibles 24/7", "Certificado digital inmediato"].map((feature, index) => (
                <li key={index} className="flex items-center gap-3"><CheckCircle2 className="text-white w-5 h-5" />{feature}</li>
              ))}
            </ul>
            <Button className="bg-[#132391] hover:bg-[#2DAAAD] px-10 py-4" onClick={() => navigate('/register')}>Regístrate de manera gratuita</Button>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/GyFpY5bB1CU" title="Video" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUESTROS CURSOS --- */}
      <section className="py-24 bg-white text-left">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-extrabold text-[#132391] mb-4 text-left">Nuestro cursos</h2>
          <p className="text-gray-500 text-lg mb-16 text-left text-left">Encuentra el curso ideal para tu nivel de experiencia.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 text-left">
            <CourseCard tag="Gratuito" title="REACT® - I" subtitle="Respuesta efectiva en atención crítica" level="Básico" imageUrl="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070" desc="Aprende a actuar con seguridad y eficacia." />
            <CourseCard title="REACT® - II" subtitle="Respuesta efectiva en atención crítica" level="Intermedio" price="$00,00" imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047" desc="Lleva tus habilidades al siguiente nivel." />
            <CourseCard title="REACT® - III" subtitle="Respuesta efectiva en atención crítica" level="Avanzado" price="$00,00" imageUrl="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932" desc="Capacitación avanzada para momentos críticos." />
          </div>
        </div>
      </section>

      {/* --- NOSOTROS --- */}
      <section className="relative min-h-[600px] flex items-center bg-cover bg-center py-20" style={{ backgroundImage: `url(${medicosExperiencia})` }}>
        <div className="container mx-auto px-8 relative z-10 flex justify-end text-left">
          <div className="lg:w-1/2 text-left">
            <span className="text-[#2DAAAD] font-bold text-xs uppercase tracking-widest block text-left">Nosotros</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#132391] mt-4 mb-8 text-left">Calidad respaldada por nuestra experiencia en salud</h2>
            <p className="text-gray-600 text-lg mb-12 text-left">Medicina Crítica se distingue por su compromiso en la formación de personal altamente calificado.</p>
            <div className="flex gap-12 pt-8 border-t border-gray-200 text-left">
              <div className="flex flex-col"><span className="text-4xl font-black text-[#132391]">+ 3</span><span className="text-gray-400 text-[10px] font-bold uppercase text-left">Años de experiencia</span></div>
              <div className="flex flex-col"><span className="text-4xl font-black text-[#132391]">100</span><span className="text-gray-400 text-[10px] font-bold uppercase text-left">Capacitaciones</span></div>
            </div>
          </div>
        </div>
      </section>
       {/* --- TESTIMONIOS --- */}
      <section className="py-28 bg-gray-50 text-center">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-[#132391] mb-20 text-center">Experiencias de quienes ya se capacitaron</h2>
          <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-7xl mx-auto min-h-[500px] text-center">
            {testimonials.map((t, index) => (
              <TestimonialCard key={index} data={t} isActive={activeTestimonial === index} onClick={() => setActiveTestimonial(index)} />
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
          <h2 className="text-4xl lg:text-5xl font-black text-[#132391] mb-20 text-left">Formación impartida por especialistas en medicina y emergencias</h2>
          <div className="grid md:grid-cols-3 gap-16 text-left">
            {[dr1, dr2, dr3].map((img, i) => (
              <div key={i} className="flex flex-col items-start group">
                <img src={img} alt="Instructor" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:border-[#2DAAAD] mb-8" />
                <h3 className="text-2xl font-bold text-[#132391] mb-1">Dr. Yeison Benites</h3>
                <p className="text-[#2DAAAD] font-semibold text-sm mb-6 uppercase">Médico emergenciólogo</p>
                <p className="text-gray-500 text-sm leading-relaxed text-left">Especialista en atención prehospitalaria y gestión de emergencias.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: CERTIFICACIÓN CON RESPALDO (FondoT.png al 100%) --- */}
      <section 
        className="w-full relative overflow-hidden flex items-center justify-center text-center"
        style={{ 
          backgroundImage: `url(${fondoCurvo})`, 
          backgroundSize: '100% 100%', // Fondo a tamaño completo
          backgroundPosition: 'center',
          minHeight: '950px', 
          paddingTop: '280px', // Centrado optimizado del texto
          paddingBottom: '100px'
        }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[#132391] text-5xl lg:text-7xl font-black mb-10 text-center">Certificación con respaldo</h2>
          <p className="text-gray-600 text-lg lg:text-xl mb-28 max-w-3xl mx-auto text-center font-medium opacity-90">Al completar cada curso recibirás un certificado con el respaldo de entidades de salud.</p>
          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 lg:gap-6 w-full max-w-6xl text-center">
            {[img1, img2, img3, img4, img5, img6].map((logoImg, index) => (
              <div key={index} className="bg-white p-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex-1 min-w-[150px] max-w-[200px] h-32 lg:h-36 flex items-center justify-center transform hover:-translate-y-3 transition-all duration-500">
                <img src={logoImg} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* --- IMAGEN PIE --- */}
      <div className="w-full leading-[0] overflow-hidden -mt-1"><img src={pieImage} alt="Pie" className="w-full h-auto object-cover" /></div>

     

      {/* --- FOOTER FINAL --- */}
      <footer className="bg-[#132391] pt-16 pb-12 text-white text-center">
        <div className="container mx-auto px-10 text-center">
          <div className="flex justify-center mb-14 text-center"><img src={logo} alt="Logo" className="h-20 brightness-0 invert" /></div>
          <div className="w-full h-[1px] bg-white/30 mb-10 text-center"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            <div className="text-sm opacity-90 flex flex-wrap justify-center gap-2 text-center">
              <span>Copyright © 2025 Medicina Crítica. Todos los derechos reservados</span>
              <span className="hidden md:inline">•</span>
              <a href="/terminos" className="hover:text-[#2DAAAD]">Términos y condiciones</a>
            </div>
            <div className="flex items-center gap-6 text-center">
              <a href="#"><Facebook size={22} fill="white" strokeWidth={0} /></a>
              <a href="#"><Instagram size={22} /></a>
              <a href="#"><Linkedin size={22} fill="white" strokeWidth={0} /></a>
              <a href="#"><Youtube size={24} fill="white" strokeWidth={0} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;