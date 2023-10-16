import Homepage from "@/components/User Ui/Home/Homepage";
import Image from "next/image";

export async function getHomedata() {
  const res = await fetch(`${process.env.BASE_URL}/api/v1/home`, {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Home() {
  const data= await getHomedata();

  return (
    <div>
      <Homepage data={data.data} />
    </div>
  );
}
