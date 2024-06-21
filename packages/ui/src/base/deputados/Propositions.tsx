'use client'
import { usePropositionsQuery } from '../../api/propositions'
import Link from 'next/link'

export const Propositions = () => {
  const { data, error, isPending } = usePropositionsQuery()
  return (
    <div>
      {error ? <div>{"Something went wrong"}</div> : isPending ? <div>{"Loading..."}</div> :
        <>
          <div>Propositions</div>
          {data?.dados.map(dado =>
            <Link href={"/proposicoes/" + dado.id} className='block'>
              <div key={dado.id} className={"border p-4"} style={{ border: "1px solid black" }}>
                <div>{dado.id}  </div>
                <div>{dado.numero}  </div>
                <div>{dado.siglaTipo}  </div>
                <div>{dado.ementa}  </div>
              </div>
            </Link>
          )}
        </>}
    </div>
  )
}
