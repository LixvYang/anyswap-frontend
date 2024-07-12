/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {protocol:"https", hostname: "mixin-images.zeromesh.net"},
      {protocol:"https", hostname: "img.clerk.com"},
      {protocol:"https", hostname: "image.betxin.one"},
      {protocol:"https", hostname: "mixin.one"},
      {protocol:"https", hostname: "raw.githubusercontent.com"},
      {protocol:"https", hostname: "bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link"},
      {protocol:"https", hostname: "arweave.net"}
    ]
  }
};

export default nextConfig;
