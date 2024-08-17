// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//         port: "",
//       },
//     ],
//     minimumCacheTTL: 60, // increase cache time
   
//   },
//   server: {
//     timeout: 60000, // Set a custom timeout (in milliseconds)
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
    minimumCacheTTL: 60, // Cache time in seconds
  },
};

export default nextConfig;
