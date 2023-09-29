import { AxisBottom } from '@visx/axis'
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

    console.log(12 + yScale.bandwidth())

    return (

        <>
            <svg height={200} width={500}>
                {data ? data.map((d: Stats, i: number) => {
                    return (
                        <>
                            <Bar
                                key={i + d.stat!.name}
                                y={yScale(d.stat!.name)}
                                x={30}
                                width={xScale(d.base_stat)}
                                height={yScale.bandwidth()}
                                fill='#fafafa'
                            />
                            <Text
                                y={yScale(d.stat.name)! + yScale.bandwidth() / 2}
                                x={450}
                                fill='blue'
                                verticalAnchor='middle'
                            >
                                {d.base_stat}
                            </Text>
                        </>
                    )
                }) : null}
                <AxisBottom
                    tickLabelProps={{
                        fill: "#fff",
                        fontSize: 11,
                        textAnchor: 'middle',
                    }}
                    top={300}
                    hideAxisLine={true}
                    scale={xScale}
                    hideTicks={true} />
            </svg>

        </>
    )
}
