"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import ChatPage from "./[chatId]/page";

const Index = ({ children }: { children?: ReactNode }): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/chat") {
      router.push("/search");
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="relative h-full w-full flex justify-stretch items-stretch overflow-auto">
      <ChatPage />
    </div>
  );
};

export default Index;

