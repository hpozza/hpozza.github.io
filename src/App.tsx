import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { Linkedin, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { PokeCard } from './shared/PokeCard';
import { BarChart } from './shared/charts/BarChart';
import { Input } from './components/ui/input';
import { BubbleChart } from './shared/charts/BubbleChart';
const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export function App() {
  const [currentPage, setCurrentPage] = useState(API_URL);
  const [pokemonList, setPokemonList] = useState<any | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonData, setData] = useState<any>();
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [searchPoke, setSearchPoke] = useState<string>('')

  useEffect(() => {
    getPokemonList();
  }, [currentPage])

  useEffect(() => {
    if (selectedPokemon) {
      getPokemon(selectedPokemon);
    }
  }, [selectedPokemon])

  function goToNextPage() {
    setCurrentPage(nextPage)
  }

  function goToPrevPage() {
    setCurrentPage(previousPage)
  }

  async function getPokemonList() {
    try {
      const response = await fetch(currentPage)
      const data = await response.json();

      setPokemonList(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    }

    catch (err) {
      console.log(err);
    }
  }

  async function getPokemon(pokemon: any) {
    const response = await fetch(`${API_URL}/${pokemon}`)
    const data = await response.json();
    setData(data);
  }

  async function getPokemonBySearch() {
    const response = await fetch(`${API_URL}/${searchPoke}`)
    const data = await response.json();
    setData(data)

  }

  /*   function getPokeId(url: string) {
      const path = new URL(url).pathname
      const id = path.split("/api/v2/pokemon/")
      const pokeId = id[1].split('/')[0]
      console.log(pokeId)
    } */

  return (
    <>
      <div>
        <div className='px-6 py-3 flex items-center justify-between border-b'>
          <h1 className='text-xl font-bold'>Pokemon Dahsboard</h1>


          <div className='flex items-center gap-3'>
            <span className='text-sm text-muted-foreground'>Project to showcase my dataviz shanenigans</span>
            <a href="https://www.linkedin.com/in/hpozza/">
              <Button variant="outline">
                <Linkedin className='h-4 w-4 mr-2' />
                My Linkedin
              </Button>
            </a>

          </div>


        </div>

        <main className='flex flex-row gap-8 justify-between p-6'>

          {/* <div className='flex flex-row items-start gap-20 justify-start'> */}
            {/* <Select onValueChange={(e: any) => setSelectedPokemon(e)} >
              <SelectTrigger>Select Pokemon</SelectTrigger>
              <SelectContent>
                {pokemonList?.map((d: any, i: number) => {
                  return <SelectItem value={d.name} >{i + 1} - {d.name}</SelectItem>
                })}
              </SelectContent>
            </Select> */}
            <div className='items-start'>

            {pokemonData ? <PokeCard pokemonData={pokemonData} /> : null}
            </div>
            <div className='flex flex-col gap-10' >
              {pokemonData ? <BarChart pokemonData={pokemonData} /> : null}
              {pokemonData ? <BubbleChart pokemonData={pokemonData} /> : null}
            </div>


          {/* </div> */}

          <Card className='items-start'>
            <CardHeader className='gap-6'>
              <CardTitle>Select a Pokemon</CardTitle>
              <div className='flex gap-2'>
                <Input
                  placeholder='or search one'
                  onChange={(e: any) => setSearchPoke(e.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      getPokemonBySearch()
                    }
                  }} />
                <Button
                  onClick={getPokemonBySearch}
                >
                  <Search className='mr-2' />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col mr-1 gap-1'>
              {pokemonList?.map((d: any) => {
                return <h1 onClick={() => setSelectedPokemon(d.name)} className='flex pl-2 cursor-pointer justify-between hover:bg-sky-700 rounded-sm'>{d.name}</h1>
              })}
            </CardContent>
            <CardFooter className='gap-4 justify-between'>
              <Button onClick={goToPrevPage}>Previous</Button>
              <Button onClick={goToNextPage}>Next</Button>
            </CardFooter>
          </Card>



        </main>
      </div>
    </>
  )
}
