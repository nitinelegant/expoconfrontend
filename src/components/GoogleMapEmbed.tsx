import React from "react";

interface GoogleMapEmbedProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  title?: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  src,
  width = "100%",
  height = "400",
  className = "",
  title = "Google Map",
}) => {
  // Extract the place ID or coordinates from the Google Maps link
  // const getEmbedUrl = (url: string) => {
  //   const placeMatch = url.match(/place\/([^\/]+)/);
  //   const coordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  //   if (placeMatch) {
  //     return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeMatch[1]}`;
  //   } else if (coordsMatch) {
  //     return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordsMatch[1]},${coordsMatch[2]}&zoom=15`;
  //   } else {
  //     // If no match, return the original URL (it might already be an embed URL)
  //     return url;
  //   }
  // };

  // const embedSrc = getEmbedUrl(src);

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
      title={title}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};

export default GoogleMapEmbed;
