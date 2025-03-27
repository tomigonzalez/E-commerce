"use client";
import { useGetContactInfo } from "@/api/getContactInfo";
import SkeletonScheme from "@/components/skeletonScheme";
import { ResponseType } from "@/types/response";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa"; // Font Awesome icons

const Contacto = () => {
  const { error, loading, result }: ResponseType = useGetContactInfo();

  if (loading) return <SkeletonScheme grid={1} />;
  if (error) return <p>Error al cargar la información.</p>;

  const { telefono, email, direccion, whatsapp } = result[0] || {};

  return (
    <div className="p-6 rounded-lg max-w-6xl mx-auto space-y-6 " id="contacto">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Contacto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información de contacto */}
        <div className="space-y-4 text-center md:text-left">
          {/* WhatsApp */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Phone className="text-green-500 dark:text-green-400" size={20} />
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-300"
            >
              {whatsapp}
            </a>
          </div>

          {/* Teléfono */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Phone className="text-blue-500 dark:text-blue-400" size={20} />
            <a
              href={`tel:${telefono}`}
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-300"
            >
              {telefono}
            </a>
          </div>

          {/* Correo */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Mail className="text-red-500 dark:text-red-400" size={20} />
            <a
              href={`mailto:${email}`}
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-300"
            >
              {email}
            </a>
          </div>

          {/* Dirección */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <MapPin className="text-gray-500 dark:text-gray-400" size={20} />
            <p className="text-lg md:text-xl text-gray-700 dark:text-white">
              {direccion}
            </p>
          </div>
        </div>

        {/* Redes sociales (columna) */}
        <div className="space-y-6 text-center">
          <div className="flex items-center gap-3 justify-center">
            <FaFacebookF
              size={30}
              className="text-blue-600 dark:text-blue-400"
            />
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-blue-800 dark:hover:text-blue-500"
            >
              Facebook
            </a>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <FaInstagram
              size={30}
              className="text-pink-500 dark:text-pink-400"
            />
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-300"
            >
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <FaLinkedinIn
              size={30}
              className="text-blue-700 dark:text-blue-500"
            />
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-gray-700 dark:text-white hover:text-blue-800 dark:hover:text-blue-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
