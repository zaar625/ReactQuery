
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import InfiniteSpecies from './species/InfiniteSpecies';

import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <h1>InFinite Scroll</h1>
        <InfiniteSpecies/>
        <ReactQueryDevtools/>
      </div>
    </QueryClientProvider>
  )
}

export default App
