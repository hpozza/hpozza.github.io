import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-select'

export function PokeCard({ pokemonData }: any) {
    console.log(pokemonData.stats)

    return (
        <>
            <Card className='flex items-center'>
                <CardHeader className='h-100 w-100'>
                    <img className='h-200 w-800' src={pokemonData.sprites.front_default}></img>
                    <Separator className='' />
                    <CardTitle className='text-xl' >{pokemonData ? pokemonData.name : null}</CardTitle>
                    <CardDescription className='flex gap-1'>
                        {pokemonData.types.map((d: any) => {
                            return (
                                <span>{d.type.name}</span>
                            )
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>

            </Card>
        </>
    )
}
