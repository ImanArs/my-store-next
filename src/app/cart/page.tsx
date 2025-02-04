import React from "react";
import { CartPage } from "@/common/pages/cartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyStore - Cart",
  description:
    "Welcome to your shop cart with items, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
  keywords: ["store", "shop", "ecommerce", "products"],
  authors: [{ name: "airim6" }],
  openGraph: {
    title: "MyStore - Cart",
    description:
      "Welcome to your shop cart with items, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
    images: [
      "https://play-lh.googleusercontent.com/yyyTUJmTtjAgBbVCtREhX-iXJpyK05dTya8R_T_FLhom7iWVT3z0bGEf3StGEyf5eQ",
    ],
    url: "http://localhost:3000/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyStore - Cart",
    description:
      "Welcome to your shop cart with items, it was created by Arsen Imanbaev you can look my cv by https://t.me/airim6.",
    images: [
      "https://play-lh.googleusercontent.com/yyyTUJmTtjAgBbVCtREhX-iXJpyK05dTya8R_T_FLhom7iWVT3z0bGEf3StGEyf5eQ",
    ],
  },
};

const Page = () => {
  return <CartPage />;
};

export default Page;
