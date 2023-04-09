import { Routes, Route } from 'react-router-dom'
import HomePage from './components/Home.page'
import SuperheroPage from './components/Superhero.page'
import RQSuperheroesPage from './components/RQSuperheroes.page'
import NavBar from './components/NavBar'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RQSuperHero from './components/RQSuperHero'
import RQParallel from './components/RQParallel.page'
import DynamicParallelPage from './components/DynamicParallel.page'
import DependentQueries from './components/DependentQueries'
import Paginated from './components/Paginated.page'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client = { queryClient }>
      <ReactQueryDevtools initialIsOpen = {false} />
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element = {<HomePage />}/>
          <Route path='/paginated' element = {<Paginated />}/>
          <Route path='/dynamic-parallel' element = {<DynamicParallelPage heroIds={[1, 3]} />}/>
          <Route path='/dependent' element = {<DependentQueries email={'arjunthakur900@gmail.com'} />}/>
          <Route path='/rq-parallel' element = {<RQParallel />}/>
          <Route path = '/super-heroes' element = {<SuperheroPage />} />
          <Route path = 'rq-super-heroes/:heroId' element = {<RQSuperHero />} />
          <Route path = '/rq-super-heroes' element = {<RQSuperheroesPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
