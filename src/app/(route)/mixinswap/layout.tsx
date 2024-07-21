import { MixswapStoreProvider } from "@/app/providers/MixswapProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MixswapStoreProvider>{children}</MixswapStoreProvider>
    </>
  );
}
