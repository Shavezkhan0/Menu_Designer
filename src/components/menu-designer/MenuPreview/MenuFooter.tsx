"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, QrCode } from "lucide-react";
import { useMenuDesigner, getBackgroundImageCss } from "@/hooks/useMenuDesigner";

export default function MenuFooter() {
  const { restaurantInfo, theme, background, showBottomShadow } = useMenuDesigner();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="relative px-6 py-10 text-center overflow-hidden"
      style={{ backgroundColor: background.bottom.type === "color" && background.bottom.value === "transparent" ? "transparent" : theme.backgroundColor }}
    >
      {/* Background layer with blur & brightness */}
      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${background.bottom.blur}px) brightness(${background.bottom.brightness})`,
          ...(background.bottom.type === "image" && background.bottom.value
            ? { backgroundImage: getBackgroundImageCss(background.bottom.value), backgroundSize: "cover", backgroundPosition: "center" }
            : background.bottom.type === "gradient"
              ? { backgroundImage: background.bottom.value }
              : { backgroundColor: background.bottom.value }),
        }}
      />

      {/* Gradient overlay to blend with main background */}
      {showBottomShadow && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, transparent, ${theme.backgroundColor})`,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Decorative divider */}
      <div
        className="mx-auto mb-8"
        style={{
          width: "60px",
          height: "2px",
          backgroundColor: theme.primaryColor,
          borderRadius: "1px",
        }}
      />

      {/* Restaurant name */}
      {restaurantInfo.name && (
        <h2
          className="mb-4 text-2xl font-bold"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.textColor,
          }}
        >
          {restaurantInfo.name}
        </h2>
      )}

      {/* Contact row */}
      <div
        className="mx-auto mb-4 flex max-w-md flex-wrap items-center justify-center gap-4 text-sm"
        style={{ color: theme.textColor, opacity: 0.7 }}
      >
        <span className="flex items-center gap-1.5">
          <Phone className="size-3.5" />
          555-0100
        </span>
        <span className="flex items-center gap-1.5">
          <Mail className="size-3.5" />
          info@example.com
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          123 Main St
        </span>
      </div>

      {/* Website */}
      <div
        className="mb-6 flex items-center justify-center gap-1.5 text-sm"
        style={{ color: theme.primaryColor }}
      >
        <Globe className="size-3.5" />
        <span>www.example.com</span>
      </div>

      {/* QR Code placeholder */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "rgba(39,39,42,1)",
          }}
        >
          <QrCode className="size-8" style={{ color: "rgba(113,113,122,1)" }} />
        </div>
        <span
          className="text-[10px]"
          style={{ color: "rgba(113,113,122,1)" }}
        >
          Scan for Menu
        </span>
      </div>

      {/* Copyright */}
      <p
        className="mb-4 text-xs"
        style={{ color: theme.textColor, opacity: 0.5 }}
      >
        &copy; 2024 {restaurantInfo.name || "Restaurant"}. All rights reserved.
      </p>

      {/* Badge */}
      <div
        className="mx-auto inline-block rounded-full px-3 py-1 text-[10px] font-medium"
        style={{
          backgroundColor: "rgba(63,63,70,1)",
          color: "rgba(161,161,170,1)",
        }}
      >
        Generated with Menu Designer
      </div>
      </div>
    </motion.div>
  );
}
