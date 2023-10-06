import { scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { select } from 'd3-selection';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react'
import { BubbleTooltip } from '../utils/BubbleTooltip';

export function BubbleChart({ pokemonData }: any) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [moves, setMoves] = useState<any>();
    const [xMax, setXMax] = useState(150);
    const [tipVis, setTipVis] = useState(false);
    const [width, height] = [450, 450]
    const margin = {
        left: 50,
        right: 20,
        top: 50,
        bottom: 50
    };

    const [innerHeight, innerWidth] = [height - margin.top - margin.bottom, width - margin.left - margin.right];

    useEffect(() => {
        if (pokemonData) {
            setLoading(true)
            getMoves()
        }
    }, [pokemonData])

    //let moves: any[] = [];



    async function getMoves() {
        let arr: any[] = [];
        console.log('started fetching')
        for (let i = 0; i < pokemonData?.moves?.length; i++) {
            const res = await fetch(pokemonData.moves[i].move.url)
            const data = await res.json();
            arr.push(data);
        }
        Promise.all(arr).then((data: any) => {
            setMoves(data)
            setXMax(Math.max(...data.map((d: any) => d.power)))
        })

        console.log('finished fetching')

        setLoading(false)


    }

    let xScale = scaleLinear({
        domain: [0, xMax],
        range: [0, innerWidth - 20]
    });

    let yScale = scaleLinear({
        domain: [0, 40],
        range: [0, innerHeight]
    })

    let rScale = scaleLinear({
        domain: [0, 100],
        range: [5, 25]
    })

    function handleMouseOver(data: any) {
        select('.tooltipDiv').style("visibility", "visible");
    }

    function handleMouseMove(event: any, data: any) {
        setTipVis(true)
        select('.tooltipDiv')
            .style('top', `${event.pageY - 40}px`)
            .style('left', `${event.pageX + 10}px`)
            .style('position', 'absolute')

        select('.value').html(
            `name: ${data.name} <br/>
             type: ${data!.type.name} <br/>
             damage class: ${data.damage_class.name} <br/>
             power: ${data.power} <br/>
             power points: ${data.pp} br/>
             accuracy: ${data.accuracy}%`
            )
    }

    function handleMouseOut() {
        select('.tooltipDiv').style('visibility', 'hidden');
        setTipVis(false);
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
            {isLoading ?
                <div className='flex flex-col items-center justify-center gap-6'>
                    <h1>Fetching moves...</h1>
                    <Loader2 className='h-16 w-auto animate-spin' />
                </div>
                :
                <div className='flex flex-col gap-4'>
                    <BubbleTooltip />

                    <svg height={height} width={width} >
                        <Text x={0} y={10} fill='white'>Moves Set</Text>
                        <Text x={width / 2} y={height} textAnchor='middle' fill='white'>Power</Text>
                        <Text x={10} y={height / 2} textAnchor='middle' angle={270} fill='white'>Power Points</Text>

                        <g className='canva' transform={`translate(${margin.left}, ${margin.top})`} >
                            {moves.length > 1 ? moves?.map((d: any, i: number) => {
                                return (
                                    <>
                                        <circle
                                            key={i + d.power + d.name}
                                            cx={d.power ? xScale(d.power) : 0}
                                            cy={d.pp ? yScale(d.pp) : 0}
                                            r={d.accuracy ? rScale(d.accuracy) : 0}
                                            fill={colorTypes[d.type.name]}
                                            opacity={0.7}
                                            onMouseOver={() => handleMouseOver(d)}
                                            onMouseMove={(event) => handleMouseMove(event, d)}
                                            onMouseOut={handleMouseOut}
                                        />
                                    </>
                                )
                            }) : null}
                        </g>
                    </svg>
                    {/* <h1>Top Moves (by Power)</h1>
                    <div className='flex flex-col text-sm text-muted-foreground'>
                        {moves.sort((a: any, b: any) => b - a).filter((, i: number) => i < 11).map((d: any) => {
                            return (
                                <span className='hover:bg-violet-500'>
                                    {d.name}
                                </span>
                            )
                        })}
                    </div> */}
                </div>
            }
        </>
    )
}
