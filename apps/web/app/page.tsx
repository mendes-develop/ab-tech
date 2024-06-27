import { DeputadosList } from "@repo/ui/deputados";

export default async function Page() {
	// const data = await getDeputados()
	// console.log(data)
	return (
		<main className="border bg-red-500 p-4 h-screen w-full">
			<p className="color-red">kkk</p>
			<DeputadosList />
		</main>
	);
}
