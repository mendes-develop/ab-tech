'use client'

import { ProfileData, useDeputadoQuery } from "../../api/propositions";

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

export const DeputadosList = () => {
  const { data, error, isPending } = useDeputadoQuery();

  return (
    <div>
      {error ? <div>{"Something went wrong"}</div> :
        isPending ? <div>{"Loading..."}</div> :
          <>
            <h1 className="text-gray-700">Deputados</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border">
              {data.dados.map(dado => <ProfileCard profileData={dado} />)}
            </div>
          </>
      }
    </div>
  );
};