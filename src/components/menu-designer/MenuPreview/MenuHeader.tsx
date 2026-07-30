"use client";

import { motion } from "framer-motion";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

const FONT_SIZE = { desktop: "48px", tablet: "36px", mobile: "28px" };

export default function MenuHeader() {
  const { restaurantInfo, theme, background, activeDevice } =
    useMenuDesigner();

  const bgStyle =
    background.top.type === "image" && background.top.value
      ? { backgroundImage: `url(${background.top.value})`, backgroundSize: "cover", backgroundPosition: "center" }
      : background.top.type === "gradient"
        ? { backgroundImage: background.top.value }
        : { backgroundColor: background.top.value };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        minHeight: activeDevice === "mobile" ? "200px" : "280px",
      }}
    >
      {/* Background layer with blur & brightness */}
      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${background.top.blur}px) brightness(${background.top.brightness})`,
          ...bgStyle,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.backgroundColor})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {restaurantInfo.logoUrl && (
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            src={restaurantInfo.logoUrl}
            alt="Logo"
            className="mb-4 object-cover"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              boxShadow: `0 0 0 3px ${theme.primaryColor}`,
            }}
          />
        )}

        {restaurantInfo.name && (
          <h1
            className="font-bold leading-tight"
            style={{
              fontFamily: theme.fontFamily,
              fontSize: FONT_SIZE[activeDevice],
              color: theme.textColor,
            }}
          >
            {restaurantInfo.name}
          </h1>
        )}

        {restaurantInfo.tagline && (
          <p
            className="mt-2 text-lg italic leading-relaxed"
            style={{ color: theme.textColor, opacity: 0.7 }}
          >
            {restaurantInfo.tagline}
          </p>
        )}
      </div>
    </motion.div>
  );
}
