"use client";

import { motion } from "framer-motion";
import { useMenuDesigner, getBackgroundImageCss } from "@/hooks/useMenuDesigner";

export default function MenuHeader() {
  const { restaurantInfo, theme, background, showTopShadow } =
    useMenuDesigner();

  const bgStyle =
    background.top.type === "image" && background.top.value
      ? { backgroundImage: getBackgroundImageCss(background.top.value), backgroundSize: "cover", backgroundPosition: "center" }
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
        minHeight: "280px",
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
      {showTopShadow && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.backgroundColor})`,
          }}
        />
      )}

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
              width: "120px",
              height: "120px",
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
              fontSize: "48px",
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
