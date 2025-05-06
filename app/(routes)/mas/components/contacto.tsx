"use client";

import { useInfoData } from "@/hooks/use-info-data";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Contacto = () => {
  const infoData = useInfoData((state) => state.data);
  const contacto = infoData?.contacto;

  return (
    <section className="px-6 sm:px-10 py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
        Contacto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          {contacto?.whatsapp && (
            <ContactItem
              icon={<Phone className="text-green-500" />}
              label={contacto.whatsapp}
              href={`https://wa.me/${contacto.whatsapp}`}
              hoverColor="hover:text-green-600 dark:hover:text-green-400"
            />
          )}
          {contacto?.telefono && (
            <ContactItem
              icon={<Phone className="text-blue-500" />}
              label={contacto.telefono}
              href={`tel:${contacto.telefono}`}
              hoverColor="hover:text-blue-600 dark:hover:text-blue-400"
            />
          )}
          {contacto?.email && (
            <ContactItem
              icon={<Mail className="text-red-500" />}
              label={contacto.email}
              href={`mailto:${contacto.email}`}
              hoverColor="hover:text-red-600 dark:hover:text-red-400"
            />
          )}
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          {contacto?.facebook && (
            <SocialItem
              icon={<FaFacebookF className="text-blue-600" size={24} />}
              label="Facebook"
              href={contacto.facebook}
              hoverColor="hover:text-blue-800 dark:hover:text-blue-500"
            />
          )}
          {contacto?.instagram && (
            <SocialItem
              icon={<FaInstagram className="text-pink-500" size={24} />}
              label="Instagram"
              href={contacto.instagram}
              hoverColor="hover:text-pink-600 dark:hover:text-pink-400"
            />
          )}
          {contacto?.direccion && (
            <ContactItem
              icon={<MapPin className="text-gray-500" />}
              label={contacto.direccion}
              href={contacto.google_maps_url || "#"}
              hoverColor="hover:text-gray-800 dark:hover:text-gray-300"
            />
          )}
          {contacto?.linkedin && (
            <SocialItem
              icon={<FaLinkedinIn className="text-blue-700" size={24} />}
              label="LinkedIn"
              href={contacto.linkedin}
              hoverColor="hover:text-blue-800 dark:hover:text-blue-400"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacto;

const ContactItem = ({
  icon,
  label,
  href,
  hoverColor,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  hoverColor: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-4 text-lg text-gray-800 dark:text-white transition-colors ${hoverColor}`}
  >
    {icon}
    {label}
  </a>
);

const SocialItem = ({
  icon,
  label,
  href,
  hoverColor,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  hoverColor: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-4 text-lg text-gray-800 dark:text-white transition-colors ${hoverColor}`}
  >
    {icon}
    {label}
  </a>
);
