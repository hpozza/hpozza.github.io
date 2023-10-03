import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import { Text } from '@visx/text'

export type Stats = {
    name?: any,
    stat?: any,
    base_stat?: any
}


export function BarChart({ pokemonData }: any) {
    let data: Stats[] = pokemonData!.stats

    let yScale = scaleBand<Stats>({
        domain: data.map((d: any) => d.stat.name),
        range: [0, 180],
        padding: 0.3
    })

    let xScale = scaleLinear<number>({
        domain: [0, 255],
        range: [0, 450]
    })

    return (

        <>
            <svg height={200} width={500}>
                {data ? data.map((d: Stats, i: number) => {
                    return (
                        <>
                            <Bar
                            key={i + d.stat!.name}
                            y={yScale(d.stat!.name)}
                            x={0}
                            width={xScale(255)}
                            height={yScale.bandwidth()}
                            fill='none'
                            stroke='#4A0F9E'
                            />
                            <Bar
                                key={i+1 + d.stat!.name}
                                y={yScale(d.stat!.name)}
                                x={0}
                                width={xScale(d.base_stat)}
                                height={yScale.bandwidth()}
                                fill='#A967E4'
                            />
                            <Text
                                y={yScale(d.stat.name)! + yScale.bandwidth() / 2}
                                x={xScale(253)}
                                fill='white'
                                textAnchor='end'
                                verticalAnchor='middle'
                            >
                                {d.base_stat}
                            </Text>
                            <Text
                                y={yScale(d.stat.name)! + yScale.bandwidth() / 2}
                                x={0}
                                fill='white'
                                verticalAnchor='middle'
                            >
                                {d.stat.name}
                            </Text>
                        </>
                    )
                }) : null}
            </svg>

        </>
    )
}
