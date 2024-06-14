import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";
import { ProfileData, getDeputados } from "../axios/instance";


const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

interface ProfileCardProps {
  profileData: ProfileData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <div
      key={profileData.id}
      className="max-w-sm rounded overflow-hidden shadow-lg p-6 text-center bg-white">
      <img
        width={24}
        height={24}
        className="rounded-full mx-auto" src={profileData.urlFoto} alt={profileData.nome} />
      <h2 className="text-xl font-semibold mt-4">{profileData.nome}</h2>
      <p className="text-gray-700">
        Partido: <a href={profileData.uriPartido} className="text-blue-500 hover:underline">{profileData.siglaPartido}</a>
      </p>
      <p className="text-gray-700">UF: {profileData.siglaUf}</p>
      <p className="text-gray-700">Legislatura: {profileData.idLegislatura}</p>
      {/* <p className="text-gray-700">
        Email: <a href={`mailto:${profileData.email}`} className="text-blue-500 hover:underline">{profileData.email}</a>
      </p> */}
      <a href={profileData.uri} className="text-blue-500 hover:underline">More Info</a>
    </div>
  );
};

export default async function Page() {

  const data = await getDeputados()
  console.log(data)
  return (
    <main className="bg-white border b-red-500 p-4 h-screen w-full" >
      <div className="text-black flex flex-col items-center justify-center">
        Deputados
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.dados.map(dado => <ProfileCard profileData={dado} />)}
        </div> */}
      </div>
    </main>
  );
}
