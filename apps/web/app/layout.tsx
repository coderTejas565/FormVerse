import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { GlobalProviders } from "~/providers/global";

export const metadata: Metadata = {
  title:"FORMVERSE",
  description:"BatComputer Form Builder"
}

export default function RootLayout({
 children
}:{
 children:React.ReactNode
}){

return(

<html lang="en">

<body>

<GlobalProviders>
{children}
</GlobalProviders>

</body>

</html>

)

}