import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'

export function PokeCard({ pokemonData }: any) {

    useEffect(() => {
        if (pokemonData) {
            getEvolution();
            console.log(pokemonData)
        }
    }, [pokemonData])

    let abilities: any[] = []
    let moves: any[] = [];

    async function getEvolution() {

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemonData.name}/`)
            const data = await res.json();
            

        console.log('evo', data)
    }

    const colorTypes: any = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    }

    return (
        <>
            <Card className='flex flex-col'>
                <CardHeader>
                    <img className='h-60 w-auto' src={pokemonData.sprites.other["official-artwork"].front_default}></img>
                    <CardTitle className='flex text-xl items-center justify-center' >{pokemonData ? pokemonData.name : null}</CardTitle>
                    <CardDescription className='flex gap-1 items-center justify-center'>
                        {pokemonData.types.map((d: any) => {
                            return (
                                <span style={{
                                    background: `${colorTypes[d.type.name]}`,
                                    color: 'white',
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    border: '1px solid white',
                                    borderRadius: 10,
                                    marginRight: 5
                                }} >{d.type.name}</span>
                            )
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col justify-start'>
                    <h1>
                        heigth: {`${pokemonData.height / 10} m`}
                    </h1>
                    <h1>
                        weight: {`${pokemonData.weight / 10} kg`}
                    </h1>
                </CardContent>

            </Card>
        </>
    )
}
