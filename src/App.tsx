import { Routes, Route } from 'react-router-dom'
import HomePage from './components/Home.page'
import SuperheroPage from './components/Superhero.page'
import RQSuperheroesPage from './components/RQSuperheroes.page'
import NavBar from './components/NavBar'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element = {<HomePage />}/>
          <Route path = '/super-heroes' element = {<SuperheroPage />} />
          <Route path = '/rq-super-heroes' element = {<RQSuperheroesPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
