import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { scaleLinear } from '@visx/scale';
import { Circle } from '@visx/shape';
import { Text } from '@visx/text';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react'

export function BubbleChart({ pokemonData }: any) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [moves, setMoves] = useState<any>();
    const [xMax, setXMax] = useState(250);
    const [width, height] = [450, 450]
    const margin = {
        left: 30,
        right: 20,
        top: 50,
        bottom: 20
    }

    const [innerHeight, innerWidth] = [height - margin.top - margin.bottom, width - margin.left - margin.right]

    useEffect(() => {
        getMoves()
    }, [pokemonData])

    //let moves: any[] = [];



    async function getMoves() {
        let arr: any[] = [];
        for (let i = 0; i < pokemonData?.moves?.length; i++) {
            setLoading(true)
            const res = await fetch(pokemonData.moves[i].move.url)
            const data = await res.json();
            arr.push(data);
        }

        setMoves(arr);

        let max = Math.max(...moves.map((d: any) => d.power))

        setXMax(max)

        setLoading(false);


        console.log('moves', moves)
        console.log('max', max)
    }

    let xScale = scaleLinear({
        domain: [0, xMax],
        range: [0, innerWidth]
    });

    let yScale = scaleLinear({
        domain: [0, 40],
        range: [0, innerHeight]
    })

    let rScale = scaleLinear({
        domain: [0, 100],
        range: [5, 25]
    })


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
            {isLoading ?
                <div className='flex flex-col items-center justify-center gap-6'>
                    <h1>Fetching moves...</h1>
                    <Loader2 className='h-16 w-auto animate-spin' />
                </div>
                :
                <div className='flex flex-col gap-4'>
                    <svg height={height} width={width}>
                        <Text x={0} y={10} fill='white'>Moves Set</Text>
                        <Text x={width / 2} y={height} textAnchor='middle' fill='white'>Power</Text>
                        <Text x={10} y={height / 2} textAnchor='middle' angle={270} fill='white'>Power Points</Text>

                        <g transform={`translate(50, 20)`}>
                            {moves.length > 1 ? moves?.map((d: any, i: number) => {
                                return (
                                    <>
                                        <Circle
                                            key={i + d.power + d.name}
                                            cx={d.power ? xScale(d.power) : 0}
                                            cy={d.pp ? yScale(d.pp) : 0}
                                            r={d.accuracy ? rScale(d.accuracy) : 0}
                                            fill={colorTypes[d.type.name]}
                                            opacity={0.7}
                                        />
                                    </>
                                )
                            }) : null}
                        </g>
                    </svg>
                    <h1>Top Moves (by Power)</h1>
                    <div className='flex flex-col text-sm text-muted-foreground'>
                        {moves.sort((a: any, b: any) => b - a).filter((d: any, i: number) => i < 11).map((d: any) => {
                            return (
                                <span className='hover:bg-violet-500'>
                                    {d.name}
                                </span>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}
