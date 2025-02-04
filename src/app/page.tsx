import { Metadata } from "next";
import { MainPage } from "@/common/pages/MainPage";

export const metadata: Metadata = {
  title: "MyStore - Home",
  description:
    "Welcome to MyStore, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
  keywords: ["store", "shop", "ecommerce", "products"],
  authors: [{ name: "MyStore" }],
  openGraph: {
    title: "MyStore - Home",
    description:
      "Welcome to MyStore, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
    images: [
      "https://play-lh.googleusercontent.com/yyyTUJmTtjAgBbVCtREhX-iXJpyK05dTya8R_T_FLhom7iWVT3z0bGEf3StGEyf5eQ",
    ],
    url: "http://localhost:3000/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyStore - Home",
    description:
      "Welcome to MyStore, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
    images: [
      "https://play-lh.googleusercontent.com/yyyTUJmTtjAgBbVCtREhX-iXJpyK05dTya8R_T_FLhom7iWVT3z0bGEf3StGEyf5eQ",
    ],
  },
};

export default function Home() {
  return <MainPage />;
}
